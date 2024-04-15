import React from 'react'
import './UsersCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
function UsersCard({ user,handleEditClick,deleteUser }) {
    const defaultImageUrl = 'https://cdn.iconscout.com/icon/free/png-512/free-user-1912185-1617654.png?f=webp&w=256';
    return (
        <div className='card'>
            <div className="user-card">
                <img src={user.imgUrl?user.imgUrl:defaultImageUrl} alt={user.name} />
                <div>
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                    <div className="buttons">
                        <button className="icon-button" onClick={()=>handleEditClick(user)}><FontAwesomeIcon icon={faEdit} /></button>
                        <button className="icon-button" onClick={()=>deleteUser(user._id)}><FontAwesomeIcon icon={faTrash} /></button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UsersCard
