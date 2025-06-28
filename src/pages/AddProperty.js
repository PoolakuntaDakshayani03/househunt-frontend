import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddProperty = () => {
  const [form, setForm] = useState({
    title: '',
    location: '',
    rent: '',
  });

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 👇 ACTUAL API CALL TO BACKEND
      const response = await axios.post(
        'https://househunt-backend.onrender.com/api/properties',
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('✅ Property added successfully!');
      navigate('/owner');
    } catch (err) {
      console.error('Add Property Error:', err);
      alert(err.response?.data?.error || '❌ Failed to add property');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Add New Property</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="title"
            placeholder="Property Title"
            value={form.title}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            name="rent"
            type="number"
            placeholder="Rent"
            value={form.rent}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Add Property</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    background: '#f5f6fa',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    background: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#2c3e50',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    background: '#2980b9',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default AddProperty;
