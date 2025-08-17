package com.bugtracker.repository;

import com.bugtracker.model.Tester;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

//import java.util.Optional;

public interface TesterRepository extends JpaRepository<Tester, Long> {
    Optional<Tester> findByEmail(String email); // Make sure return type is Optional
}
