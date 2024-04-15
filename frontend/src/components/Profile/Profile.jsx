import React from 'react'
import './Profile.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import EditProfileModal from '../EditProfileModal/EditProfileModal'
import { updateUser, reset } from '../../features/auth/authSlice'
import { toast } from 'react-toastify'
import Spinner from '../Spinner/Spinner'

function Profile() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, isError, isSuccess, message, isLoading } = useSelector((state) => state.auth)
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const [openModal, setOpenModal] = useState(false);


    const handleCloseModal = () => setOpenModal(false);



    const handleSubmit = (formData) => {

        console.log('frofdsfdlskfj',formData.imgUrl);

        dispatch(updateUser({
            name: formData.name,
            email: formData.email,
            imgUrl: formData.imageUrl ? formData.imageUrl : null
        }));

        handleCloseModal();
    };


    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [navigate, user])

    if (isLoading) {
        return (
            <Spinner />
        )
    }
    return (
        <div className='card'>
            <div className='profile-card'>
                <div className="card-client">
                    {user && user.imgUrl ? (<>
                        <div className='image-parent'>
                            <div className='image-div'>
                                <img src={user.imgUrl} alt="" />
                            </div>
                        </div>
                    </>) : (<>
                        <div className="user-picture">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path>
                            </svg>
                        </div></>)
                    }
                    <p className="name-client"> {user && user.name}
                        <span>{user && user.email}
                        </span>
                    </p>
                    <button onClick={() => setOpenModal(true)}>
                        <span className="transition"></span>
                        <span className="gradient"></span>
                        <span className="label">Edit Profile</span>
                    </button>
                </div>
            </div>
            {openModal && <EditProfileModal user={user} onSubmit={handleSubmit} onClose={handleCloseModal} />}
        </div>
    )
}

export default Profile
