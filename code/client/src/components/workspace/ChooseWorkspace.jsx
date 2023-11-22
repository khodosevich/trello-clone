import React from 'react';
import {Box} from "@mui/material";
import {NavLink} from "react-router-dom";

const ChooseWorkspace = () => {
    return (
        <Box ml={2}>
            <h2 style={{padding:"20px"}}>Please select a workspace first</h2>
            <NavLink style={{textDecoration:"none",color:"blue"}} to={"/workspace/myspace"}>
                Workspaces
            </NavLink>
        </Box>
    );
};

export default ChooseWorkspace;