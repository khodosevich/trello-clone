import React from 'react';
import {Box} from "@mui/material";
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <Box style={{
            height:"70px",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            background:"white",
            gap:"20px",
        }}>

            <NavLink style={{
                color:"black",
                textDecoration:"none"
            }} to="/">
                Logo
            </NavLink>

            <NavLink style={{
                color:"black",
                textDecoration:"none"
            }} to="/login">
                Войти
            </NavLink>
        </Box>
    );
};

export default Header;