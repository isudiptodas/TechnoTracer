package com.technotracer.backend.repository;

import com.technotracer.backend.entity.AdminEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<AdminEntity, Long> {

    @Query("SELECT a FROM AdminEntity a WHERE a.email = :email")
    Optional<AdminEntity> findByEmail(String email);

    @Query("SELECT DISTINCT a.college FROM AdminEntity a WHERE a.verified = true AND a.state = :state")
    Optional<List<String>> findCollegeByState(String state);

    @Transactional
    @Modifying
    @Query("DELETE FROM AdminEntity ad WHERE ad.email = :email")
    int deleteByEmail(String email);

}
