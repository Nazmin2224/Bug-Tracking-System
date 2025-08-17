package com.bugtracker.controller;

import com.bugtracker.model.Developer;
import com.bugtracker.service.DeveloperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/developers")
public class DeveloperController {

    @Autowired
    private DeveloperService developerService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ✅ Only ADMIN can view all developers
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<Developer> getAllDevelopers() {
        return developerService.getAllDevelopers();
    }

    // ✅ Only ADMIN can create a developer
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Developer createDeveloper(@RequestBody Developer developer) {
        developer.setPassword(passwordEncoder.encode(developer.getPassword()));
        return developerService.saveDeveloper(developer);
    }

    // ✅ ADMIN or DEVELOPER can update a developer
    @PreAuthorize("hasAnyRole('ADMIN', 'DEVELOPER')")
    @PutMapping("/{id}")
    public Developer updateDeveloper(@PathVariable Long id, @RequestBody Developer updatedDeveloper) {
        Developer existing = developerService.getDeveloperById(id);
        existing.setName(updatedDeveloper.getName());
        existing.setEmail(updatedDeveloper.getEmail());

        // Only update password if it's different
        if (!updatedDeveloper.getPassword().equals(existing.getPassword())) {
            existing.setPassword(passwordEncoder.encode(updatedDeveloper.getPassword()));
        }

        return developerService.saveDeveloper(existing);
    }

    // ✅ Only ADMIN can delete a developer
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteDeveloper(@PathVariable Long id) {
        developerService.deleteDeveloper(id);
    }
}
