import { createSlice } from '@reduxjs/toolkit';
import { asyncAuthenticate } from './authSlice';


export const visibleSlice = createSlice({
    name:"visible",
    initialState: {
        signout: false
    },
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(asyncAuthenticate.pending, (state, action) =>{
            state.signout = false;
        })
        .addCase(asyncAuthenticate.fulfilled, (state, action) =>{
            if (action.payload.result==='success') {
                state.signout = true;
            } else {
                state.signout = false;
            }
        })
        .addCase(asyncAuthenticate.rejected, (state, action)=> {
            state.signout = false;
        })
    }
});

export default visibleSlice.reducer