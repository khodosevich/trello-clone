import React from 'react';

import {Box, Button, makeStyles} from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MailIcon from '@mui/icons-material/Mail';
import {NavLink} from "react-router-dom";



const SideBarBoards = () => {

    const handleCreateWorkspace = () => {
        console.log('Создать доску');
    };


    return (
        <Box sx={{padding:"50px 0"}}>
            <Box sx={{width: 240}}>
                <List>
                    <NavLink style={{textDecoration:"none",color:"black"}} to="/workspace/boards">
                        <ListItem button>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Boards" />
                        </ListItem>
                    </NavLink>
                    <NavLink style={{textDecoration:"none",color:"black"}} to="/workspace/messages">
                        <ListItem button>
                            <ListItemIcon>
                                <MailIcon />
                            </ListItemIcon>
                            <ListItemText primary="Messages" />
                        </ListItem>
                    </NavLink>
                    <NavLink style={{textDecoration:"none",color:"black"}} to="/workspace/account">
                        <ListItem button>
                            <ListItemIcon>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Account" />
                        </ListItem>
                    </NavLink>
                    <NavLink style={{textDecoration:"none",color:"black"}} to="/workspace/create">
                        <Button
                            variant="contained"
                            color="primary"
                            style={{width:"100%"}}
                            onClick={handleCreateWorkspace}
                        >
                            Создать workspace
                        </Button>
                    </NavLink>
                </List>
            </Box>
    </Box>

    );
};

export default SideBarBoards;