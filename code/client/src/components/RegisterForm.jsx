import React, {useState} from 'react';
import {Box} from "@mui/material";
import classes from "../style/home.module.css";
import {useNavigate} from "react-router-dom";

const RegisterForm = () => {

    const navigate = useNavigate()

    const [registerCreds, setRegisterCreds] = useState()

    const registerHandler = () => {
        navigate(`/register?email=${registerCreds}`)
    }

    return (
        <Box className={classes.home_content_left_form}>
            <input onChange={(e)=> setRegisterCreds(e.target.value)} className={classes.home_content_left_input} type="text" placeholder="Email" />
            <button onClick={registerHandler} className={classes.home_content_btn}>
                Sign up - it’s free!
            </button>
        </Box>
    );
};

export default RegisterForm;