import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProperty = () => {
  const [form, setForm] = useState({
    title: '',
    location: '',
    rent: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existing = JSON.parse(localStorage.getItem('properties')) || [];
    const newProperty = {
      _id: Date.now().toString(),
      ...form,
    };

    const updatedList = [...existing, newProperty];
    localStorage.setItem('properties', JSON.stringify(updatedList));

    alert('Property added!');
    navigate('/owner');
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
