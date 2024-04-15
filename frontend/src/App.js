import { Routes, Route, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Header from './components/Header/Header';
import Profile from './pages/Profile';
import AdminLogin from './pages/AdminLogin';
import './components/Toaster/Toaster.css'
import AdminHeader from './components/AdminHeader/AdminHeader'
import AdminDashboard from './pages/AdminDashboard';

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
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='*' element={<div>not found</div>} />

      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
