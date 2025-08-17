package com.bugtracker.service;

import com.bugtracker.model.CustomUserDetails;
import com.bugtracker.model.Developer;
import com.bugtracker.repository.DeveloperRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DeveloperService {

    @Autowired
    private DeveloperRepository developerRepository;

    public List<Developer> getAllDevelopers() {
        return developerRepository.findAll();
    }

    public Developer saveDeveloper(Developer developer) {
        return developerRepository.save(developer);
    }

    public Developer getDeveloperById(Long id) {
        return developerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Developer not found"));
    }

    public void deleteDeveloper(Long id) {
        developerRepository.deleteById(id);
    }

    public Optional<CustomUserDetails> findByEmail(String email) {
        return developerRepository.findByEmail(email)
                .map(developer -> new CustomUserDetails(
                        developer.getEmail(),
                        developer.getPassword(),
                        List.of(new SimpleGrantedAuthority("ROLE_DEVELOPER"))
                ));
    }
}
