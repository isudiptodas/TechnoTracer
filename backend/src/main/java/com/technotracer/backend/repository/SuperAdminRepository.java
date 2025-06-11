package com.technotracer.backend.repository;

import com.technotracer.backend.entity.SuperAdminEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SuperAdminRepository extends JpaRepository<SuperAdminEntity, Long> {
    @Query("SELECT s from SuperAdminEntity s WHERE s.email = :email")
    Optional<SuperAdminEntity> findByEmail(String email);
}
