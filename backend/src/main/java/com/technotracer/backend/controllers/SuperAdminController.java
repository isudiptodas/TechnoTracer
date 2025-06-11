package com.technotracer.backend.controllers;

import com.technotracer.backend.DTO.LoginRequest;
import com.technotracer.backend.entity.SuperAdminEntity;
import com.technotracer.backend.service.SuperAdminService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class SuperAdminController {

    @Autowired
    SuperAdminService superService;

    @PostMapping("/login/super-admin")
    public ResponseEntity<?> loginSuper(@RequestBody LoginRequest login){
        String token = superService.login(login);

        if(token.equals("not found")){
            return new ResponseEntity<>("No user found with email", HttpStatus.BAD_REQUEST);
        }
        else if(token.equals("invalid")){
            return new ResponseEntity<>("Invalid credentials", HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, token)
                .body("Login Successful\n" + token);
    }

    @PostMapping("/register/super-admin")
    public ResponseEntity<?> registerSuper(@RequestBody SuperAdminEntity sup){
        String resp = superService.register(sup);

        if (resp.equals("Already present")){
            return new ResponseEntity<>("Already present", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("Registered", HttpStatus.OK);
    }

    @GetMapping("/super/verify")
    public Boolean isVerified(HttpServletRequest request){
        return superService.isVerified(request);
    }

    @PostMapping("/super/logout")
    public ResponseEntity<?> logoutUser(HttpServletRequest request){
        Boolean verified = superService.verifySuperLogout(request);
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

    @GetMapping("/super/details")
    public ResponseEntity<?> getCurrentUser(HttpServletRequest request){
        SuperAdminEntity supAdmin = superService.getCurrentUser(request);

        if (supAdmin != null){
            return new ResponseEntity<>(supAdmin, HttpStatus.OK);
        }
        return new ResponseEntity<>("User not found",HttpStatus.BAD_REQUEST);

    }

    @GetMapping("/super/fetch-admins")
    public ResponseEntity<?> fetchAdmin(){
        return new ResponseEntity<>(superService.fetchAdmin(), HttpStatus.OK);
    }

    @PutMapping("/super/verify-admin")
    public ResponseEntity<?> verifyAdmin(@RequestParam(name = "email") String email){
        Boolean resp = superService.verifyAdmin(email);

        if(resp){
            return new ResponseEntity<>("Admin verified", HttpStatus.OK);
        }

        return new ResponseEntity<>("Internal problem", HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/super/reject-admin")
    public ResponseEntity<?> rejectAdmin(@RequestParam(name = "email") String email){
        Boolean resp = superService.rejectAdmin(email);

        if(resp){
            return new ResponseEntity<>("Application rejected", HttpStatus.OK);
        }

        return new ResponseEntity<>("Internal problem", HttpStatus.BAD_REQUEST);
    }
}
