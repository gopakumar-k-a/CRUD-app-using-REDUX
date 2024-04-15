import React, { useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function EditUserModal({ user, onSubmit, onClose }) {
  const defaultImageUrl =
    'https://cdn.iconscout.com/icon/free/png-512/free-user-1912185-1617654.png?f=webp&w=256';
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    id: user._id,
    name: user.name, // Pre-populate with existing user data
    email: user.email,
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 999,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
            borderRadius: 2,
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <Typography variant="h5" component="h2">
            Edit User
          </Typography>
          <button
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#ccc',
              fontSize: '1.5rem',
            }}
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <form onSubmit={handleSubmit}>
            <img
              src={user.imgUrl ? user.imgUrl : defaultImageUrl}
              alt={user.name}
              style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              value={formData.name} // Controlled component using formData
              onChange={handleChange}
            />
            {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              value={formData.email} // Controlled component using formData
              onChange={handleChange}
              type="email"
            />
            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>

        </Box>
      </div>
    </div>
  );
}

export default EditUserModal;
