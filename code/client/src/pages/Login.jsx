import React, {useEffect, useState} from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";

const Login = () => {

    const [loginData, setLoginData] = useState({
        username:"",
        password:""
    })

    const usernameHandler = (e) => {
        setLoginData(prevState => ({
            ...prevState,
            username:e.target.value
        }))
    }

    const passwordHandler = (e) => {
        setLoginData(prevState => ({
            ...prevState,
            password:e.target.value
        }))
    }

    const loginHandler = () => {
        console.log(loginData)
    }

    return (
        <Box style={{
            background:"#b7b7b7",
            height:"100vh",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
        }}>
            <Box style={{
                width:"400px",
                height:"600px",
                background:"#fff",
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                gap:"40px",
                borderRadius:"20px"
            }}>
                <Typography variant="h4">
                    Login
                </Typography>

                <Box style={{display:"flex",gap:"15px" , flexDirection:"column"}}>
                    <TextField onChange={(e) => usernameHandler(e)} id="outlined-basic" label="Username" variant="outlined" />
                    <TextField onChange={(e) => passwordHandler(e)} id="outlined-basic" type="password" label="Password" variant="outlined" />
                </Box>

                <Button onClick={loginHandler} variant="contained">Continue</Button>

            </Box>
        </Box>
    );
};

export default Login;