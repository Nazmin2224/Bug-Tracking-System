import React, { useEffect, useState } from 'react';
import './BugReports.css';
import api from '../services/api'; // ✅ Use custom axios instance
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BugReports() {
  const [bugs, setBugs] = useState([]);
  const [newBug, setNewBug] = useState({
    title: '',
    severity: 'Low',
    status: 'Open'
  });

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const res = await api.get('/api/bugs'); // ✅ uses token now
        setBugs(res.data);
      } catch (err) {
        console.error("Failed to fetch bugs", err);
        toast.error("❌ Failed to load bugs");
      }
    };
    fetchBugs();
  }, []);

  const handleChange = (e) => {
    setNewBug({ ...newBug, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/bugs', newBug); // ✅ uses token now
      setBugs([...bugs, res.data]);
      setNewBug({ title: '', severity: 'Low', status: 'Open' });
      toast.success("✅ Bug reported");
    } catch (err) {
      console.error("Error creating bug", err);
      toast.error("❌ Could not create bug");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/bugs/${id}`); // ✅ uses token now
      setBugs(bugs.filter(b => b.id !== id));
      toast.success("🗑️ Bug deleted");
    } catch (err) {
      console.error("Error deleting bug", err);
      toast.error("❌ Could not delete bug");
    }
  };

  return (
    <div className="bug-reports-page">
      <h2>🐞 Bug Reports</h2>

      <form className="bug-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={newBug.title}
          onChange={handleChange}
          placeholder="Bug Title"
          required
        />
        <select name="severity" value={newBug.severity} onChange={handleChange}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>
        <select name="status" value={newBug.status} onChange={handleChange}>
          <option>Open</option>
          <option>In Progress</option>
          <option>Resolved</option>
          <option>Closed</option>
        </select>
        <button type="submit">➕ Add Bug</button>
      </form>

      <table className="bugs-table">
        <thead>
          <tr>
            <th>ID</th><th>Title</th><th>Severity</th><th>Status</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bugs.map(bug => (
            <tr key={bug.id}>
              <td>{bug.id}</td>
              <td>{bug.title}</td>
              <td>{bug.severity}</td>
              <td>{bug.status}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(bug.id)}>
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

export default BugReports;
