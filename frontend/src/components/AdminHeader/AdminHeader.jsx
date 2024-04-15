import React from 'react';
import './AdminHeader.css';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { adminLogout, reset } from '../../features/admin/adminSlice';

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { admin } = useSelector((state) => state.admin)
  const handleLogout = () => {
    dispatch(adminLogout())
    dispatch(reset())
    navigate('/admin')
  }
  return (
    <header>
      <Link to='/admin/dashboard'><div className="logo">User Management admin side</div></Link>

      <div className="auth-links">
        
        {admin ? (<>

          <a href="#" onClick={handleLogout}>Logout</a></>) : (
          <>
            <Link to='/admin'><a href="#">Login</a></Link>
          </>)}


      </div>
    </header>
  );
}

export default Header;
