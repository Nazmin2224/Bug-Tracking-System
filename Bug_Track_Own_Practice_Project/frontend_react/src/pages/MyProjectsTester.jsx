import React, { useEffect, useState } from 'react';
import './BugReports.css'; // Adjust path if needed
import api from '../services/api';
import { getCurrentUser } from '../services/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyProjectTester() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const user = getCurrentUser();
        if (!user) {
          toast.error("⚠️ Not logged in");
          return;
        }

        const res = await api.get(`/api/projects/tester/${user.id}`);
        setProjects(res.data);
      } catch (err) {
        console.error("Failed to fetch assigned projects", err);
        toast.error("❌ Failed to load projects");
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="bug-reports-page">
      <h2>🧪 My Assigned Projects</h2>

      <table className="bugs-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Project Name</th>
            <th>Description</th>
            <th>Created By</th>
            <th>Start Date</th>
          </tr>
        </thead>
        <tbody>
          {projects.length > 0 ? (
            projects.map(project => (
              <tr key={project.id}>
                <td>{project.id}</td>
                <td>{project.name}</td>
                <td>{project.description}</td>
                <td>{project.createdBy || 'N/A'}</td>
                <td>{project.startDate ? new Date(project.startDate).toLocaleDateString() : 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>No assigned projects found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <ToastContainer position="bottom-center" autoClose={2000} />
    </div>
  );
}

export default MyProjectTester;
