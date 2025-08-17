// src/pages/TesterBugReport.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './BugReports.css';

function TesterBugReport() {
  const [newBug, setNewBug] = useState({
    title: '',
    severity: 'Low',
    description: ''
  });

  const handleChange = (e) => {
    setNewBug({ ...newBug, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/bugs', { ...newBug, status: 'Open' })
      .then(() => {
        alert("Bug submitted successfully");
        setNewBug({ title: '', severity: 'Low', description: '' });
      })
      .catch(err => console.error("Error submitting bug", err));
  };

  return (
    <div className="bug-reports-page">
      <h2>🐞 Report a Bug</h2>
      <form className="bug-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={newBug.title}
          onChange={handleChange}
          placeholder="Bug Title"
          required
        />
        <textarea
          name="description"
          value={newBug.description}
          onChange={handleChange}
          placeholder="Bug Description"
        />
        <select name="severity" value={newBug.severity} onChange={handleChange}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>
        <button type="submit">➕ Submit Bug</button>
      </form>
    </div>
  );
}

export default TesterBugReport;
