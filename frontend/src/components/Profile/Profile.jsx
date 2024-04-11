import React from 'react'
import './Profile.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Modal, Box, Button, Typography, TextField, IconButton, InputAdornment } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';


function Profile() {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        imageFile: null,
    });

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleImageChange = (event) => {
        setFormData((prevData) => ({ ...prevData, imageFile: event.target.files[0] }));
    };

    // Handle form submission logic here (e.g., send data to server)
    const handleSubmit = (event) => {
        event.preventDefault();
        // Process the form data (name, email, and image) here
        console.log('Form data:', formData);
        setFormData({ name: '', email: '', imageFile: null }); // Clear form after submission
        handleCloseModal(); // Close the modal after successful submission
    };

    useEffect(() => {
        if (user) {
            console.log('user is ', user);
        }
    }, [])
    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [navigate, user])
    return (
        <div className='card'>
            <div className='profile-card'>
                <div className="card-client">
                    <div className="user-picture">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path>
                        </svg>
                    </div>
                    <p className="name-client"> {user && user.name}
                        <span>{user && user.email}
                        </span>
                    </p>
                    <div className="social-media">
                        <a href="#" className="edit-icon">  {/* Added class name */}
                            <FontAwesomeIcon icon={faEdit} size="lg" />
                        </a>
                        {/* <Button variant="contained" onClick={handleOpenModal}>
                            Open Modal
                        </Button> */}


                        <Button variant="contained" onClick={handleOpenModal}>
                            Open Modal
                        </Button>
                        <Modal
                            open={openModal}
                            onClose={handleCloseModal}
                            aria-labelledby="modal-title"
                            aria-describedby="modal-description"
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 1, m: 1, bgcolor: 'background.paper', borderRadius: 2 }}>
                            <Typography variant="h5" component="h2" id="modal-title">
                                    Edit User Credentials
                                </Typography>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                                    <Box
                                        sx={{
                                            display: 'inline-block',
                                            width: 80,
                                            height: 80,
                                            borderRadius: '50%',
                                            overflow: 'hidden',
                                            marginRight: '1rem',
                                        }}
                                    >
                                        {user.imageUrl ? (
                                            <img src={user.imageUrl} alt="User Profile" style={{ width: '100%' }} />
                                        ) : (
                                            <img src="https://images.rawpixel.com/image_png_social_square/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png" alt="Default Profile" style={{ width: '100%' }} /> // Replace with your default image path
                                        )}
                                    </Box>
                                    
                                </div>
                            
                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        autoComplete="name"
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        autoComplete="email"
                                        type="email"
                                    />
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id="image"
                                        label="Image"
                                        name="imageFile"
                                        type="file"
                                        onChange={handleImageChange}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton>
                                                        <PhotoCamera />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                                        Submit
                                    </Button>
                                </form>
                            </Box>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
