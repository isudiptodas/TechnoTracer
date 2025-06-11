package com.technotracer.backend.repository;

import com.technotracer.backend.entity.ItemEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<ItemEntity, Long> {

    @Query("SELECT i from ItemEntity i WHERE i.college = :college AND i.verified = true")
    List<ItemEntity> fetchAllPosting(String college);

    @Query("SELECT it FROM ItemEntity it WHERE it.college = :college AND it.email = :email")
    List<ItemEntity> fetchPastListing(String college, String email);

    @Query("SELECT it FROM ItemEntity it WHERE it.college = :college")
    List<ItemEntity> fetchListingForAdmin(String college);

    @Query("SELECT it FROM ItemEntity it WHERE it.college = :college AND it.email = :email AND it.foundBy = :foundBy AND it.id = :id")
    ItemEntity fetchCustom(String email, String college, String foundBy, Long id);

    @Transactional
    @Modifying
    @Query("DELETE FROM ItemEntity it WHERE it.college = :college AND it.email = :email AND it.foundBy = :foundBy AND it.id = :id")
    int deleteItemPosting(String email, String college, String foundBy, Long id);

    @Query("SELECT it FROM ItemEntity it WHERE it.id = :id")
    ItemEntity findItemById(Long id);

}
