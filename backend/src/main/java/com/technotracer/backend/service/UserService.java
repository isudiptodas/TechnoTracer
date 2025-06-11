package com.technotracer.backend.service;

import com.technotracer.backend.DTO.LoginRequest;
import com.technotracer.backend.DTO.UserPasswordChange;
import com.technotracer.backend.DTO.UserProfileUpdate;
import com.technotracer.backend.entity.AdminEntity;
import com.technotracer.backend.entity.ItemEntity;
import com.technotracer.backend.entity.UserEntity;
import com.technotracer.backend.repository.AdminRepository;
import com.technotracer.backend.repository.ItemRepository;
import com.technotracer.backend.repository.UserRepository;
import com.technotracer.backend.utils.JWT;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {
    @Autowired
    UserRepository userRepo;
    @Autowired
    AdminRepository adminRepo;
    @Autowired
    ItemRepository itemRepo;
    @Autowired
    JWT jwt;

    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public String registerUser(UserEntity user){

        Optional<UserEntity> userFound = userRepo.findByEmail(user.getEmail());
        Optional<AdminEntity> userAdmin = adminRepo.findByEmail(user.getEmail());

        if(userFound.isPresent()){
            //System.out.println("user found -> " + userFound.get().getEmail());
            return "User already exists";
        }

        if (userAdmin.isPresent()){
            return "User already exists";
        }

        user.setPassword(encoder.encode(user.getPassword()));
        userRepo.save(user);
        return "User registered";
    }

    public String loginUser(LoginRequest user){
        Optional<UserEntity> found = userRepo.findByEmail(user.getEmail());

        if(found.isEmpty()){
            return "not found";
        }

        Boolean match = encoder.matches(user.getPassword(), found.get().getPassword());
        Boolean roleMatch = found.get().getRole().equals(user.getRole());

        if(roleMatch && match){
            Map<String, String> claim = new HashMap<>();
            claim.put("role", user.getRole());

            String token = jwt.generateToken(user.getEmail(), claim);

            ResponseCookie cookie = ResponseCookie.from("token", token)
                    .maxAge(216000)
                    .sameSite("Lax")
                    .httpOnly(true)
                    .secure(false)
                    .path("/")
                    .build();
            return cookie.toString();
        }
        return "invalid";
    }

    public UserEntity getCurrentUser(HttpServletRequest request){

        String token = extractTokenFromCookie(request);
        String email = jwt.extractEmail(token);
        //System.out.println("\n\n" + email + "\n\n");
        Optional<UserEntity> userFound = userRepo.findByEmail(email);

        return userFound.orElse(null);
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

        if("USER".equals(role.trim()) && URI.startsWith("/user")){
            return true;
        }
        else if("ADMIN".equals(role.trim()) && URI.startsWith("/admin")){
            return true;
        }
        return false;
    }

    public Boolean verifyUserLogout(HttpServletRequest request){
        String URI = request.getRequestURI();
        String token = extractTokenFromCookie(request);
        String role = jwt.extractRole(token);

        return role.equals("USER") && URI.startsWith("/user");
    }

    public List<String> getColleges(String state){
        Optional<List<String>> colleges = adminRepo.findCollegeByState(state);

        //System.out.println(colleges.get());

        return colleges.orElse(null);
    }

    public List<ItemEntity> fetchListing(String email, String college){
        return itemRepo.fetchPastListing(college, email);
    }

    public String updateProfile(UserProfileUpdate profile, String email){
        Optional<UserEntity> found = userRepo.findByEmail(email);
        Optional<UserEntity> foundUser = userRepo.findByEmail(profile.getEmail());

        if(foundUser.isPresent() && !Objects.equals(foundUser.get().getEmail(), email)){
            return "present";
        }

        if(found.isPresent()){
            found.get().setEmail(profile.getEmail());
            found.get().setUsername(profile.getName());
            found.get().setContact(profile.getContact());

            userRepo.save(found.get());

            return "ok";
        }

        return "bad";
    }

    public String changePassword(UserPasswordChange pass, String email){
        Optional<UserEntity> found = userRepo.findByEmail(email);

        if(found.isPresent()){
            boolean match = encoder.matches(pass.getCurrentPassword(), found.get().getPassword());

            if(match){
                found.get().setPassword(encoder.encode(pass.getNewPassword()));
                userRepo.save(found.get());
                return "ok";
            }
            else{
                return "invalid";
            }
        }

        return "bad";
    }
}
