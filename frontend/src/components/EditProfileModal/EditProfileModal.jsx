import React, { useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCamera, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'

function EditProfileModal({ user, onSubmit, onClose }) {

    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        id: user._id,
        name: user.name,
        email: user.email,
        imageFile: null, // Add imageFile state to store selected image file
        imageUrl: user.imgUrl, // Add imageUrl state to store the image URL
    });

    const handleImageChange = (event) => {
        setFormData({
            ...formData,
            imageFile: event.target.files[0], // Store the selected image file
            imageUrl: URL.createObjectURL(event.target.files[0]), // Create a local URL for the selected image
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // onSubmit(formData);
        // onClose();

        try {
            let imageUrl = formData.imageUrl;
console.log('form data . iimage file ',formData.imageFile);
            if (formData.imageFile) {
                const formDataWithImage = new FormData();
                formDataWithImage.append('file', formData.imageFile);
                formDataWithImage.append('upload_preset', 'u9g90r4d');

                const response = await axios.post(`https://api.cloudinary.com/v1_1/dwjw8biat/image/upload`, formDataWithImage);
                console.log('reddddddddd', response.data);
                imageUrl = response.data.secure_url;
            }
            console.log('onSubmit ', {
                ...formData,
                imageUrl: imageUrl
            });
            await onSubmit({
                ...formData,
                imageUrl: imageUrl,
            });
            onClose();
        } catch (error) {
            console.error('Error:', error);
            setErrors({ submit: 'Failed to submit form. Please try again.' });
        }
    };

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleRemoveImage = () => {
        setFormData({
            ...formData,
            imageFile: null,
            imageUrl: user.imgUrl ? user.imgUrl : ''
        });
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
                        {formData.imageUrl ? (
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                <img
                                    src={formData.imageUrl}
                                    alt="Selected"
                                    style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                                />
                                {formData.imageFile && (
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        style={{
                                            position: 'absolute',
                                            top: '5px',
                                            right: '5px',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            color: '#ccc',
                                            fontSize: '1.5rem',
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faTimesCircle} />
                                    </button>
                                )}
                            </div>
                        ) : (
                            <label htmlFor="image" style={{ cursor: 'pointer' }}>
                                <FontAwesomeIcon icon={faCamera} />
                                <input type="file" id="image" name="image" onChange={handleImageChange} accept="image/*" style={{ display: 'none' }} />
                            </label>
                        )}

                        <input type="file" id="image" name="image" onChange={handleImageChange} accept="image/*" style={{ display: 'none' }} />
                        <label htmlFor="image">
                            <FontAwesomeIcon icon={faCamera} />
                        </label>
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

export default EditProfileModal;
