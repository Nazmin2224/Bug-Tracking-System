import React, { useEffect, useState } from 'react';
import api from '../services/api'; // ✅ using authenticated Axios instance
import './ViewUsers.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ViewDevelopers() {
  const [developers, setDevelopers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    api.get("/api/developers")
      .then((response) => {
        setDevelopers(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch developers:", error);
        toast.error("❌ Failed to fetch developers");
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEdit = (developer) => {
    setEditingId(developer.id);
    setEditForm({
      name: developer.name,
      email: developer.email,
      password: developer.password,
    });
  };

  const handleDelete = (id) => {
    api.delete(`/api/developers/${id}`)
      .then(() => {
        setDevelopers(developers.filter(dev => dev.id !== id));
        toast.success("🗑️ Developer deleted successfully!");
      })
      .catch((error) => {
        console.error("Failed to delete developer:", error);
        toast.error("❌ Failed to delete developer");
      });
  };

  const filteredDevelopers = developers.filter((developer) =>
    developer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = (id) => {
    api.put(`/api/developers/${id}`, editForm)
      .then(response => {
        const updated = developers.map(dev => dev.id === id ? response.data : dev);
        setDevelopers(updated);
        setEditingId(null);
        toast.success("✅ Developer updated!");
      })
      .catch(error => {
        console.error("Update failed", error);
        toast.error("❌ Update failed");
      });
  };

  return (
    <div className="view-users-page">
      <h2>👨‍💻 Developers</h2>

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
          {filteredDevelopers.map(dev => (
            <tr key={dev.id}>
              <td>{dev.id}</td>
              {editingId === dev.id ? (
                <>
                  <td><input name="name" value={editForm.name} onChange={handleEditChange} /></td>
                  <td><input name="email" value={editForm.email} onChange={handleEditChange} /></td>
                  <td><input name="password" value={editForm.password} onChange={handleEditChange} /></td>
                  <td>
                    <div className="button-group">
                      <button className="action-btn edit-btn" onClick={() => handleUpdateSubmit(dev.id)}>Save</button>
                      <button className="action-btn delete-btn" onClick={() => setEditingId(null)}>Cancel</button>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td>{dev.name}</td>
                  <td>{dev.email}</td>
                  <td>{dev.password}</td>
                  <td>
                    <div className="button-group">
                      <button className="action-btn edit-btn" onClick={() => handleEdit(dev)}>Edit</button>
                      <button className="action-btn delete-btn" onClick={() => handleDelete(dev.id)}>Delete</button>
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

export default ViewDevelopers;
