import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fethUserData, reset, updateUserData, deleteUserData, createNewUser } from '../features/admin/adminSlice'
import UsersCard from '../components/UsersCard/UsersCard'
import Spinner from '../components/Spinner/Spinner'
import EditUserModal from '../components/EditUserModal/EditUserModal'
import CreateUserModal from '../components/CreateUserModal/CreateUserModal'
import { toast } from 'react-toastify'

function AdminDashboard() {
    const { admin, users, isLoading, message, isError, isSuccess } = useSelector((state) => state.admin)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUserCreateModalOpen, setUserCreateModalOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        dispatch(reset())

    }, [admin, isError, isSuccess, message, navigate, dispatch])
    const handleEditClick = (user) => {
        setIsModalOpen(true);
        setSelectedUser(user)
    };



    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleEditSubmit = (newUserData) => {
        dispatch(updateUserData(newUserData))
    }
    const handleDeleteUser = (id) => {
        console.log('delete id ', id);
        dispatch(deleteUserData(id))
    }

    const handleCreateUserModalClose = () => {
        setUserCreateModalOpen(false)
    }

    const handleCreateNewUser = (newUserData) => {
        console.log('new user dataa ', newUserData);
        dispatch(createNewUser(newUserData))
    }

    useEffect(() => {
        if (!admin) {
            navigate('/admin')
        }

    }, [admin])

    useEffect(() => {
        console.log('fetching data');
        dispatch(fethUserData())
        dispatch(reset())
    }, [admin, isLoading])


    const filteredUsers = users.filter((user) => {
        return (
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
        <div>

            <h1>Admin Dashboard</h1>
            <div className='createButtonParent'>
                <button className='custom-button' onClick={() => setUserCreateModalOpen(true)}>
                    <span>create new user</span>
                </button>
            </div>

            <div className='textInputParent'>
                <div className="textInputWrapper">
                    <input placeholder="Search users..." value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} type="text" className="textInput" />
                </div>
            </div>
            {isLoading ? (
                <>
                    <Spinner />
                </>
            ) : (
                <>
                    {filteredUsers.length > 0 ? (
                        <ul>
                            {filteredUsers.map((data) => (
                                <UsersCard
                                    key={data.id}
                                    user={data}
                                    deleteUser={handleDeleteUser}
                                    handleEditClick={handleEditClick}
                                />
                            ))}
                        </ul>
                    ) : (
                        <div className='textInputParent'>
                            <p>No users found !</p>
                        </div>
                    )}
                </>
            )}
            {isModalOpen && <EditUserModal onSubmit={handleEditSubmit} user={selectedUser} onClose={handleCloseModal} />}
            {isUserCreateModalOpen && <CreateUserModal onClose={handleCreateUserModalClose} onSubmit={handleCreateNewUser} />}
        </div>
    )
}

export default AdminDashboard
