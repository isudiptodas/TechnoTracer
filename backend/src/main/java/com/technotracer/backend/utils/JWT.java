package com.technotracer.backend.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Map;

@Component
public class JWT {

    @Value("${jwt.secret-key}")
    private String jwtSecret;

    private SecretKey getSigningKey(){
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }
    public String generateToken(String email, Map<String, String> claim){

        Date issueAt = Date.from(Instant.now());
        Date expireAt = Date.from(issueAt.toInstant().plus(5, ChronoUnit.HOURS));
        Key jwtKey = Keys.hmacShaKeyFor(jwtSecret.getBytes());
        return Jwts.builder()
                .claims(claim)
                .subject(email)
                .issuedAt(issueAt)
                .expiration(expireAt)
                .signWith(jwtKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public Claims extractAllClaims(String token){
        try {
            JwtParser parser = Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build();
            Claims claims = parser.parseSignedClaims(token).getPayload();
            //System.out.println("Extracted Claims: " + claims);
            return claims;
        } catch (Exception e) {
            System.out.println("JWT Parsing Error: " + e.getMessage());
            return null;
        }
    }

    public String extractEmail(String token){
        return extractAllClaims(token).getSubject();
    }

    public String extractRole(String token){
        Claims claims = extractAllClaims(token);
        if (claims == null) {
            System.out.println("No claims found in token");
            return null;
        }
        String role = claims.get("role", String.class);
        //System.out.println("Extracted Role from JWT: " + role);
        return role;
    }

    public Boolean isTokenValid(String token){
        try {
            Claims claims = extractAllClaims(token);
            return claims.getExpiration().after(new Date());
        }
        catch (Exception e){
            return false;
        }
    }
}
