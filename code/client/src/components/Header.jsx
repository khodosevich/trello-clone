import React, {useContext, useEffect, useState} from 'react';
import {Box, Menu, MenuItem} from "@mui/material";
import {NavLink} from "react-router-dom";

import classes from '../style/header.module.css'
import {UserContext} from "../Main";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import {methods} from "../api/methods";

const Header = () => {

    const {user,setUser} = useContext(UserContext)

    const logoutHandler = () => {
        localStorage.removeItem("token")
        setUser({
            id: 0,
            username: "",
            aud:"",
            isAuth: false,
            exp: 0
        })
    }

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [workspaces, setWorkspaces] = useState([])

    const fetchData = async () => {
        const token =JSON.parse(localStorage.getItem("token")).accessToken
        const data = await methods.getWorkSpaces(token)
        setWorkspaces(data.data)
    }

    useEffect(() => {
        if(user.isAuth) {
            fetchData()
        }
    }, [anchorEl]);


    return (
        <Box className={classes.header} >
            <Box className={classes.header_content}>

                <Box className={classes.header_nav}>
                    <NavLink className={classes.logo} to="/">
                        <img style={{height:"60px" , minWidth:"100px", objectFit:"contain"}} src="./assets/logo.png" alt=""/>
                    </NavLink>

                    {
                        user.isAuth &&
                        <List className={classes.menu}>
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
                                    {
                                        workspaces.length !== null &&
                                        workspaces.map((item,index) => (<NavLink key={index} style={{textDecoration:"none"}} to={"/workspace/" + item.id}>
                                                <MenuItem sx={{color:"black",textDecoration:"none"}}  onClick={handleClose}>{item.name}</MenuItem>
                                        </NavLink>
                                        ))
                                    }
                                </Menu>
                            </ListItem>
                            {/*<ListItem>*/}
                            {/*        Favorites*/}
                            {/*</ListItem>*/}
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