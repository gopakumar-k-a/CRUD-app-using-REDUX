import axios from 'axios'

const API_URL = '/api/'


//register user
const register = async (userData) => {
    const response = await axios.post(API_URL + 'register', userData)

    if (response.data) {

        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}
//login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if (response.data) {


        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//logout user
const logout = async () => {
    localStorage.removeItem('user')
}

const updateUser = async (newUser, token) => {
    console.log('new user in update user ',newUser);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    console.log('new user is ',newUser);
    const response = await axios.post(API_URL + 'updateprofile', newUser, config)
    if (response.data) {


        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const authService = {
    register,
    logout,
    login,
    updateUser
}

export default authService