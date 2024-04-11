import { Routes, Route, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Header from './components/Header/Header';
import Profile from './pages/Profile';
import AdminLogin from './pages/adminLogin';
import './components/Toaster/Toaster.css'
import { useSelector } from 'react-redux'
import AdminHeader from './components/AdminHeader/AdminHeader'


function App() {
  
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <>

      {isAdminPath ? <AdminHeader /> : <Header />}
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Dashboard />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/admin' element={<AdminLogin />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
