package com.technotracer.backend.controllers;

import com.technotracer.backend.DTO.LoginRequest;
import com.technotracer.backend.DTO.UserPasswordChange;
import com.technotracer.backend.DTO.UserProfileUpdate;
import com.technotracer.backend.entity.ItemEntity;
import com.technotracer.backend.entity.UserEntity;
import com.technotracer.backend.service.UserService;
import com.technotracer.backend.utils.JWT;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UserController {
    @Autowired
    UserService userService;
    @Autowired
    JWT jwt;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserEntity user){
        String message = userService.registerUser((user));

        if(message.equals("User already exists")){
            return new ResponseEntity<>("User already registered", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>("User registered", HttpStatus.OK);
    }

    @PostMapping("/login/user")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest){
        String token = userService.loginUser(loginRequest);

        if(token.equals("not found")){
            return new ResponseEntity<>("No user found with email", HttpStatus.BAD_REQUEST);
        } else if (token.equals("invalid")){
            return new ResponseEntity<>("Invalid credentials", HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, token)
                .body("Login Successful" + token);
    }

    @PostMapping("/user/logout")
    public ResponseEntity<?> logoutUser(HttpServletRequest request){
        Boolean verified = userService.verifyUserLogout(request);
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

    @GetMapping("/user/details")
    public ResponseEntity<?> getCurrentUser(HttpServletRequest request){
        UserEntity user = userService.getCurrentUser(request);

        if (user != null){
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        return new ResponseEntity<>("User not found",HttpStatus.BAD_REQUEST);

    }

    @GetMapping("/user/verify")
    public Boolean isVerified(HttpServletRequest request){
        Boolean verified = userService.isVerified(request);
        return verified;
    }

    @GetMapping("/get/colleges")
    public List<String> getColleges(@RequestParam(name = "state") String state){
        return userService.getColleges(state);
    }

    @GetMapping("/user/fetch-listing")
    public ResponseEntity<?> fetchPastListing(@RequestParam(name = "college")String college, @RequestParam(name = "email") String email){
        List<ItemEntity> pastItems = userService.fetchListing(email, college);

        return new ResponseEntity<>(pastItems, HttpStatus.OK);
    }

    @PutMapping("/user/update-profile")
    public ResponseEntity<?> updateProfile(@RequestBody UserProfileUpdate profile, @RequestParam(name = "previous") String previous){

        String resp = userService.updateProfile(profile, previous);

        if(resp.equals("ok")){
            return new ResponseEntity<>("Profile updated", HttpStatus.OK);
        }
        else if(resp.equals("present")){
            return new ResponseEntity<>("User already exists with same email", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>("Internal Server Error", HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/user/update-password")
    public ResponseEntity<?> changePassword(@RequestBody UserPasswordChange pass, @RequestParam(name = "email") String email){

        String resp = userService.changePassword(pass, email);

        if(resp.equals("ok")){
            return new ResponseEntity<>("Password Changed", HttpStatus.OK);
        } else if (resp.equals("invalid")) {
            return new ResponseEntity<>("Invalid Current Password", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>("Internal Server Error", HttpStatus.BAD_REQUEST);
    }




}
