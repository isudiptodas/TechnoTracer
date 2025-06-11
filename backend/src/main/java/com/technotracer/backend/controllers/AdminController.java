package com.technotracer.backend.controllers;

import com.technotracer.backend.DTO.AdminProfileUpdate;
import com.technotracer.backend.DTO.AdminQueryReply;
import com.technotracer.backend.DTO.LoginRequest;
import com.technotracer.backend.entity.AdminContactEntity;
import com.technotracer.backend.entity.AdminEntity;
import com.technotracer.backend.entity.ClaimItemEntity;
import com.technotracer.backend.entity.ItemEntity;
import com.technotracer.backend.service.AdminService;
import com.technotracer.backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AdminController {

    @Autowired
    AdminService adminService;
    @Autowired
    UserService userService;

    @PostMapping("/register/admin")
    public ResponseEntity<?> registerAdmin(@RequestBody AdminEntity admin){
        String response = adminService.registerAdmin(admin);

        if(response.equals("user exists")){
            return new ResponseEntity<>("User already exists", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/login/admin")
    public ResponseEntity<?> adminLogin(@RequestBody LoginRequest login){
        String response = adminService.loginAdmin(login);

        if(response != null){
            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, response)
                    .body("Login successfull" + response);
        }

        return new ResponseEntity<>("Invalid credentials", HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/admin/logout")
    public ResponseEntity<?> logoutAdmin(HttpServletRequest request){
        Boolean verified = adminService.verifyAdminLogout(request);
        if (verified){
            ResponseCookie deleteCookie = ResponseCookie.from("token", "")
                    .path("/")
                    .maxAge(0)
                    .build();

            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, deleteCookie.toString())
                    .body("Logged out");
        }

        return new ResponseEntity<>("Unauthorized logout", HttpStatus.BAD_REQUEST);

    }

    @GetMapping("/admin/verify")
    public Boolean isAdminVerified(HttpServletRequest request){
        Boolean verified = userService.isVerified(request);
        return verified;
    }

    @GetMapping("/admin/details")
    public ResponseEntity<?> getCurrentAdmin(HttpServletRequest request){
        AdminEntity admin = adminService.getCurrentAdmin(request);

        if(admin != null){
            return new ResponseEntity<>(admin, HttpStatus.OK);
        }

        return new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/admin/all-posting")
    public ResponseEntity<?> getAllPosting(@RequestParam(name = "college") String college){

        List<ItemEntity> items = adminService.getAllPosting(college);

        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @GetMapping("admin/fetch/all-queries")
    public ResponseEntity<?> fetchAllQueries(@RequestParam(name = "college") String college){
        List<AdminContactEntity> allQueries = adminService.fetchAllQuery(college);

        return new ResponseEntity<>(allQueries, HttpStatus.OK);
    }

    @PutMapping("/admin/approve-posting")
    public ResponseEntity<?> approvePosting(@RequestParam(name = "college") String college, @RequestParam(name = "email") String email, @RequestParam(name = "id") Long id, @RequestParam(name = "foundBy") String foundBy){

        Boolean result = adminService.approvePosting(email, college, foundBy, id);

        if(result){
            return new ResponseEntity<>("Item Posting Verified", HttpStatus.OK);
        }

        return new ResponseEntity<>("Internal Server Error", HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/admin/reject-posting")
    public ResponseEntity<?> rejectPosting(@RequestParam(name = "college") String college, @RequestParam(name = "email") String email, @RequestParam(name = "id") Long id, @RequestParam(name = "foundBy") String foundBy){

        Boolean result = adminService.rejectPosting(email, college, foundBy, id);

        if(result){
            return new ResponseEntity<>("Item Posting Deleted", HttpStatus.OK);
        }

        return new ResponseEntity<>("Internal Server Error", HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/admin/fetch-claims")
    public ResponseEntity<?> fetchClaims(@RequestParam(name = "college") String college){

        List<ClaimItemEntity> resp = adminService.allClaims(college);

        return new ResponseEntity<>(resp, HttpStatus.OK);
    }

    @PutMapping("/admin/settle-claim")
    public ResponseEntity<?> settleClaim(@RequestParam(name = "college") String college,
                                         @RequestParam(name = "name") String claimName,
                                         @RequestParam(name = "id") Long id,
                                         @RequestParam(name = "itemId") Long itemId){

        adminService.settleClaim(college, claimName, id, itemId);

        return new ResponseEntity<>("Claim Settled", HttpStatus.OK);
    }

    @DeleteMapping("/admin/reject-claim")
    public ResponseEntity<?> rejectClaim(@RequestParam(name = "id") Long id){
        int resp = adminService.rejectClaim(id);

        if(resp > 0){
            return new ResponseEntity<>("Claim rejected", HttpStatus.OK);
        }

        return new ResponseEntity<>("Internal Server Error", HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/admin/update-profile")
    public ResponseEntity<?> updateProfile(@RequestParam(name = "currentEmail") String currentEmail, @RequestBody AdminProfileUpdate adminProfile){
        String resp = adminService.updateProfile(currentEmail, adminProfile.getEmail(), adminProfile.getName(), adminProfile.getContact());

        if(resp.equals("present")){
            return new ResponseEntity<>("User with same email already registered", HttpStatus.BAD_REQUEST);
        }
        else if(resp.equals("ok")){
            return new ResponseEntity<>("Admin profile updated", HttpStatus.OK);
        }

        return new ResponseEntity<>("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PutMapping("/admin/change-password")
    public ResponseEntity<?> changePassword(@RequestParam(name = "email") String email, @RequestParam(name = "newPassword") String password, @RequestParam(name = "current") String current){
        String resp = adminService.changePassword(email, password, current);

        if(resp.equals("invalid")){
            return new ResponseEntity<>("Current password is invalid", HttpStatus.BAD_REQUEST);
        }
        else if(resp.equals("ok")){
            return new ResponseEntity<>("Password changed", HttpStatus.OK);
        }

        return new ResponseEntity<>("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping("/admin/reply-query")
    public ResponseEntity<?> replyQuery(@RequestBody AdminQueryReply reply){
        String resp = adminService.sendReply(reply.getTo(), reply.getQueryTitle(), reply.getMessage(), reply.getId(), reply.getUsername(), reply.getCollege());

        if(resp.equals("ok")){
            return new ResponseEntity<>("Reply sent on mail", HttpStatus.OK);
        }

        return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);

    }
}
