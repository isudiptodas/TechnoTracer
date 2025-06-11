package com.technotracer.backend.service;

import com.technotracer.backend.DTO.LoginRequest;
import com.technotracer.backend.entity.AdminEntity;
import com.technotracer.backend.entity.SuperAdminEntity;
import com.technotracer.backend.repository.AdminRepository;
import com.technotracer.backend.repository.SuperAdminRepository;
import com.technotracer.backend.utils.JWT;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class SuperAdminService {

    @Autowired
    SuperAdminRepository superRepo;
    @Autowired
    AdminRepository adminRepo;
    @Autowired
    JWT jwt;
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public String register(SuperAdminEntity entity){
        Optional<SuperAdminEntity> found = superRepo.findByEmail(entity.getEmail());

        if(found.isPresent()){
            return "Already present";
        }

        entity.setPassword(encoder.encode(entity.getPassword()));

        superRepo.save(entity);

        return "ok";

    }

    public String login(LoginRequest request){
        Optional<SuperAdminEntity> found = superRepo.findByEmail(request.getEmail());

        if(found.isEmpty()){
            return "not found";
        }

        Boolean match = encoder.matches(request.getPassword(), found.get().getPassword());
        Boolean roleMatch = request.getRole().equals(found.get().getRole());

        if(match && roleMatch){
            Map<String, String> claim = new HashMap<>();
            claim.put("role", request.getRole());

            String token = jwt.generateToken(request.getEmail(), claim);

            ResponseCookie cookie = ResponseCookie.from("token", token)
                    .maxAge(216000)
                    .sameSite("Lax")
                    .httpOnly(false)
                    .secure(false)
                    .path("/")
                    .build();
            return cookie.toString();
        }

        return "invalid";
    }

    public String extractTokenFromCookie(HttpServletRequest request){
        if(request.getCookies() == null) return null;

        for(Cookie cookie : request.getCookies()){
            if(cookie.getName().equals("token")){
                return cookie.getValue();
            }
        }

        return null;
    }

    public Boolean isVerified(HttpServletRequest request){

        String URI = request.getRequestURI();
        String token = extractTokenFromCookie(request);
        String role = jwt.extractRole(token);

        return "SUPER_ADMIN".equals(role.trim()) && URI.startsWith("/super");
    }

    public Boolean verifySuperLogout(HttpServletRequest request){
        String URI = request.getRequestURI();
        String token = extractTokenFromCookie(request);
        String role = jwt.extractRole(token);

        return role.equals("SUPER_ADMIN") && URI.startsWith("/super");
    }

    public SuperAdminEntity getCurrentUser(HttpServletRequest request){

        String token = extractTokenFromCookie(request);
        String email = jwt.extractEmail(token);
        //System.out.println("\n\n" + email + "\n\n");
        Optional<SuperAdminEntity> userFound = superRepo.findByEmail(email);

        return userFound.orElse(null);
    }

    public List<AdminEntity> fetchAdmin(){
        return adminRepo.findAll();
    }

    public Boolean verifyAdmin(String email){
        Optional<AdminEntity> found = adminRepo.findByEmail(email);

        found.ifPresent(adminEntity -> adminEntity.setVerified(true));
        AdminEntity updated = found.get();
        adminRepo.save(updated);

        return true;
    }

    public Boolean rejectAdmin(String email){

        int affect = adminRepo.deleteByEmail(email);

        return affect > 0;
    }

}
