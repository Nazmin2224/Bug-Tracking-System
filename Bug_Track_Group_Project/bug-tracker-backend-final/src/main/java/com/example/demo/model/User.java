package com.example.demo.model;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    private String username;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    private String password;
    private String role;
    
    
    @ManyToMany(mappedBy = "developers")
    @JsonIgnoreProperties({"developers", "testers"})// Prevent infinite loop
    private Set<Project> assignedAsDeveloper = new HashSet<>();

    @ManyToMany(mappedBy = "testers")
    @JsonIgnoreProperties({"developers", "testers"})
    private Set<Project> assignedAsTester = new HashSet<>();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Set<Project> getAssignedAsDeveloper() {
		return assignedAsDeveloper;
	}

	public void setAssignedAsDeveloper(Set<Project> assignedAsDeveloper) {
		this.assignedAsDeveloper = assignedAsDeveloper;
	}

	public Set<Project> getAssignedAsTester() {
		return assignedAsTester;
	}

	public void setAssignedAsTester(Set<Project> assignedAsTester) {
		this.assignedAsTester = assignedAsTester;
	}
    
    

}