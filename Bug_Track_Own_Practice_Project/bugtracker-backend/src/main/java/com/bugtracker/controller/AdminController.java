package com.bugtracker.controller;

import com.bugtracker.model.Admin;
import com.bugtracker.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/admins")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<Admin> getAll() {
        return adminService.getAllAdmins();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Admin createAdmin(@RequestBody Admin admin) {
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminService.saveAdmin(admin);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public Admin updateAdmin(@PathVariable Long id, @RequestBody Admin updatedAdmin) {
        Admin existing = adminService.getAdminById(id);
        existing.setName(updatedAdmin.getName());
        existing.setEmail(updatedAdmin.getEmail());

        if (!updatedAdmin.getPassword().equals(existing.getPassword())) {
            existing.setPassword(passwordEncoder.encode(updatedAdmin.getPassword()));
        }

        return adminService.saveAdmin(existing);
    }

    
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteAdmin(@PathVariable Long id) {
        adminService.deleteAdmin(id);
    }
}
