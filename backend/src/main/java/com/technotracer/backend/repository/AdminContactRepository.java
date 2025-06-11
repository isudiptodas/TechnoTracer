package com.technotracer.backend.repository;

import com.technotracer.backend.entity.AdminContactEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdminContactRepository extends JpaRepository<AdminContactEntity, Long> {

    @Query("SELECT adc FROM AdminContactEntity adc WHERE adc.college = :college")
    List<AdminContactEntity> findByCollege(String college);
}
