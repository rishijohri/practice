import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const asyncConnectServer = createAsyncThunk('msg/connectServer', async ()=> {
    let data = await fetch("/home")
    if (!data.ok)
    {
        return {
            result: "unable to connect to server"
        };
    }
    return data.json();
})

export const msgSlice = createSlice({
    name: "msg",
    initialState: {
        value: "Connecting",
    },
    reducers: {},
    extraReducers(builder) {
        builder.addCase(asyncConnectServer.pending, (state, action)=> {
            state.value = "Pending"
        })
        .addCase(asyncConnectServer.fulfilled, (state, action)=> {
            state.value = action.payload.result
        })
        .addCase(asyncConnectServer.rejected, (state, action)=> {
            state.value = "Connection Rejected"
        })
    }
})
export const {connectServer} = msgSlice.actions

export default msgSlice.reducer