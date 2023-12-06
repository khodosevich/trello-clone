import React, {useContext, useEffect, useState} from 'react';
import {methods} from "../api/methods";
import {Alert, Box, Button, TextField, Typography} from "@mui/material";
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
        email:"",
        password:""
    })
    const emailHandler = (e) => {
        setCreds(prevState => ({
            ...prevState,
            email:e.target.value
        }))
        setMyArelt(false)
        setWarningAlert(false)
    }

    const passwordHandler = (e) => {
        setCreds(prevState => ({
            ...prevState,
            password:e.target.value
        }))
    }

    const validateEmail = (email) => {
        return email
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ) !== null
    };

    const [myArelt, setMyArelt] = useState(false)
    const [warningAlert, setWarningAlert] = useState(false)

    const authHandler = async () => {

        if(!creds.email || !creds.password) {
            setMyArelt(true)
            return
        }

        if(!validateEmail(creds.email)) {
            setMyArelt(true)
            return
        }

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
    
                setIsFetching(false)
                navigate("/workspace/myspace")

            }catch(e) {
                setMyArelt(true)
                setIsFetching(false)
                console.log(e) 
            }


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

                navigate("/workspace/myspace")

            }catch(e){
                setWarningAlert(true)
                setIsFetching(false)
                setMyArelt(true)
                console.log("error" , e.code)
            }
          
        }
    }

    useEffect(() => {
        setCreds({
            email:email,
            password:""
        })
    }, []);

    return (
        
         <Box className={classes.auth_container}>

            { 
                 <Box className={classes.alert}>
                        { myArelt && <Alert severity="error">This is an error with Email or Password — check it out!</Alert> }    
                        { warningAlert && <Alert style={{marginTop:"10px"}} severity="warning">Maybe user with this email already exists!</Alert>}
                 </Box>
             }

            <Box className={classes.auth_content}>
                <Typography variant="h4">
                    {isExist ? "Login" : "Registration"}
                </Typography>

                <Box style={{display:"flex",gap:"15px" , flexDirection:"column"}}>
                    <TextField
                        value={creds.email || ''}
                        onChange={(e) => emailHandler(e)}
                        id="outlined-basic" label="Email" variant="outlined" />
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