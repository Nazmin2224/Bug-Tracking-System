import React, { useState, useEffect } from 'react';
import './AssignProject.css';
import api from '../services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AssignProject() {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ userId: '', projectId: '' });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [devRes, testerRes, projectsRes] = await Promise.all([
          api.get('/api/developers'),
          api.get('/api/testers'),
          api.get('/api/project'),
        ]);

        const developers = devRes.data.map(dev => ({
          id: dev.id,
          name: `${dev.name} (Developer)`,
        }));

        const testers = testerRes.data.map(tester => ({
          id: tester.id,
          name: `${tester.name} (Tester)`,
        }));

        setUsers([...developers, ...testers]);
        setProjects(projectsRes.data);
      } catch (error) {
        console.error('Error fetching users/projects:', error);
        toast.error('❌ Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.userId || !form.projectId) {
      toast.warning("⚠️ Please select both user and project");
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/api/assign', form);
      toast.success('✅ Project assigned!');
      setForm({ userId: '', projectId: '' });
    } catch (error) {
      console.error('Assignment error:', error);
      toast.error('❌ Assignment failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading">⏳ Loading...</div>;
  }

  return (
    <div className="assign-project-page">
      <div className="glass-card">
        <h2>📌 Assign Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <select
              name="userId"
              value={form.userId}
              onChange={handleChange}
              required
            >
              <option value="">Select User</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <label>User</label>
          </div>

          <div className="form-group">
            <select
              name="projectId"
              value={form.projectId}
              onChange={handleChange}
              required
            >
              <option value="">Select Project</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
            <label>Project</label>
          </div>

          <button type="submit" disabled={submitting}>
            {submitting ? 'Assigning...' : 'Assign'}
          </button>
        </form>
      </div>
      <ToastContainer position="bottom-center" autoClose={2000} />
    </div>
  );
}

export default AssignProject;
