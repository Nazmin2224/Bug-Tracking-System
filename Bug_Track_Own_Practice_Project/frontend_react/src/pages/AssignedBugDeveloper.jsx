import React, { useEffect, useState } from 'react';
import api from '../services/api'; // ✅ Custom axios instance
import './BugReports.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminBugDashboard() {
  const [bugs, setBugs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBugsAndProjects = async () => {
      try {
        const [bugsRes, projectsRes] = await Promise.all([
          api.get('/api/bugs'),
          api.get('/api/projects'),
        ]);
        setBugs(bugsRes.data);
        setProjects(projectsRes.data);
      } catch (err) {
        console.error("Failed to fetch data", err);
        toast.error("❌ Failed to load bugs or projects");
      }
    };
    fetchBugsAndProjects();
  }, []);

  const handleDelete = (id) => {
    api.delete(`/api/bugs/${id}`)
      .then(() => {
        setBugs(prev => prev.filter(b => b.id !== id));
        toast.success("🗑️ Bug deleted!");
      })
      .catch(err => {
        console.error("Error deleting bug", err);
        toast.error("❌ Failed to delete bug");
      });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredBugs = bugs.filter(b =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getProjectName = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : "N/A";
  };

  return (
    <div className="bug-reports-page">
      <h2>🛠️ Admin Bug Dashboard</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search bugs by title..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <table className="bugs-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Severity</th>
            <th>Status</th>
            <th>Project</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredBugs.map(bug => (
            <tr key={bug.id}>
              <td>{bug.id}</td>
              <td>{bug.title}</td>
              <td>{bug.severity}</td>
              <td>{bug.status}</td>
              <td>{getProjectName(bug.projectId)}</td>
              <td>
                <button className="action-btn delete-btn" onClick={() => handleDelete(bug.id)}>
                  ❌ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer position="bottom-center" autoClose={2000} />
    </div>
  );
}

export default AdminBugDashboard;
