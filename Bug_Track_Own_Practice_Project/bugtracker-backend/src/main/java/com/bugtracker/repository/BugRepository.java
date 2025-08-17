package com.bugtracker.repository;

import com.bugtracker.model.Bug;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BugRepository extends JpaRepository<Bug, Long> {

    List<Bug> findByProjectId(Long projectId);
    List<Bug> findByCreatedById(Long TesterId);
    List<Bug> findByAssignedToId(Long DeveloperId);
}
