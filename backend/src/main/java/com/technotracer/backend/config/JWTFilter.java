package com.technotracer.backend.config;

import com.technotracer.backend.utils.JWT;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

public class JWTFilter extends OncePerRequestFilter {

    @Autowired
    JWT jwt;

    public JWTFilter(JWT jwt){
        this.jwt = jwt;
    }

    private static final List<String> PUBLIC = List.of("/register", "/login/user", "/register/admin", "/login/admin", "/login/super-admin", "/register/super-admin", "/get/colleges", "/super/fetch-admins", "/super/verify-admin", "/super/reject-admin", "/password-recovery", "/change-password");
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String path = request.getRequestURI();
        if (PUBLIC.contains(path)) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = extractTokenFromCookie(request);
//        System.out.println("\n"+ token +"\n");
//        System.out.println("\n"+ path +"\n");

        if(token == null || !jwt.isTokenValid(token)){
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Unauthorized: Invalid or missing token");
            return;
        }

       String role = jwt.extractRole(token);
       //System.out.println("\n\n"+ role);

       if(!isAuthorized(request, role)){
           response.setStatus(HttpServletResponse.SC_FORBIDDEN);
           response.getWriter().write("Forbidden: Role not allowed for this route");
           return;
       }

       filterChain.doFilter(request, response);
    }

    public String extractTokenFromCookie(HttpServletRequest request){
        if(request.getCookies() == null) return null;

        for(Cookie cookie : request.getCookies()){
            if (cookie.getName().equals("token")){
                return cookie.getValue();
            }
        }
        return null;
    }

    public boolean isAuthorized(HttpServletRequest request, String role){
        String URI = request.getRequestURI();
        if("USER".equals(role.trim()) && URI.startsWith("/user")){
            return true;
        }
        else if("ADMIN".equals(role.trim()) && URI.startsWith("/admin")){
            return true;
        } else if ("SUPER_ADMIN".equals(role.trim()) && URI.startsWith("/super")) {
            return true;
        }
        return false;

    }
}
