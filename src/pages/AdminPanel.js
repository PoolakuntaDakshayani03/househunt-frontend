import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/admin/pending-owners`).then(res => setOwners(res.data));
  }, []);

  const approveOwner = async (ownerId) => {
    await axios.post(`${process.env.REACT_APP_API_BASE_URL}/admin/approve-owner/${ownerId}`);
    setOwners(prev => prev.filter(o => o._id !== ownerId));
  };

  return (
    <div>
      <h2>Pending Owner Approvals</h2>
      {owners.map(owner => (
        <div key={owner._id}>
          <p>{owner.name} - {owner.email}</p>
          <button onClick={() => approveOwner(owner._id)}>Approve</button>
        </div>
      ))}
    </div>
  );
}
export default AdminPanel;
