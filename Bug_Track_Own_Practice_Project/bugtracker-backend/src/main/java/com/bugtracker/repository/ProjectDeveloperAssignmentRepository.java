package com.bugtracker.repository;

import com.bugtracker.model.ProjectDeveloperAssignment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectDeveloperAssignmentRepository extends JpaRepository<ProjectDeveloperAssignment, Long> {
}
