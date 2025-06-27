// src/pages/ownerDashboard.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function OwnerDashboard() {
  const [properties, setProperties] = useState([]);

  // Load from localStorage when component mounts
  useEffect(() => {
    const storedProperties = JSON.parse(localStorage.getItem('properties')) || [];
    setProperties(storedProperties);
  }, []);

  // Delete a property and update localStorage
  const deleteProperty = (id) => {
    const updated = properties.filter(p => p._id !== id);
    setProperties(updated);
    localStorage.setItem('properties', JSON.stringify(updated));
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#2c3e50' }}>Your Properties</h2>

        <div style={{ textAlign: 'right', marginBottom: '20px' }}>
          <Link to="/add-property">
            <button style={{
              padding: '10px 20px',
              backgroundColor: '#2980b9',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>
              + Add Property
            </button>
          </Link>
        </div>

        {properties.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#7f8c8d' }}>No properties listed yet.</p>
        ) : (
          properties.map((p) => (
            <div key={p._id} style={{
              backgroundColor: '#fff',
              borderRadius: '10px',
              padding: '20px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              marginBottom: '20px'
            }}>
              <h3 style={{ color: '#34495e' }}>{p.title}</h3>
              <p style={{ color: '#7f8c8d' }}>
                <strong>Location:</strong> {p.location}<br />
                <strong>Rent:</strong> {p.rent}
              </p>
              <button onClick={() => deleteProperty(p._id)} style={{
                backgroundColor: '#e74c3c',
                color: '#fff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default OwnerDashboard;
