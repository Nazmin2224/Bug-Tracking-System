package com.bugtracker.controller;

import com.bugtracker.model.AuthRequest;
import com.bugtracker.model.AuthResponse;
import com.bugtracker.model.CustomUserDetails;
import com.bugtracker.service.AdminService;
import com.bugtracker.service.DeveloperService;
import com.bugtracker.service.TesterService;
import com.bugtracker.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.stream.Stream;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private TesterService testerService;

    @Autowired
    private DeveloperService developerService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        Optional<CustomUserDetails> user = checkAllRoles(request.getEmail(), request.getPassword());

        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.get());
        String role = user.get().getAuthorities().iterator().next().getAuthority(); // e.g., "ROLE_ADMIN"

        return ResponseEntity.ok(new AuthResponse(token, role));
    }

    // ✅ Check user across Admin, Tester, and Developer services
    private Optional<CustomUserDetails> checkAllRoles(String email, String rawPassword) {
        return Stream.of(
                adminService.findByEmail(email),
                testerService.findByEmail(email),
                developerService.findByEmail(email)
        ).filter(Optional::isPresent)
         .map(Optional::get)
         .filter(user -> passwordEncoder.matches(rawPassword, user.getPassword()))
         .findFirst();
    }
}
