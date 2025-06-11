package com.technotracer.backend.controllers;

import com.technotracer.backend.entity.AdminContactEntity;
import com.technotracer.backend.service.AdminContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdminContactController {

    @Autowired
    AdminContactService adConService;

    @PostMapping("/user/admin-contact")
    public ResponseEntity<?> contactAdmin(@RequestBody AdminContactEntity query){
        String resp =adConService.sendQuery(query);

        if(resp.equals("ok")){
            return new ResponseEntity<>("Query submitted", HttpStatus.OK);
        }

        return new ResponseEntity<>("Internal server error", HttpStatus.BAD_REQUEST);
    }
}
