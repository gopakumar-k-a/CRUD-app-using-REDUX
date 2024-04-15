import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import '../index.css'
import { login,reset,increment,decrement } from '../features/auth/authSlice';
import Spinner from '../components/Spinner/Spinner';

function Login() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {user,isLoading,isError,isSuccess,message,count}=useSelector((state)=>state.auth)
    

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }

        if(isSuccess || user){
            navigate('/dashboard')
        }

        dispatch(reset())

    },[user,isError,isSuccess,message,navigate,dispatch])




    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState('')
    const { email, password } = formData
    const onChangeField = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const errors = {}
        if (!email) {
            errors.email = 'please enter email'
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Please enter a valid email address';
        }
        if (!password) {
            errors.password = 'please enter your password'
        }

        if (Object.keys(errors).length == 0) {
            setErrors({})
            const data={
                email,
                password
            }
            dispatch(login(data))
            
        } else {
            setErrors(errors)
        }

    }
    if (isLoading) {
        return <Spinner />;
    }
    return (
        <div>
            <div className='form-main-div'>
                <form className="form">
           
                    <p className="title">Login </p>
                    <p className="message">SigIn now and Enter to app. </p>

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
                    <p style={{ color: 'red' }}></p>

                    <button type="submit" className="submit" onClick={handleSubmit}>Submit</button>
                    {/* <p className="signin">Don't have an account? <a href="#">Register</a> </p> */}
                </form>
            </div>
        </div>
    )
}

export default Login
