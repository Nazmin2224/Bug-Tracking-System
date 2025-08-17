// src/pages/DeveloperDashboard.jsx


import { Link } from 'react-router-dom';
import './DeveloperDashboard.css';

function DeveloperDashboard() {
  return (
    <div className="developer-dashboard">
      <h2>Welcome, Developer 👨‍💻</h2>
      <p className="subtitle">Fix assigned bugs and track your progress</p>

      <div className="developer-cards">
        <Link to="/assignedtasks" className="developer-card">
          <h3>📁 Assigned Bugs</h3>
          <p>View and work on bugs assigned to you</p>
        </Link>

        <Link to="/projectdetails" className="developer-card">
          <h3>📊 Project Info</h3>
          <p>Explore your project details</p>
        </Link>

        <Link to="/progress" className="developer-card">
          <h3>✅ My Progress</h3>
          <p>Track your bug fix status</p>
        </Link>
      </div>
    </div>
  );
}

export default DeveloperDashboard;
