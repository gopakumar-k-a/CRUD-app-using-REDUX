import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import adminService from './adminService'
const admin = JSON.parse(localStorage.getItem('admin'))

const initialState = {
    admin: admin ? admin : null,
    users: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//login  admin
export const adminLogin = createAsyncThunk('admin/login', async (user, thunkAPI) => {
    try {
        return await adminService.login(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
//logout admin
export const adminLogout = createAsyncThunk('admin/logout', async () => {

    await adminService.logout()
})

//get user data

export const fethUserData = createAsyncThunk('/admin/getusers', async (_,thunkAPI) => {
    const token = thunkAPI.getState().admin.admin.token;
    return await adminService.fetchUsers(token)
})

//update user data

export const updateUserData=createAsyncThunk('/admin/updateuser',async(newUserData,thunkAPI)=>{
    const token = thunkAPI.getState().admin.admin.token;

    return await adminService.updateUser(newUserData,token)
})

export const deleteUserData=createAsyncThunk('/admin/deleteuser',async(id,thunkAPI)=>{
    const token = thunkAPI.getState().admin.admin.token;
   
    return await adminService.deleteUser(id,token)
})

export const createNewUser=createAsyncThunk('/admin/createuser',async(newUserData,thunkAPI)=>{
    console.log('new user data ',newUserData);
    const token = thunkAPI.getState().admin.admin.token;
    return await adminService.createUser(newUserData,token)
})

export const adminSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
            
        }
    },
    extraReducers: (builder) => {
        builder.addCase(adminLogin.pending, (state) => {
            state.isLoading = true
        })
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.admin = action.payload
            })
            .addCase(adminLogin.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.admin = null
            })

            .addCase(adminLogout.fulfilled, (state) => {
                state.admin = null
            })
            .addCase(fethUserData.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fethUserData.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.users = action.payload.users
            })
            .addCase(fethUserData.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(updateUserData.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateUserData.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
              
            })
            .addCase(updateUserData.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteUserData.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteUserData.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
              
            })
            .addCase(deleteUserData.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(createNewUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createNewUser.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
              
            })
            .addCase(createNewUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export default adminSlice.reducer
export const { reset } = adminSlice.actions