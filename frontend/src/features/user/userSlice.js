
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const updateUserData=createAsyncThunk((userData,thunkAPI)=>{
    try {
        
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const userSlice=createSlice({
    name:'userCredentials',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(updateUserData.pending, (state) => {
            state.isLoading = true
        })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
    }
})

export default userSlice