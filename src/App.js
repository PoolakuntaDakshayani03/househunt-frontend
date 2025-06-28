// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import OwnerDashboard from './pages/ownerDashboard';
import AdminPanel from './pages/AdminPanel';

function App() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); // stored after login

  return (
    <Router>
      <Routes>
        {/* Default: Show register */}
        <Route path="/" element={<Register />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Owner Dashboard (Protected) */}
        <Route
          path="/owner"
          element={token && role === 'owner' ? <OwnerDashboard /> : <Navigate to="/login" />}
        />

        {/* Admin Panel (Protected) */}
        <Route
          path="/admin"
          element={token && role === 'admin' ? <AdminPanel /> : <Navigate to="/login" />}
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
