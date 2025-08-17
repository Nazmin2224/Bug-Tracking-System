package com.bugtracker.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "testers")
public class Tester {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;

    // ✅ Link to join table
    @OneToMany(mappedBy = "tester", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore // ✅ Prevent infinite recursion when serializing for login response
    private List<ProjectTesterAssignment> assignedProjects;

    // ✅ Constructors
    public Tester() {}

    public Tester(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    // ✅ Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public List<ProjectTesterAssignment> getAssignedProjects() {
        return assignedProjects;
    }

    public void setAssignedProjects(List<ProjectTesterAssignment> assignedProjects) {
        this.assignedProjects = assignedProjects;
    }
}
