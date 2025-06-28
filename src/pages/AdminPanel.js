// src/pages/AdminPanel.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingOwners = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/admin/pending-owners`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setOwners(res.data);
    } catch (err) {
      console.error('Error fetching owners:', err);
    } finally {
      setLoading(false);
    }
  };

  const approveOwner = async (ownerId) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/admin/approve-owner/${ownerId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setOwners((prev) => prev.filter((o) => o._id !== ownerId));
    } catch (err) {
      console.error('Approval failed:', err);
    }
  };

  useEffect(() => {
    fetchPendingOwners();
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h2 style={{ marginBottom: '20px' }}>Pending Owner Approvals</h2>
      {loading ? (
        <p>Loading...</p>
      ) : owners.length === 0 ? (
        <p>No pending owners to approve.</p>
      ) : (
        owners.map((owner) => (
          <div
            key={owner._id}
            style={{
              border: '1px solid #ccc',
              padding: '15px',
              marginBottom: '15px',
              borderRadius: '8px',
            }}
          >
            <p>
              <strong>{owner.name}</strong> - {owner.email}
            </p>
            <button
              onClick={() => approveOwner(owner._id)}
              style={{
                backgroundColor: '#27ae60',
                color: 'white',
                padding: '8px 12px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Approve
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminPanel;
