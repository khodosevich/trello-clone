import React from 'react';
import {Box} from "@mui/material";
import {NavLink} from "react-router-dom";

const DeskItem = ({desk}) => {

    return (
        <NavLink to={`${desk.deskId}`}>
            <Box sx={{
                background:"#b2b2b2",
                width:"250px",
                height:"50px",
                borderRadius:"20px",
                display:"flex",
                justifyContent:"center",
                alignItems:"center"
            }}>
                {desk.deskName}
            </Box>
        </NavLink>
    );
};

export default DeskItem;