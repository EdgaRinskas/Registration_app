import React, { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import UserList from './components/UserList';
import AdminLogin from './components/AdminLogin';
import './App.css';

const App = () => {
  const [isAdminLoggedIn, setAdminLoggedIn] = useState(false);

  const handleAdminLogin = () => {
    setAdminLoggedIn(true);
  };

  return (
    <div className="app-container">
      {isAdminLoggedIn ? (
        <>
          <h1 className="app-title">Event Registration App</h1>
          <RegistrationForm />
          <UserList />
        </>
      ) : (
        <AdminLogin onLogin={handleAdminLogin} />
      )}
    </div>
  );
};

export default App;
