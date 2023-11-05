import React from 'react';
import {Box} from "@mui/material";
import {NavLink} from "react-router-dom";

import classes from '../style/header.module.css'

const Header = () => {

    const isAuth = false

    return (
        <Box className={classes.header} >
            <Box className={classes.header_content}>

                <NavLink className={classes.logo} to="/">
                    TaskManager
                </NavLink>

                {
                    isAuth ? "Logout" : <Box className={classes.header_links}>
                        <NavLink className={classes.header_link_login} to="/login">
                            Login
                        </NavLink>
                        <NavLink className={classes.header_link_register}
                                 to="/register">
                            <Box className={classes.header_register_container}>
                                Get Us for free
                            </Box>
                        </NavLink>
                    </Box>
                }

            </Box>
        </Box>
    );
};

export default Header;