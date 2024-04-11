import React from 'react';
import './AdminHeader.css';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice';

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  return (
    <header>
      <Link to='/'><div className="logo">User Management</div></Link>
      {user && <nav>
        <ul>
          <div className="auth-links">
            <Link to='/'><a href="#">Dashboard</a></Link>
            <Link to='/profile'><a href="#">My Profile</a></Link>
          </div>
        </ul>
      </nav>}
      <div className="auth-links">
        {user ? (<>

          <a href="#" onClick={handleLogout}>Logout</a></>) : (
          <>
            <Link to='/login'><a href="#">Login</a></Link>
            <Link to='/register'><a href="#">Register</a></Link>
          </>)}


      </div>
    </header>
  );
}

export default Header;
