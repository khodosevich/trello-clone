import React from 'react';
import {Box, CircularProgress} from "@mui/material";

const CircularIndeterminate = () => {
    return (
        <Box sx={{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <CircularProgress style={{ height:"200px", width:"200px" }} />
        </Box>
    );
};

export default CircularIndeterminate;