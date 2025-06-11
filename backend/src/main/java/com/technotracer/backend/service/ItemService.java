package com.technotracer.backend.service;

import com.technotracer.backend.entity.ItemEntity;
import com.technotracer.backend.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {

    @Autowired
    ItemRepository itemRepo;

    public ItemEntity registerItem(ItemEntity entity){
        itemRepo.save(entity);
        return entity;
    }

    public List<ItemEntity> getAllItems(String college){
        return itemRepo.fetchAllPosting(college);
    }
}
