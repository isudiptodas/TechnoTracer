package com.technotracer.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "claims")
public class ClaimItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String itemName;
    private Long itemId;
    private String itemImage;
    private String itemCategory;
    private String itemFoundBy;
    private String itemFoundAt;
    private String college;
    private String claimUserName;
    private String claimUserEmail;
    private String claimUserContact;
    private String ownershipProof;
    private Boolean ownerFound = false;

    public Boolean getOwnerFound() {
        return ownerFound;
    }

    public void setOwnerFound(Boolean ownerFound) {
        this.ownerFound = ownerFound;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getItemImage() {
        return itemImage;
    }

    public void setItemImage(String itemImage) {
        this.itemImage = itemImage;
    }

    public String getItemCategory() {
        return itemCategory;
    }

    public void setItemCategory(String itemCategory) {
        this.itemCategory = itemCategory;
    }

    public String getItemFoundBy() {
        return itemFoundBy;
    }

    public void setItemFoundBy(String itemFoundBy) {
        this.itemFoundBy = itemFoundBy;
    }

    public String getItemFoundAt() {
        return itemFoundAt;
    }

    public void setItemFoundAt(String itemFoundAt) {
        this.itemFoundAt = itemFoundAt;
    }

    public String getCollege() {
        return college;
    }

    public void setCollege(String college) {
        this.college = college;
    }

    public String getClaimUserName() {
        return claimUserName;
    }

    public void setClaimUserName(String claimUserName) {
        this.claimUserName = claimUserName;
    }

    public String getClaimUserContact() {
        return claimUserContact;
    }

    public void setClaimUserContact(String claimUserContact) {
        this.claimUserContact = claimUserContact;
    }

    public String getOwnershipProof() {
        return ownershipProof;
    }

    public void setOwnershipProof(String ownershipProof) {
        this.ownershipProof = ownershipProof;
    }

    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public String getClaimUserEmail() {
        return claimUserEmail;
    }

    public void setClaimUserEmail(String claimUserEmail) {
        this.claimUserEmail = claimUserEmail;
    }


}
