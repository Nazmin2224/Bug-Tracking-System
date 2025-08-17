import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './BugReports.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminBugDashboard() {
  const [bugs, setBugs] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bugsRes, devsRes] = await Promise.all([
          api.get('/api/bugs'),
          api.get('/api/developers')
        ]);
        setBugs(bugsRes.data);
        setDevelopers(devsRes.data);
      } catch (err) {
        console.error("Failed to fetch data", err);
        toast.error("❌ Failed to load bugs or developers");
      }
    };
    fetchData();
  }, []);

  const handleDelete = (id) => {
    api.delete(`/api/bugs/${id}`)
      .then(() => {
        setBugs(bugs.filter(b => b.id !== id));
        toast.success("🗑️ Bug deleted!");
      })
      .catch(err => {
        console.error("Error deleting bug", err);
        toast.error("❌ Failed to delete bug");
      });
  };

  const handleAssignmentChange = (bugId, developerId) => {
    api.put(`/api/bugs/${bugId}/assignment`, { developerId })
      .then(() => {
        setBugs(prev =>
          prev.map(bug =>
            bug.id === bugId ? { ...bug, assignedTo: { id: developerId } } : bug
          )
        );
        toast.success("✅ Developer assigned!");
      })
      .catch(err => {
        console.error("Assignment error", err);
        toast.error("❌ Failed to assign developer");
      });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredBugs = bugs.filter(b =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <th>Assigned To</th>
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
              <td>
                <select
                  value={bug.assignedTo?.id || ""}
                  onChange={(e) => handleAssignmentChange(bug.id, e.target.value)}
                >
                  <option value="">-- Select Developer --</option>
                  {developers.map(dev => (
                    <option key={dev.id} value={dev.id}>
                      {dev.name}
                    </option>
                  ))}
                </select>
              </td>
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
