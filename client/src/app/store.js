import { configureStore } from '@reduxjs/toolkit'
import msgReducer from '../features/msgSlice'
import authReducer from '../features/authSlice'
import visReducer from '../features/visibleSlice'
export default configureStore({
    reducer: {
        msg: msgReducer,
        auth: authReducer,
        vis: visReducer
    }
})