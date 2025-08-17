// src/pages/AdminDashboard.jsx
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h2>Welcome, Admin 👨‍💼</h2>
      <p className="subtitle">Manage all users, projects, and bug reports</p>

      <div className="admin-cards">
        <Link to="/viewdeveloper" className="admin-card">
          <h3>👨‍💻 Developers</h3>
          <p>View and manage developer accounts</p>
        </Link>

        <Link to="/viewtester" className="admin-card">
          <h3>🧪 Testers</h3>
          <p>View and manage tester accounts</p>
        </Link>

        <Link to="/manageprojects" className="admin-card">
          <h3>📁 Projects</h3>
          <p>View, add and manage projects</p>
        </Link>

        <Link to="/bugreport" className="admin-card">
          <h3>🐞 Bug Reports</h3>
          <p>Review reported bugs and their status</p>
        </Link>

        <Link to="/adduser" className="admin-card">
          <h3>➕ Add User</h3>
          <p>Create tester or developer accounts</p>
        </Link>

        <Link to="/assignproject" className="admin-card">
          <h3>📌 Assign Projects</h3>
          <p>Assign projects to developers/testers</p>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
