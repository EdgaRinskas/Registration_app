import React, { useState } from 'react';
import './AdminLogin.css';

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'admin') {
      onLogin();
    } else {
      alert('Invalid password. Please try again.');
    }
  };

  return (
    <form className="admin-login-form" onSubmit={handleSubmit}>
      <h2 className="app-title">Eventera Admin Login</h2>
      <p className="form-description">
        Please log in to access the Registration Form and User List.
      </p>
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter admin password"
      />
      <p className="hint">Hint: The secret password is "<strong>admin</strong>".</p>
      <button type="submit">Login</button>
    </form>
  );
};

export default AdminLogin;
