import React, { useEffect, useState } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import '../index.css'
import { register,reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner/Spinner';
function RegistrationForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    const [errors, setErrors] = useState({});



    const { name, email, password, password2 } = formData;
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {user,isLoading,isError,isSuccess,message}=useSelector((state)=>state.auth)

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }

        if(isSuccess || user){
            navigate('/')
        }

        dispatch(reset())

    },[user,isError,isSuccess,message,navigate,dispatch])
    const onChangeField = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = {};
        if (!name) {
            errors.name = 'Name is required';
        }
        if (!email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid';
        }
        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 8) {
            errors.password = 'Password must be at least 8 characters long';
        }
        if (!password2) {
            errors.password2 = 'Confirm password is required';
        } else if (password !== password2) {
            errors.password2 = 'Passwords do not match';
        }

        if (Object.keys(errors).length === 0) {
            console.log('Form submitted:', formData);
            setErrors({});
            const userData={
                name,
                email,
                password
            }
            dispatch(register(userData))
            // setFormData({
            //     name: '',
            //     email: '',
            //     password: '',
            //     password2: ''
            // });
        } else {
            setErrors(errors);
        }
    };

    if(isLoading){
        return <Spinner/>
    }

    return (
        <div className='form-main-div'>
            <form className="form" onSubmit={handleSubmit}>
                <p className="title">Register </p>
                <p className="message">Signup now and get full access to our app. </p>

                <label>
                    <input required="" placeholder="" type="text" className="input" name='name' value={name} onChange={onChangeField} />
                    <span>Name</span>
                </label>
                {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}

                <label>
                    <input required="" placeholder="" type="email" name='email' className="input" value={email} onChange={onChangeField} />
                    <span>Email</span>
                </label>
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

                <label>
                    <input required="" placeholder="" name='password' type="password" className="input" value={password} onChange={onChangeField} />
                    <span>Password</span>
                </label>
                {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

                <label>
                    <input required="" placeholder="" name='password2' type="password" className="input" value={password2} onChange={onChangeField} />
                    <span>Confirm password</span>
                </label>
                {errors.password2 && <p style={{ color: 'red' }}>{errors.password2}</p>}

                <button type="submit" className="submit">Submit</button>
            </form>
        </div>
    );
}

export default RegistrationForm;
