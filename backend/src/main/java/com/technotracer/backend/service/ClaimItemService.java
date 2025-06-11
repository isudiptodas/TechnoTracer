package com.technotracer.backend.service;

import com.technotracer.backend.entity.ClaimItemEntity;
import com.technotracer.backend.repository.ClaimItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ClaimItemService {

    @Autowired
    ClaimItemRepository claimRepo;

    public String addClaim(ClaimItemEntity item){
        Optional<ClaimItemEntity> found = claimRepo.findByClaimName(item.getClaimUserName(), item.getItemName(), item.getItemId(), item.getClaimUserEmail());

        if(found.isPresent()){
            return "present";
        }

        claimRepo.save(item);

        return "ok";
    }
}
