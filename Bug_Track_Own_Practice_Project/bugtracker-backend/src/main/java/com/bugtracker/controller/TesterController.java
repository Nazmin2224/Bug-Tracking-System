package com.bugtracker.controller;

import com.bugtracker.model.Tester;
import com.bugtracker.service.TesterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/testers")
public class TesterController {

    @Autowired
    private TesterService testerService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ✅ Only ADMIN can view all testers
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<Tester> getAll() {
        return testerService.getAllTesters();
    }

    // ✅ Only ADMIN can create a tester
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Tester createTester(@RequestBody Tester tester) {
        tester.setPassword(passwordEncoder.encode(tester.getPassword()));
        return testerService.saveTester(tester);
    }

    // ✅ ADMIN or TESTER can update
    @PreAuthorize("hasAnyRole('ADMIN', 'TESTER')")
    @PutMapping("/{id}")
    public Tester updateTester(@PathVariable Long id, @RequestBody Tester updatedTester) {
        Tester existing = testerService.getTesterById(id);
        existing.setName(updatedTester.getName());
        existing.setEmail(updatedTester.getEmail());

        if (!updatedTester.getPassword().equals(existing.getPassword())) {
            existing.setPassword(passwordEncoder.encode(updatedTester.getPassword()));
        }

        return testerService.saveTester(existing);
    }

    // ✅ Only ADMIN can delete a tester
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteTester(@PathVariable Long id) {
        testerService.deleteTester(id);
    }
}
