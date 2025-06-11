package com.technotracer.backend.controllers;

import com.technotracer.backend.service.PasswordRecoveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PasswordRecoveryController {

    @Autowired
    PasswordRecoveryService passwordRecoveryService;

    @GetMapping("/password-recovery")
    public ResponseEntity<?> checkEmail(@RequestParam(name = "email") String email, @RequestParam(name = "otp") Long otp){
        String resp = passwordRecoveryService.checkEmail(email, otp);

        if(resp.equals("ok")){
            return new ResponseEntity<>("OTP sent on mail", HttpStatus.OK);
        }
        else if(resp.equals("not present")){
            return new ResponseEntity<>("No user found", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>("Internal Server Error", HttpStatus.BAD_GATEWAY);
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestParam(name = "email") String email, @RequestParam(name = "password") String password){
        String resp = passwordRecoveryService.passwordChange(email, password);

        if(resp.equals("ok")){
            return new ResponseEntity<>("Password changed", HttpStatus.OK);
        }

        return new ResponseEntity<>("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
