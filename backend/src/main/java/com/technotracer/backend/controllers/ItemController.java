package com.technotracer.backend.controllers;

import com.technotracer.backend.entity.ItemEntity;
import com.technotracer.backend.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ItemController {

    @Autowired
    ItemService itemService;

    @PostMapping("/user/report-item")
    public ResponseEntity<?> reportItem(@RequestBody ItemEntity entity){
        ItemEntity saved = itemService.registerItem(entity);
        return new ResponseEntity<>(saved, HttpStatus.OK);
    }

    @GetMapping("/user/items/all")
    public ResponseEntity<?> getAllItems(@RequestParam(name = "college") String college){

        //System.out.println("\n\n" +college +"\n\n");
        List<ItemEntity> items = itemService.getAllItems(college);

        return new ResponseEntity<>(items, HttpStatus.OK);
    }
}
