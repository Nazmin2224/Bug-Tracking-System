package com.bugtracker.controller;

import com.bugtracker.model.Bug;
import com.bugtracker.service.BugService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api")
public class BugController {

    @Autowired
    private BugService bugService;

    @GetMapping("/bugs")
    public List<Bug> getAll() {
        return bugService.getAllBugs();
    }

    @PostMapping("/bugs")
    public Bug createBug(@RequestBody Bug bug) {
        return bugService.createBug(bug);
    }

    @DeleteMapping("/bugs/{id}")
    public void deleteBug(@PathVariable Long id) {
        bugService.deleteBug(id);
    }

    // 🔁 Added for frontend
    @GetMapping("/project/{projectId}")
    public List<Bug> getBugsByProject(@PathVariable Long projectId) {
        return bugService.getBugsByProject(projectId);
    }
}
