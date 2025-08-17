// src/pages/TesterDashboard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './TesterDashboard.css';

function TesterDashboard() {
  return (
    <div className="tester-dashboard">
      <h2>Welcome, Tester 🧪</h2>
      <p className="subtitle">Log bugs, view assigned projects, and track fixes</p>

      <div className="tester-cards">
        <Link to="/myprojects" className="tester-card">
          <h3>📁 My Projects</h3>
          <p>View your assigned projects</p>
        </Link>

        <Link to="/reportbug" className="tester-card">
          <h3>🐞 Report Bug</h3>
          <p>Log a new bug with details and severity</p>
        </Link>

        <Link to="/mybugs" className="tester-card">
          <h3>📋 My Bug Reports</h3>
          <p>Track bugs you've reported</p>
        </Link>
      </div>
    </div>
  );
}

export default TesterDashboard;
