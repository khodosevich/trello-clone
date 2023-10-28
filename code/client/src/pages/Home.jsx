import React from 'react'
import {Button, Typography} from "@mui/material";
import {methods, register} from "../api/methods";

const Home = () => {

    const deskHandler = () => {
        methods.deskVisibility().then(r => {
            console.log(r)
        })
    }


    const loginR = () => {
        methods.login()
    }

    const regs = async () => {
        const {data} = (await register()).data

        console.log(data)
    }

    return(
        <Typography>
            <button onClick={deskHandler}>desk</button>
            <Button onClick={loginR} variant="contained">login</Button>
            <Button  onClick={regs} variant="contained">register</Button>
        </Typography>
    )

}

export default Home;