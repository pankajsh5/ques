import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { loginUserApi,autoLoginUserApi, refreshTokenApi, logoutUserApi } from '../api/User';

export const USER_STATUS = {
    loggedin : "loggedin",
    loggedout : "loggedout",
    waiting : "waiting"
}

const initialState = {
    username: '',
    email: "",
    accessToken: '',
    status : USER_STATUS.loggedout
};

export const loginUser = createAsyncThunk(
    'user/login',
    loginUserApi
);

export const autoLoginUser = createAsyncThunk(
    'user/autologin',
    autoLoginUserApi
)

export const refreshToken = createAsyncThunk(
    'user/refresh',
    refreshTokenApi
)

export const logoutUser = createAsyncThunk(
    'user/logout',
    logoutUserApi
)

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
    },
    extraReducers : (builder)=>{
        builder
        .addCase(loginUser.pending,(state)=>{
            state.status = USER_STATUS.waiting;
        })
        .addCase(loginUser.fulfilled, (state,{ payload })=>{
            // console.log('payload',payload);
            state.email = payload.email;
            state.username = payload.username;
            state.accessToken = payload.accessToken;
            state.status = USER_STATUS.loggedin;
        })
        .addCase(loginUser.rejected,(state)=>{
            // console.log('rejected');
            state.status = USER_STATUS.loggedout; 
        })
        .addCase(autoLoginUser.fulfilled, (state,{ payload })=>{
            // console.log('payload',payload);
            state.email = payload.email;
            state.username = payload.username;
            state.accessToken = payload.accessToken;
            state.status = USER_STATUS.loggedin;
        })
        .addCase(autoLoginUser.rejected,(state)=>{
            // console.log('rejected');
            state.status = USER_STATUS.loggedout; 
        })
        .addCase(autoLoginUser.pending,(state)=>{
            state.status = USER_STATUS.waiting;
        })
        .addCase(refreshToken.pending,(state)=>{
            state.status = USER_STATUS.waiting;
        })
        .addCase(refreshToken.fulfilled,(state,{ payload })=>{
            state.status = USER_STATUS.loggedin;
            state.accessToken = payload.accessToken;
        })
        .addCase(refreshToken.rejected,(state)=>{
            state.status = USER_STATUS.loggedout;
        })
        .addCase(logoutUser.pending,(state)=>{
            state.status = USER_STATUS.waiting
        })
        .addCase(logoutUser.fulfilled,(state)=>{
            state.status = USER_STATUS.loggedout;
            state = initialState;
        })
        .addCase(logoutUser.rejected,(state)=>{
            state.status = USER_STATUS.loggedout;
            state = initialState;
        })
        
        
    }
});

export default userSlice.reducer;
export const {
    updateToken
} = userSlice.actions;