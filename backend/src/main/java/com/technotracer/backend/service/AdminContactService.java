package com.technotracer.backend.service;

import com.technotracer.backend.entity.AdminContactEntity;
import com.technotracer.backend.repository.AdminContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminContactService {

    @Autowired
    AdminContactRepository adConRepo;

    public String sendQuery(AdminContactEntity query){
        adConRepo.save(query);

        return "ok";
    }
}
