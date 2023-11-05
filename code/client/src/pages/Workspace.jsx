import React from 'react';
import {Box} from "@mui/material";

import classes from "../style/workspace.module.css"
import SideBarBoards from "../components/SideBarBoards";
import { Routes , Route} from "react-router-dom";
import Account from "../components/Account";

const Workspace = () => {
    return (
        <Box className={classes.content}>
            <Box className={classes.container}>
                <Box className={classes.boadrs}>
                    <SideBarBoards/>

                    <Routes>
                        <Route path="/account" element={<Account/>}/>
                        <Route path="/boards" element={<h2>workspace</h2>}/>
                        <Route path="/messages" element={<h2>messages</h2>}/>
                        <Route path="/create" element={<h2>create a board</h2>}/>
                    </Routes>
                </Box>
            </Box>
        </Box>
    );
};

export default Workspace;