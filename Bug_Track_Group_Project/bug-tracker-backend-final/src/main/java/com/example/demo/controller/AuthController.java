package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtUtil;
import com.example.demo.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public AuthController(UserService userService, PasswordEncoder passwordEncoder, JwtUtil jwtUtil, UserRepository userRepository) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        User user = userService.authenticate(request.getUsername(), request.getPassword());
        if (user == null) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
        return ResponseEntity.ok(new LoginResponse(token, user.getRole(), user.getUsername()));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (userService.existsByUsername(request.getUsername())) {
            return ResponseEntity.badRequest().body("Username already taken");
        }

        if (userService.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Email already registered");
        }

        if ("ADMIN".equalsIgnoreCase(request.getRole())) {
            User currentUser = userService.getCurrentUser();
            if (currentUser == null || currentUser.getId() != 1L) {
                return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body("Only the initial admin (ID = 1) can create other admins.");
            }
        }

        User newUser = new User();
        newUser.setUsername(request.getUsername());
        newUser.setEmail(request.getEmail());
        newUser.setPassword(request.getPassword()); // Raw password; will be encoded
        newUser.setRole(request.getRole().toUpperCase());

        userService.save(newUser);
        return ResponseEntity.ok("User registered successfully");
    }

    @GetMapping("/users")
    public List<User> getUsersByRole(@RequestParam(required = false) String role) {
        if (role == null) {
            return userRepository.findAll();
        } else {
            return userRepository.findByRoleIgnoreCase(role);
        }
    }

    // === Inner static classes ===

    public PasswordEncoder getPasswordEncoder() {
		return passwordEncoder;
	}

	public static class LoginRequest {
        private String username;
        private String password;

        public LoginRequest() {}

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    public static class LoginResponse {
        private String token;
        private String role;
        private String username;

        public LoginResponse(String token, String role, String username) {
            this.token = token;
            this.role = role;
            this.username = username;
        }

        public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }
    }

    public static class RegisterRequest {
        private String username;
        private String email;
        private String password;
        private String role;

        public RegisterRequest() {}

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }
    }

    
    @Controller
    public class FrontendRedirectController {
        @GetMapping({ "/", "/{x:^(?!api|static|auth).*$}/**" })
        public String redirect() {
            return "forward:/index.html";
        }
    }
}
