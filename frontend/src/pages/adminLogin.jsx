import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../index.css';
import { adminLogin, reset } from '../features/admin/adminSlice';
import Spinner from '../components/Spinner/Spinner';

function AdminLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { admin, isLoading, isError, isSuccess, message } = useSelector((state) => state.admin);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess && admin) {
            // Redirect to admin dashboard upon successful login
            navigate('/admin/dashboard');
        }


       
    }, [admin, isError, isSuccess, message, navigate, dispatch]);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState('');
    const { email, password } = formData;

    const onChangeField = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = {};
        if (!email) {
            errors.email = 'Please enter email';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Please enter a valid email address';
        }
        if (!password) {
            errors.password = 'Please enter your password';
        }

        if (Object.keys(errors).length === 0) {
            setErrors({});
            const data = {
                email,
                password
            };
            dispatch(adminLogin(data));
            navigate('/admin')
        } else {
            setErrors(errors);
        }
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div>
            <div className='form-main-div'>
                <form className="form">
                    <p className="title">Admin Login</p>
                    <p className="message">Sign in to access admin dashboard</p>

                    <label>
                        <input required="" placeholder="" type="email" name='email' className="input" onChange={onChangeField} />
                        <span>Email</span>
                        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                    </label>
                    <label>
                        <input required="" placeholder="" type="password" name='password' className="input" onChange={onChangeField} />
                        <span>Password</span>
                        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                    </label>

                    <button type="submit" className="submit" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;
