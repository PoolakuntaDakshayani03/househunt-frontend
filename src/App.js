import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import OwnerDashboard from './pages/ownerDashboard';
import AddProperty from './pages/AddProperty';
import AdminPanel from './pages/AdminPanel';

function App() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token
          ? role === 'owner' ? <Navigate to="/owner" />
            : role === 'admin' ? <Navigate to="/admin" />
            : <Navigate to="/login" />
          : <Register />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/owner" element={token && role === 'owner'
          ? <ownerDashboard /> : <Navigate to="/login" />} />
        <Route path="/add-property" element={token && role === 'owner'
          ? <AddProperty /> : <Navigate to="/login" />} />
        <Route path="/admin" element={token && role === 'admin'
          ? <AdminPanel /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
