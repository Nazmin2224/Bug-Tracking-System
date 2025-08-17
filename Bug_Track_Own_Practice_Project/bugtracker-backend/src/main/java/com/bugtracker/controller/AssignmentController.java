package com.bugtracker.controller;

//import com.bugtracker.model.ProjectDeveloperAssignment;

import com.bugtracker.model.Developer;
import com.bugtracker.model.Tester;
import com.bugtracker.repository.DeveloperRepository;
import com.bugtracker.repository.TesterRepository;
import com.bugtracker.service.AssignmentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/assignment")


@CrossOrigin(origins = "http://localhost:5173") 
public class AssignmentController {

    @Autowired
    private AssignmentService assignmentService;

    @Autowired
    private DeveloperRepository developerRepository;

    @Autowired
    private TesterRepository testerRepository;

    @PostMapping
    public Object assignUserToProject(@RequestBody Map<String, Long> payload) {
        Long userId = payload.get("userId");
        Long projectId = payload.get("projectId");

        if (userId == null || projectId == null) {
            throw new IllegalArgumentException("userId and projectId are required.");
        }

        
        Optional<Developer> developerOpt = developerRepository.findById(userId);
        if (developerOpt.isPresent()) {
            return assignmentService.assignDeveloper(projectId, userId);
        }

        
        Optional<Tester> testerOpt = testerRepository.findById(userId);
        if (testerOpt.isPresent()) {
            return assignmentService.assignTester(projectId, userId);
        }

        throw new RuntimeException("User not found in developers or testers.");
    }
}
