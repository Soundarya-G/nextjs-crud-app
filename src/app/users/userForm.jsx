"use client"
import React, { useState, useEffect } from "react";
import "./UserForm.css";

const UserForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "",
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // State for the user being edited

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (showLoading = true) => {
    if (showLoading) setLoading(true); // Show loading only if specified
    try {
      const response = await fetch("/api/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error("Failed to fetch users");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      if (showLoading) setLoading(false); // Hide loading only if it was shown
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
  
    try {
      const endpoint = editingUser ? `/api/users` : `/api/users`;
      const method = editingUser ? "PUT" : "POST";
  
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, id: editingUser?.id }),
      });
  
      if (response.ok) {
        setFormData({ username: "", email: "", role: "" });
        alert(editingUser ? "User updated successfully!" : "User added successfully!");
        setEditingUser(null);
        await fetchUsers(false); // Refetch user list without showing loading message
      } else {
        alert("Failed to save user.");
      }
    } catch (err) {
      console.error("Error saving user:", err);
    } finally {
      setLoading(false);
    }
  };
  

  const handleDelete = async (id) => {
    // setDeleteLoading(true);
    try {
      const response = await fetch(`/api/users?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchUsers();
        alert("User deleted successfully!");
      
      } else {
        alert("Failed to delete user.");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleEdit = (user) => {
    setFormData({ username: user.username, email: user.email, role: user.role });
    setEditingUser(user); // Store the user being edited
  };

  return (
    <div className="form-container">
      <h2>{editingUser ? "Edit User" : "Add User"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            required
          />
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {editingUser && loading ? "Saving..." : editingUser ? "Update" : "Submit"}
        </button>
      </form>

      <h3>User List</h3>
      <div className="user-list">
        {loading ? (
          <p>Loading users...</p>
        ) : users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="capitalize">{user.username}</td>
                  <td>{user.email}</td>
                  <td className="capitalize">{user.role}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(user)}
                    >
                      ✏️
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(user.id)}
                      disabled={deleteLoading}
                    >
                      {/* {deleteLoading ? "Deleting..." : "🗑️"} */}
                      {"🗑️"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserForm;
