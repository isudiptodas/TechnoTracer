package com.technotracer.backend.controllers;

import com.technotracer.backend.entity.ClaimItemEntity;
import com.technotracer.backend.service.ClaimItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ClaimItemController {

    @Autowired
    ClaimItemService claimService;

    @PostMapping("/user/add-claim")
    public ResponseEntity<?> addClaim(@RequestBody ClaimItemEntity item){
        String resp = claimService.addClaim(item);

        if(resp.equals("present")){
            return new ResponseEntity<>("You have already claimed for this item", HttpStatus.NOT_ACCEPTABLE);
        }
        else if(resp.equals("ok")){
            return new ResponseEntity<>("Claim submitted", HttpStatus.OK);
        }

        return new ResponseEntity<>("Internal Server Error", HttpStatus.BAD_REQUEST);

    }

}
