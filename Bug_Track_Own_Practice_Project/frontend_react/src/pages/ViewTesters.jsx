import React, { useEffect, useState } from 'react';
import api from '../services/api'; // ✅ Use authenticated Axios instance
import './ViewUsers.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ViewTesters() {
  const [testers, setTesters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    api.get("/api/testers")
      .then((response) => {
        setTesters(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch testers:", error);
        toast.error("❌ Failed to fetch testers");
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEdit = (tester) => {
    setEditingId(tester.id);
    setEditForm({
      name: tester.name,
      email: tester.email,
      password: tester.password,
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = (id) => {
    api.put(`/api/testers/${id}`, editForm)
      .then(response => {
        const updated = testers.map(t => t.id === id ? response.data : t);
        setTesters(updated);
        setEditingId(null);
        toast.success("✅ Tester updated!");
      })
      .catch(error => {
        console.error("Update failed", error);
        toast.error("❌ Update failed!");
      });
  };

  const handleDelete = (id) => {
    api.delete(`/api/testers/${id}`)
      .then(() => {
        setTesters(testers.filter(t => t.id !== id));
        toast.success("🗑️ Tester deleted!");
      })
      .catch(error => {
        console.error("Delete failed", error);
        toast.error("❌ Delete failed!");
      });
  };

  const filteredTesters = testers.filter((tester) =>
    tester.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="view-users-page">
      <h2>🧪 Testers</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Password</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTesters.map(t => (
            <tr key={t.id}>
              <td>{t.id}</td>
              {editingId === t.id ? (
                <>
                  <td><input name="name" value={editForm.name} onChange={handleEditChange} /></td>
                  <td><input name="email" value={editForm.email} onChange={handleEditChange} /></td>
                  <td><input name="password" value={editForm.password} onChange={handleEditChange} /></td>
                  <td>
                    <div className="button-group">
                      <button className="action-btn edit-btn" onClick={() => handleUpdateSubmit(t.id)}>Save</button>
                      <button className="action-btn delete-btn" onClick={() => setEditingId(null)}>Cancel</button>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td>{t.name}</td>
                  <td>{t.email}</td>
                  <td>{t.password}</td>
                  <td>
                    <div className="button-group">
                      <button className="action-btn edit-btn" onClick={() => handleEdit(t)}>Edit</button>
                      <button className="action-btn delete-btn" onClick={() => handleDelete(t.id)}>Delete</button>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer position="bottom-center" autoClose={2000} />
    </div>
  );
}

export default ViewTesters;
