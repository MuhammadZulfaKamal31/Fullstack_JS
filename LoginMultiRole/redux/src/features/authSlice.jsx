import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//variabelnya diambil dari sini toh
// tadi error dapetnya dari sini
const initialState = {
    user: null,
    isError: false,
    isSucces: false,
    isLoading: false,
    message: ""
}

export const LoginUser = createAsyncThunk("user/LoginUser", async (user, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:8080/login', {
            email: user.email,
            password: user.password
        });
        return response.data
    } catch (error) {
        if (error.response) {
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message)
        }
    }
});

export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
    try {
        //error di bagian method http pastika sesuai dengan request yang di pakai
        const response = await axios.get('http://localhost:8080/me');
        return response.data
    } catch (error) {
        if (error.response) {
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message)
        }
    }
})

//error bagian user/logout pastikan bagian ini berbeda dengan yang alain
export const logOut = createAsyncThunk("user/logOut", async (_, thunkAPI) => {
    await axios.delete('http://localhost:8080/logOut');
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(LoginUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSucces = true;
            state.user = action.payload;
        });
        builder.addCase(LoginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
        })
        // Get User Login
        builder.addCase(getMe.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSucces = true;
            state.user = action.payload;
        });
        builder.addCase(getMe.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
        })
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;