import React from 'react';
import ResponsiveAppBar from './AppBar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useNavigate , Navigate} from 'react-router';
import { asyncAuthenticate } from '../features/authSlice';
import {useSelector, useDispatch } from 'react-redux';


function sign_up(data, navigate, func) {
    let req = {
        method: "POST",
        body: JSON.stringify({
            username: data.username,
            password: data.password 
        }
        ),
        headers: { 'Content-Type': 'application/json' },
    }
    fetch("/sign-up", req).then((res) => {
        if (!res.ok)
        {
            console.log({
                src: "sign-up",
                code: res.ok
            })
            return {}
        }
        return res.json()
    }).then((res)=> {
        console.log(res)
        if (res.result=="success") {
            console.log("it works")
            navigate(res.nav, {replace: true});
        }
        
    })
}

function sign_in(data, navigate, func)  {
    let req = {
        method: "POST",
        body: JSON.stringify({
            username: data.username,
            password: data.password 
        }
        ),
        headers: { 'Content-Type': 'application/json' },
    }
    fetch("/sign-in", req)
    .then((res)=> {
        if (!res.ok)
            return {};
        return res.json();
    })
    .then((res)=> {
        if (res.result==='success') {
            func(asyncAuthenticate())
            return navigate(res.nav, {replace:true});
        }
        return navigate("/sign-in", {replace: true});
    })    
}
export function Sign(props) {
    const dispatch = useDispatch();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    

    let navigate = useNavigate()
    const handleUserField = (e) => {
        setUsername(e.target.value);
    }
    const handlePassField = (e) => {
        setPassword(e.target.value);
    }
    const handleSubmit = () => {
        var data = {
            username: username,
            password: password
        }
        // dispatch(asyncAuthenticate());
        if (props.name==="Sign Up") {
            return sign_up(data, navigate, dispatch);
        } else if (props.name==="Sign In") {
            return sign_in(data, navigate, dispatch);
        }
    }
    return (
        <div>
            <center>
            <Box
                component="form"
                alignItems="center"
                justifyContent="center"
                m={2}
            >
            <Typography
            variant="h4"
            noWrap
            component="div"
            justifyContent="center"
            sx={{ m: 3, display: { xs: 'none', md: 'flex' } }}
          >
            {props.name}
          </Typography>
            <Box
            m={1}
            >
            <TextField
                required
                id="outlined-required"
                label="Required"
                value={username}
                onChange={handleUserField}
            />
            <br/>
            </Box>
            <Box
            m={1}>
            <TextField
                required
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                name="password"
                value={password}
                onChange={handlePassField}
            /><br/>
            </Box>
            <Button variant="contained" onClick={handleSubmit}> Submit</Button>
            </ Box>
            </center>
            
        </div>
    );
}

