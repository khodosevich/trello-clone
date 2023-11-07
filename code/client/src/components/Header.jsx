import React, {useContext} from 'react';
import {Box, Button, Menu, MenuItem} from "@mui/material";
import {NavLink} from "react-router-dom";

import classes from '../style/header.module.css'
import {UserContext} from "../Main";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const Header = () => {

    const {user,setUser} = useContext(UserContext)

    const logoutHandler = () => {
        localStorage.removeItem("token")
        setUser({
            id: 0,
            username: "",
            aud:"",
            isAuth: false,
        })
    }

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box className={classes.header} >
            <Box className={classes.header_content}>

                <Box className={classes.header_nav}>
                    <NavLink className={classes.logo} to="/">
                        <img style={{height:"60px" , width:"100%",padding:"10px"}} src="./assets/logo.png" alt=""/>
                    </NavLink>



                    {
                        user.isAuth &&
                        <List className={classes.menu}>
                            <NavLink className={classes.menu_link} to="/workspace">
                                <ListItem>
                                    <NavLink
                                        to="/workspace"
                                        onClick={handleClick}
                                        className={classes.menu_link}
                                    >
                                        My workspaces
                                    </NavLink>
                                    <Menu
                                        anchorEl={anchorEl}
                                        id="simple-menu"
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={handleClose}>workspace 1</MenuItem>
                                        <MenuItem onClick={handleClose}>workspace 2</MenuItem>
                                        <MenuItem onClick={handleClose}>workspace 3</MenuItem>
                                    </Menu>
                                </ListItem>
                            </NavLink>
                            <NavLink className={classes.menu_link} to="#">
                                <ListItem>
                                    Favorites
                                </ListItem>
                            </NavLink>
                        </List>

                    }
                </Box>

                {
                    user.isAuth ? <Box className={classes.header_logout} onClick={logoutHandler}>
                        Logout
                    </Box> : <Box className={classes.header_links}>
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