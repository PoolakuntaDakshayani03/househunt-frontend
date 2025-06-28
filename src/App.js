import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import OwnerDashboard from './pages/ownerDashboard';
import AddProperty from './pages/AddProperty';
import AdminPanel from './pages/AdminPanel'; // Optional if you have admin logic

function App() {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    // This will run after login and set token/role properly
    const t = localStorage.getItem('token');
    const r = localStorage.getItem('role');
    setToken(t);
    setRole(r);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Redirect root based on role */}
        <Route path="/" element={
          token
            ? role === 'owner'
              ? <Navigate to="/owner" />
              : role === 'admin'
              ? <Navigate to="/admin" />
              : <Navigate to="/login" />
            : <Register />
        } />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route path="/owner" element={token && role === 'owner' ? <OwnerDashboard /> : <Navigate to="/login" />} />
        <Route path="/add-property" element={token && role === 'owner' ? <AddProperty /> : <Navigate to="/login" />} />
        <Route path="/admin" element={token && role === 'admin' ? <AdminPanel /> : <Navigate to="/login" />} />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
