package com.bugtracker.service;

import com.bugtracker.model.CustomUserDetails;
import com.bugtracker.model.Admin;
import com.bugtracker.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Admin saveAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    public Admin getAdminById(Long id) {
        return adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
    }

    public void deleteAdmin(Long id) {
        adminRepository.deleteById(id);
    }

    public Optional<CustomUserDetails> findByEmail(String email) {
        return adminRepository.findByEmail(email)
                .map(admin -> new CustomUserDetails(
                        admin.getEmail(),
                        admin.getPassword(),
                        List.of(new SimpleGrantedAuthority("ROLE_ADMIN"))  // Correct role prefix here
                ));
    }
}
