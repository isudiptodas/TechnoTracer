package com.technotracer.backend.repository;

import com.technotracer.backend.entity.ClaimItemEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClaimItemRepository extends JpaRepository<ClaimItemEntity, Long> {

    @Query("SELECT c FROM ClaimItemEntity c WHERE c.claimUserName = :name AND c.claimUserEmail = :email AND c.itemName = :itemName AND c.itemId = :itemId")
    Optional<ClaimItemEntity> findByClaimName(String name, String itemName, Long itemId, String email);

    @Query("SELECT cl FROM ClaimItemEntity cl WHERE cl.college = :college")
    List<ClaimItemEntity> findByCollege(String college);
    @Query("SELECT cl FROM ClaimItemEntity cl WHERE cl.college = :college AND cl.id = id AND cl.itemId = :itemId AND cl.claimUserName = :claimName")
    ClaimItemEntity findByIdAndItemId(String college, String claimName, Long id, Long itemId);
    @Modifying
    @Transactional
    @Query("DELETE FROM ClaimItemEntity cl WHERE cl.id = :id")
    int findByIdAndDelete(Long id);
}
