package com.example.demo.model;



import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    
    private String description;
    
    @ManyToOne
    @JoinColumn(name = "created_by")
    private User createdBy;

    @ManyToMany
    @JoinTable(
        name = "project_developers",
        joinColumns = @JoinColumn(name = "project_id"),
        inverseJoinColumns = @JoinColumn(name = "developer_id")
    )
    @JsonIgnoreProperties({"assignedAsDeveloper", "assignedAsTester", "password"}) // Prevent infinite loop
    private Set<User> developers = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "project_testers",
        joinColumns = @JoinColumn(name = "project_id"),
        inverseJoinColumns = @JoinColumn(name = "testers_id")
    )
    @JsonIgnoreProperties({"assignedAsDeveloper", "assignedAsTester", "password"}) // Prevent infinite loop
    private Set<User> testers = new HashSet<>();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public User getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(User createdBy) {
		this.createdBy = createdBy;
	}

	public Set<User> getDevelopers() {
		return developers;
	}

	public void setDevelopers(Set<User> developers) {
		this.developers = developers;
	}

	public Set<User> getTesters() {
		return testers;
	}

	public void setTesters(Set<User> testers) {
		this.testers = testers;
	}
    
    
}
