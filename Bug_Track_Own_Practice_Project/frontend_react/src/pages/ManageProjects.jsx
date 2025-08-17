import React, { useEffect, useState } from 'react';
import './ManageProjects.css';
import api from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', description: '', startDate: '', deadline: '' });
  const [newProject, setNewProject] = useState({ name: '', description: '', startDate: '', deadline: '' });

  const [selectedProjectId, setSelectedProjectId] = useState(null); // 🆕
  const [bugs, setBugs] = useState([]); // 🆕

  useEffect(() => {
    api.get('/api/project')
      .then(response => setProjects(response.data))
      .catch(err => {
        console.error("Failed to fetch projects", err);
        toast.error("❌ Failed to load projects");
      });
  }, []);

  const fetchBugs = (projectId) => { // 🆕
    setSelectedProjectId(projectId);
    api.get(`/api/project/${projectId}/bugs`)
      .then(response => {
        setBugs(response.data);
        toast.info("🐞 Bugs loaded");
      })
      .catch(err => {
        console.error("Failed to load bugs", err);
        toast.error("❌ Failed to load bugs");
      });
  };

  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    api.post('/api/project', newProject)
      .then(res => {
        setProjects([...projects, res.data]);
        setNewProject({ name: '', description: '', startDate: '', deadline: '' });
        toast.success("✅ Project added");
      })
      .catch(err => {
        console.error("Failed to add project", err);
        toast.error("❌ Could not add project");
      });
  };

  const handleDelete = (id) => {
    api.delete(`/api/project/${id}`)
      .then(() => {
        setProjects(projects.filter(p => p.id !== id));
        toast.success("🗑️ Project deleted");
      })
      .catch(err => {
        console.error("Failed to delete project", err);
        toast.error("❌ Could not delete project");
      });
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setEditForm({
      name: project.name,
      description: project.description,
      startDate: project.startDate,
      deadline: project.deadline
    });
  };

  const handleUpdateSubmit = (id) => {
    api.put(`/api/project/${id}`, editForm)
      .then(response => {
        const updated = projects.map(p => p.id === id ? response.data : p);
        setProjects(updated);
        setEditingId(null);
        toast.success("💾 Project updated");
      })
      .catch(err => {
        console.error("Update failed", err);
        toast.error("❌ Update failed");
      });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: '', description: '', startDate: '', deadline: '' });
  };

  return (
    <div className="manage-projects-page">
      <h2>📁 Manage Projects</h2>

      <form className="project-form" onSubmit={handleAdd}>
        <input type="text" name="name" placeholder="Project Name" value={newProject.name} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Project Description" value={newProject.description} onChange={handleChange} required />
        <input type="date" name="startDate" value={newProject.startDate} onChange={handleChange} required />
        <input type="date" name="deadline" value={newProject.deadline} onChange={handleChange} required />
        <button type="submit">➕ Add Project</button>
      </form>

      <table className="projects-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>Deadline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(proj => (
            <tr key={proj.id}>
              <td>{proj.id}</td>
              {editingId === proj.id ? (
                <>
                  <td><input name="name" value={editForm.name} onChange={handleEditChange} /></td>
                  <td><input name="description" value={editForm.description} onChange={handleEditChange} /></td>
                  <td><input type="date" name="startDate" value={editForm.startDate} onChange={handleEditChange} /></td>
                  <td><input type="date" name="deadline" value={editForm.deadline} onChange={handleEditChange} /></td>
                  <td>
                    <div className="button-group">
                      <button className="action-btn edit-btn" onClick={() => handleUpdateSubmit(proj.id)}>💾 Save</button>
                      <button className="action-btn delete-btn" onClick={handleCancelEdit}>❌ Cancel</button>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td>{proj.name}</td>
                  <td>{proj.description}</td>
                  <td>{proj.startDate}</td>
                  <td>{proj.deadline}</td>
                  <td>
                    <div className="button-group">
                      <button className="action-btn edit-btn" onClick={() => handleEdit(proj)}>✏️ Edit</button>
                      <button className="action-btn delete-btn" onClick={() => handleDelete(proj.id)}>🗑️ Delete</button>
                      <button className="action-btn view-btn" onClick={() => fetchBugs(proj.id)}>🐞 View Bugs</button>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {selectedProjectId && (
        <div className="bugs-section">
          <h3>🐞 Bugs for Project ID: {selectedProjectId}</h3>
          {bugs.length === 0 ? (
            <p>No bugs reported.</p>
          ) : (
            <ul>
              {bugs.map(bug => (
                <li key={bug.id}>
                  <strong>{bug.title}</strong> — {bug.description} | Status: {bug.status} | Severity: {bug.severity}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <ToastContainer position="bottom-center" autoClose={2000} />
    </div>
  );
}

export default ManageProjects;
