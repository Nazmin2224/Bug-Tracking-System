package com.bugtracker.service;

import com.bugtracker.model.CustomUserDetails;
import com.bugtracker.model.Tester;
import com.bugtracker.repository.TesterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TesterService {

    @Autowired
    private TesterRepository testerRepository;

    public List<Tester> getAllTesters() {
        return testerRepository.findAll();
    }

    public Tester saveTester(Tester tester) {
        return testerRepository.save(tester);
    }

    public Tester getTesterById(Long id) {
        return testerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tester not found"));
    }

    public void deleteTester(Long id) {
        testerRepository.deleteById(id);
    }

    public Optional<CustomUserDetails> findByEmail(String email) {
        return testerRepository.findByEmail(email)
                .map(tester -> new CustomUserDetails(
                        tester.getEmail(),
                        tester.getPassword(),
                        List.of(new SimpleGrantedAuthority("ROLE_TESTER"))

                ));
    }
}
