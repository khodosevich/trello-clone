import React, {useState} from 'react';
import {methods} from "../api/methods";
import {Box, Button, TextField, Typography} from "@mui/material";
import classes from "../style/auth-page.module.css";
import {NavLink} from "react-router-dom";

const AuthPage = ({isExist}) => {
    const [creds, setCreds] = useState({
        username:"",
        password:""
    })

    const usernameHandler = (e) => {
        setCreds(prevState => ({
            ...prevState,
            username:e.target.value
        }))
    }

    const passwordHandler = (e) => {
        setCreds(prevState => ({
            ...prevState,
            password:e.target.value
        }))
    }

    const authHandler = async () => {

        if(isExist) {
            console.log("login")
            const response = await methods.login(creds)
            const {data} = await response.data
            // localStorage.setItem(data)
            console.log(data)
        }else {
            console.log("register")
             const response = await methods.register(creds)
            const {data} = await response.data
            // localStorage.setItem(data)
            console.log(data)
        }
    }


    return (
        <Box className={classes.auth_container}>
            <Box className={classes.auth_content}>
                <Typography variant="h4">
                    {isExist ? "Login" : "Registration"}
                </Typography>

                <Box style={{display:"flex",gap:"15px" , flexDirection:"column"}}>
                    <TextField onChange={(e) => usernameHandler(e)} id="outlined-basic" label="Username" variant="outlined" />
                    <TextField onChange={(e) => passwordHandler(e)} id="outlined-basic" type="password" label="Password" variant="outlined" />
                </Box>

                <Button onClick={authHandler} variant="contained">Continue</Button>

                <Box className={classes.auth_login}>
                    <NavLink style={{
                        color:"black"
                    }} to= {isExist ? "/register" : "/login"}>
                        {isExist ? "Registration" : "Login"}
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

export default AuthPage;