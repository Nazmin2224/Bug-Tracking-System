package com.bugtracker.service;

import com.bugtracker.model.Admin;
import com.bugtracker.model.CustomUserDetails;
import com.bugtracker.model.Developer;
import com.bugtracker.model.Tester;
import com.bugtracker.repository.AdminRepository;
import com.bugtracker.repository.DeveloperRepository;
import com.bugtracker.repository.TesterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private AdminRepository adminRepo;

    @Autowired
    private DeveloperRepository developerRepo;

    @Autowired
    private TesterRepository testerRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Check Admins
        Admin admin = adminRepo.findByEmail(email).orElse(null);
        if (admin != null) {
            return new CustomUserDetails(
                    admin.getEmail(),
                    admin.getPassword(),
                    Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN"))
            );
        }

        // Check Developers
        Developer dev = developerRepo.findByEmail(email).orElse(null);
        if (dev != null) {
            return new CustomUserDetails(
                    dev.getEmail(),
                    dev.getPassword(),
                    Collections.singletonList(new SimpleGrantedAuthority("ROLE_DEVELOPER"))
            );
        }

        // Check Testers
        Tester tester = testerRepo.findByEmail(email).orElse(null);
        if (tester != null) {
            return new CustomUserDetails(
                    tester.getEmail(),
                    tester.getPassword(),
                    Collections.singletonList(new SimpleGrantedAuthority("ROLE_TESTER"))
            );
        }

        // No match found
        throw new UsernameNotFoundException("User not found with email: " + email);
    }
}
