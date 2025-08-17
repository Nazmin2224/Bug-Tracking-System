package com.bugtracker.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "developers")
public class Developer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;

    // ✅ Add this for the join table (optional lazy loading)
    @OneToMany(mappedBy = "developer", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore // ✅ Important to prevent infinite recursion during login JSON
    private List<ProjectDeveloperAssignment> assignedProjects;

    // ✅ Constructors
    public Developer() {}

    public Developer(String name, String email, String password) {
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

    public List<ProjectDeveloperAssignment> getAssignedProjects() {
        return assignedProjects;
    }

    public void setAssignedProjects(List<ProjectDeveloperAssignment> assignedProjects) {
        this.assignedProjects = assignedProjects;
    }
}
