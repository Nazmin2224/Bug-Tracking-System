package com.bugtracker.service;

import com.bugtracker.model.*;
import com.bugtracker.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AssignmentService {

    @Autowired
    private ProjectRepository projectRepo;

    @Autowired
    private DeveloperRepository developerRepo;

    @Autowired
    private TesterRepository testerRepo;

    @Autowired
    private ProjectDeveloperAssignmentRepository devAssignRepo;

    @Autowired
    private ProjectTesterAssignmentRepository testerAssignRepo;

    public ProjectDeveloperAssignment assignDeveloper(Long projectId, Long developerId) {
        Project project = projectRepo.findById(projectId).orElseThrow();
        Developer developer = developerRepo.findById(developerId).orElseThrow();

        ProjectDeveloperAssignment assignment = new ProjectDeveloperAssignment();
        assignment.setProject(project);
        assignment.setDeveloper(developer);
        return devAssignRepo.save(assignment);
    }

    public ProjectTesterAssignment assignTester(Long projectId, Long testerId) {
        Project project = projectRepo.findById(projectId).orElseThrow();
        Tester tester = testerRepo.findById(testerId).orElseThrow();

        ProjectTesterAssignment assignment = new ProjectTesterAssignment();
        assignment.setProject(project);
        assignment.setTester(tester);
        return testerAssignRepo.save(assignment);
    }
}
