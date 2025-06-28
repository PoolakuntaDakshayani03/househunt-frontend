import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import OwnerDashboard from './pages/ownerDashboard'; // This is fine if the file is named ownerDashboard.js
import AddProperty from './pages/AddProperty';
function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        {/* Show Register first */}
        <Route path="/" element={<Register />} />

        {/* Login route */}
        <Route path="/login" element={<Login />} /> 

        {/* Owner dashboard (protected route) */}
        <Route
          path="/owner"
          element={token ? <OwnerDashboard /> : <Navigate to="/login" />}
        />
        <Route
           path="/add-property"
           element={token ? <AddProperty /> : <Navigate to="/login" />}
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
