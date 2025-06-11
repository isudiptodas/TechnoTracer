package com.technotracer.backend.service;

import com.technotracer.backend.entity.AdminEntity;
import com.technotracer.backend.entity.UserEntity;
import com.technotracer.backend.repository.AdminRepository;
import com.technotracer.backend.repository.UserRepository;
import com.technotracer.backend.utils.SendMail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PasswordRecoveryService {

    @Autowired
    UserRepository userRepo;
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    @Autowired
    AdminRepository adminRepo;
    @Autowired
    SendMail sendMail;

    public String checkEmail(String email, Long otp){
        Optional<UserEntity> found = userRepo.findByEmail(email);
        Optional<AdminEntity> foundAdmin = adminRepo.findByEmail(email);

        if(found.isPresent() || foundAdmin.isPresent()){
            String body = "Your one time password for password recovery is " + otp;
            sendMail.sendMail(email, "OTP for password recovery", body);

            return "ok";
        }
        else if(found.isEmpty() && foundAdmin.isEmpty()){
            return "not present";
        }

        return "bad";

    }

    public String passwordChange(String email, String password){
        Optional<UserEntity> found = userRepo.findByEmail(email);
        Optional<AdminEntity> foundAdmin = adminRepo.findByEmail(email);

        if(found.isPresent()){
            found.get().setPassword(encoder.encode(password));
            userRepo.save(found.get());
            return "ok";
        }
        else if(foundAdmin.isPresent()){
            foundAdmin.get().setPassword(encoder.encode(password));
            adminRepo.save(foundAdmin.get());
            return "ok";
        }

        return "bad";
    }
}
