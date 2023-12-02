import React, {useContext, useEffect, useState} from 'react';
import {methods} from "../api/methods";
import {Box, Button, TextField, Typography} from "@mui/material";
import classes from "../style/auth-page.module.css";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {UserContext} from "../Main";
import {parseToken} from "../api/parseToken";

const AuthPage = ({isExist}) => {

    const {user,setUser,isFetching, setIsFetching} = useContext(UserContext)
    const navigate = useNavigate()

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get("email");

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

            try{
                console.log("login")
                setIsFetching(true)
                const response = await methods.login(creds)
                const data = await response.data
    
                localStorage.setItem("token" , JSON.stringify(data))
    
                const decode = parseToken(data.accessToken)
                console.log(decode)
    
                setUser({
                    id: decode.sid,
                    username: decode.name,
                    aud:decode.aud,
                    isAuth: true,
                    exp: decode.exp
                })
    
            }catch(e) {
                console.log(e)
            }finally {
                setIsFetching(false)
                navigate("/workspace/myspace")
            }

            
            setIsFetching(false)
            navigate("/workspace/myspace")

        }else {
            try {
                console.log("register")
                setIsFetching(true)
                const response = await methods.register(creds)
                const data = await response.data
                console.log(data)
                localStorage.setItem("token" , JSON.stringify(data))

                const decode = parseToken(data.accessToken)

                setUser({
                    id: decode.sid,
                    username: decode.name,
                    aud:decode.aud,
                    isAuth: true,
                    exp: decode.exp
                })
            }catch(e){
                console.log("error" , e.code)
            }finally {
                setIsFetching(false)
                navigate("/workspace/myspace")
            }
          
        }
    }

    useEffect(() => {
        setCreds({
            username:email,
            password:""
        })
    }, []);

    return (
        <Box className={classes.auth_container}>
            <Box className={classes.auth_content}>
                <Typography variant="h4">
                    {isExist ? "Login" : "Registration"}
                </Typography>

                <Box style={{display:"flex",gap:"15px" , flexDirection:"column"}}>
                    <TextField
                        value={creds.username || ''}
                        onChange={(e) => usernameHandler(e)}
                        id="outlined-basic" label="Username" variant="outlined" />
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