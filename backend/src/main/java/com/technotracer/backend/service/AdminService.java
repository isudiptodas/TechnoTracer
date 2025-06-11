package com.technotracer.backend.service;

import com.technotracer.backend.DTO.LoginRequest;
import com.technotracer.backend.entity.*;
import com.technotracer.backend.repository.*;
import com.technotracer.backend.utils.JWT;
import com.technotracer.backend.utils.SendMail;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    AdminRepository adminRepo;
    @Autowired
    UserRepository userRepo;
    @Autowired
    ItemRepository itemRepo;
    @Autowired
    AdminContactRepository adminContactRepo;
    @Autowired
    ClaimItemRepository claimRepo;
    @Autowired
    JWT jwt;
    @Autowired
    SendMail sendMail;
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public String registerAdmin(AdminEntity admin){
        Optional<AdminEntity> found = adminRepo.findByEmail(admin.getEmail());
        Optional<UserEntity> userFound = userRepo.findByEmail(admin.getEmail());

        if(found.isPresent()){
            return "user exists";
        }

        if(userFound.isPresent()){
            return "user exists";
        }

        admin.setPassword(encoder.encode(admin.getPassword()));
        adminRepo.save(admin);
        return "ok";

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

    public AdminEntity getCurrentAdmin(HttpServletRequest request){
        String token = extractTokenFromCookie(request);
        String email = jwt.extractEmail(token);

        Optional<AdminEntity> found = adminRepo.findByEmail(email);

        return found.orElse(null);
    }

    public Boolean verifyAdminLogout(HttpServletRequest request){
        String URI = request.getRequestURI();
        String token = extractTokenFromCookie(request);
        String role = jwt.extractRole(token);

        if(role.equals("ADMIN") && URI.startsWith("/admin")){
            return true;
        }

        return false;
    }

    public String loginAdmin(LoginRequest login){
        Optional<AdminEntity> found = adminRepo.findByEmail(login.getEmail());

        if(found.isPresent()){
            Boolean match = encoder.matches(login.getPassword(), found.get().getPassword());
            Boolean roleMatch = found.get().getRole().equals(login.getRole());
            Boolean verified = found.get().getVerified();

//            System.out.println(login.getPassword()+ "\n" + found.get().getPassword());
//            System.out.println(match +"\n" + roleMatch + "\n" + verified);

            if(match && roleMatch && verified){
                Map<String, String> claim = new HashMap<>();
                claim.put("role", login.getRole());

                String token = jwt.generateToken(login.getEmail(), claim);

                ResponseCookie cookie = ResponseCookie.from("token", token)
                        .maxAge(216000)
                        .sameSite("Lax")
                        .httpOnly(true)
                        .secure(false)
                        .path("/")
                        .build();
                return cookie.toString();
            }
        }
        return null;
    }

    public List<ItemEntity> getAllPosting(String college){
        return itemRepo.fetchListingForAdmin(college);
    }

    public List<AdminContactEntity> fetchAllQuery(String college){

        return adminContactRepo.findByCollege(college);
    }

    @Transactional
    public Boolean approvePosting(String email, String college, String foundBy, Long id){
        ItemEntity result = itemRepo.fetchCustom(email, college, foundBy, id);

        result.setVerified(true);
        itemRepo.save(result);

        return true;
    }

    public Boolean rejectPosting(String email, String college, String foundBy, Long id){
        int result = itemRepo.deleteItemPosting(email, college, foundBy, id);

        return result > 0;
    }

    public List<ClaimItemEntity> allClaims(String college){

        return claimRepo.findByCollege(college);
    }

    public void settleClaim(String college, String claimName, Long id, Long itemId){
        ClaimItemEntity ent = claimRepo.findByIdAndItemId(college, claimName, id, itemId);
        ItemEntity item = itemRepo.findItemById(itemId);

        ent.setOwnerFound(true);
        item.setOwnerFound(true);
        claimRepo.save(ent);
        itemRepo.save(item);
    }

    public int rejectClaim(Long id){
        return claimRepo.findByIdAndDelete(id);
    }

    public String updateProfile(String current, String newEmail, String name, String contact){
        Optional<AdminEntity> found = adminRepo.findByEmail(current);
        Optional<UserEntity> foundUser = userRepo.findByEmail(newEmail);

        if(foundUser.isPresent()){
            return "present";
        }

        if(found.isPresent()){
            found.get().setContact(contact);
            found.get().setName(name);
            found.get().setEmail(newEmail);

            adminRepo.save(found.get());

            return "ok";
        }

        return "bad";
    }

    public String changePassword(String email, String password, String current){
        Optional<AdminEntity> found = adminRepo.findByEmail(email);

        if(found.isPresent()){
            Boolean match = encoder.matches(current, found.get().getPassword());

            if(!match){
                return "invalid";
            }

            found.get().setPassword(encoder.encode(password));
            adminRepo.save(found.get());

            return "ok";
        }

        return "bad";
    }

    public String sendReply(String to, String subject, String message, Long id, String name, String college){

        String edited = "Hello "+name + ", \n\n This mail is regarding your recent query on Technotracer titled : "+subject +
                ". Thank you for your patience.\n\n" + message +"\n\n Best regards,\n" +"Admin : "+college;
        sendMail.sendMail(to, subject, edited);
        Optional<AdminContactEntity> found = adminContactRepo.findById(id);

        if(found.isPresent()){
            found.get().setSolved(true);
            adminContactRepo.save(found.get());

            return "ok";
        }

        return "bad";
    }
}
