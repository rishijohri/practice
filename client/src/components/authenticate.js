import React from 'react';
import { Navigate} from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { asyncAuthenticate } from '../features/authSlice';

export function Authenticate(props) {
    const dispatch = useDispatch()
    const auth = useSelector((state)=> state.auth) 
    React.useEffect(() =>{
        dispatch(asyncAuthenticate())
    }, []);
    console.log(auth.status)
    if (auth.waiting) {
        return <h1>Loading....</h1>
    } else {
    if (auth.verified) {
        return props.children;
    } else {
        return <Navigate to="/sign-up" replace />
    }
}
}