import React from 'react';
import RegistrationForm from './components/RegistrationForm';
import UserList from './components/UserList';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <h1 className="app-title">Event Registration App</h1>
      <RegistrationForm />
      <UserList />
    </div>
  );
}

export default App;
