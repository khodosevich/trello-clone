import React, {useEffect, useState} from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";

import classes from "../style/login.module.css"

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
        <Box className={classes.login_container}>
            <Box className={classes.login_content}>
                <Typography variant="h4">
                    Login
                </Typography>

                <Box style={{display:"flex",gap:"15px" ,minWidth:"200px" ,flexDirection:"column"}}>
                    <TextField onChange={(e) => usernameHandler(e)} id="outlined-basic" label="Username" variant="outlined" />
                    <TextField onChange={(e) => passwordHandler(e)} id="outlined-basic" type="password" label="Password" variant="outlined" />
                </Box>

                <Button onClick={loginHandler} variant="contained">Continue</Button>

                <Box className={classes.login_login}>
                    <NavLink style={{
                        color:"black"
                    }} to="/register">
                        Registration
                    </NavLink>

                    <NavLink style={{
                        color:"black"
                    }} to="/">
                        On main
                    </NavLink>
                </Box>
            </Box>
        </Box>
    );
};

export default Login;