import { createSlice, createAsyncThunk, isAsyncThunkAction } from '@reduxjs/toolkit'

export const asyncAuthenticate = createAsyncThunk("auth/Authenticate", async () => {
    let data = await fetch("/authenticate")
    if (!data.ok) {
        return {
            result: false,
        }
    }
    return data.json()
})

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        waiting: true,
        verified: false,
        status: "pending"
    },
    reducers: {},
    extraReducers(builder) {
        builder.addCase(asyncAuthenticate.pending, (state, action)=> {
            state.waiting = true
            state.verified = false
            state.status = "pending"
        })
        .addCase(asyncAuthenticate.fulfilled, (state, action)=> {
            state.waiting = false
            if (action.payload.result==='success') {
                state.verified = true
            } else {
                state.verified = false
            }
            state.status = "fulfilled"
        })
        .addCase(asyncAuthenticate.rejected, (state, action)=> {
            state.waiting = false
            state.verified = false
            state.status = "rejected"
        })
    }
})

export default authSlice.reducer