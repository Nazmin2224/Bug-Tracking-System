package com.bugtracker.service;

import com.bugtracker.model.Bug;
import com.bugtracker.model.Developer;
import com.bugtracker.repository.BugRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BugService {

    @Autowired
    private BugRepository bugRepository;

    public List<Bug> getAllBugs() {
        return bugRepository.findAll();
    }

    public Bug createBug(Bug bug) {
        return bugRepository.save(bug);
    }

    public Optional<Bug> getBugById(Long id) {
        return bugRepository.findById(id);
    }

    public void deleteBug(Long id) {
        bugRepository.deleteById(id);
    }

    public List<Bug> getBugsByCreator(Long testerId) {
        return bugRepository.findByCreatedById(testerId);
    }

    public List<Bug> getBugsByProject(Long projectId) {
        return bugRepository.findByProjectId(projectId);
    }

    public List<Bug> getBugsByAssignee(Long developerId) {
        return bugRepository.findByAssignedToId(developerId);
    }

    public Bug assignBugToDeveloper(Long bugId, Developer developer) {
        Bug bug = bugRepository.findById(bugId).orElseThrow(() -> 
            new IllegalArgumentException("Bug not found with id: " + bugId));
        bug.setAssignedTo(developer);
        return bugRepository.save(bug);
    }

    public Bug updateResolution(Long bugId, String resolution, String status) {
        Bug bug = bugRepository.findById(bugId).orElseThrow(() -> 
            new IllegalArgumentException("Bug not found with id: " + bugId));
        bug.setResolution(resolution);
        bug.setStatus(status);
        return bugRepository.save(bug);
    }
}
