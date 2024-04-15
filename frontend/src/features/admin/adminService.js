import axios from 'axios'

const API_URL = '/api/admin/'


const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if (response.data) {

        localStorage.setItem('admin', JSON.stringify(response.data))
    }

    return response.data
}

const logout = async () => {
    localStorage.removeItem('admin')
}

const fetchUsers = async (token) => {
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + 'getusers',config)
    return response.data
}

const updateUser = async (newUserData,token) => {
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + 'updateuser',newUserData,config)
    return response.data
}

const deleteUser=async(id,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    console.log('config ',config);
  
    const response=await axios.delete(API_URL+`deleteuser?id=${id}`,config)
    return response
}

const createUser=async(newUserData,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response=await axios.post(API_URL+'createuser',newUserData,config)
    return response
}
const adminService = {
    login,
    logout,
    fetchUsers,
    updateUser,
    deleteUser,
    createUser
}

export default adminService