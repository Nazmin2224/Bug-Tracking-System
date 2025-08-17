import React, { useState } from 'react';
import api from '../services/api'; // ✅ Authenticated Axios instance
import './AddUser.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddUser() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'Tester' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, role } = form;
    const payload = { name, email, password };

    const endpoint =
      role === 'Tester' ? '/api/testers' : '/api/developers';

    try {
      await api.post(endpoint, payload);
      toast.success(`${role} created successfully!`);
      setForm({ name: '', email: '', password: '', role: 'Tester' });
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error(`❌ Failed to create ${role}`);
    }
  };

  return (
    <div className="add-user-page">
      <div className="glass-card">
        <h2>➕ Add User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
            <label>Name</label>
          </div>

          <div className="form-group">
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
            <label>Email</label>
          </div>

          <div className="form-group">
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
            <label>Password</label>
          </div>

          <div className="form-group">
            <select name="role" value={form.role} onChange={handleChange} required>
              <option value="Tester">Tester</option>
              <option value="Developer">Developer</option>
            </select>
            <label>Role</label>
          </div>

          <button type="submit">Create User</button>
        </form>
        <ToastContainer position="bottom-center" autoClose={2000} />
      </div>
    </div>
  );
}

export default AddUser;
