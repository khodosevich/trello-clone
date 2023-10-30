import React, {useState} from 'react';
import {Box, Typography, TextField, Button} from "@mui/material";
import { NavLink } from 'react-router-dom';

import classes from "../style/registration.module.css"

const Register = () => {

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

    const registerHandler = () => {

    }


    return (
        <Box className={classes.register_container}>
            <Box className={classes.register_content}>
                <Typography variant="h4">
                    Registration
                </Typography>

                <Box style={{display:"flex",gap:"15px" , flexDirection:"column"}}>
                    <TextField onChange={(e) => usernameHandler(e)} id="outlined-basic" label="Username" variant="outlined" />
                    <TextField onChange={(e) => passwordHandler(e)} id="outlined-basic" type="password" label="Password" variant="outlined" />
                </Box>

                <Button onClick={registerHandler} variant="contained">Continue</Button>

                <NavLink style={{
                    color:"black"
                }} to="/">
                    On main
                </NavLink>
            </Box>
        </Box>
    );
};

export default Register;