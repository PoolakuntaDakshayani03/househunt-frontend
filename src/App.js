import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import OwnerDashboard from './pages/ownerDashboard';
import AddProperty from './pages/AddProperty';
import AdminPanel from './pages/AdminPanel';

function App() {
  // ✅ Read directly from localStorage
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <Router>
      <Routes>
        {/* ✅ Root path — redirect based on role */}
        <Route path="/" element={
          token
            ? role === 'owner'
              ? <Navigate to="/owner" />
              : role === 'admin'
              ? <Navigate to="/admin" />
              : <Navigate to="/login" />
            : <Register />
        } />

        {/* ✅ Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ Protected owner routes */}
        <Route
          path="/owner"
          element={token && role === 'owner' ? <OwnerDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/add-property"
          element={token && role === 'owner' ? <AddProperty /> : <Navigate to="/login" />}
        />

        {/* ✅ Admin panel route */}
        <Route
          path="/admin"
          element={token && role === 'admin' ? <AdminPanel /> : <Navigate to="/login" />}
        />

        {/* ✅ Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
