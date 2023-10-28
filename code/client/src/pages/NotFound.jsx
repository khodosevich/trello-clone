import React from 'react';
import {Box, Typography} from "@mui/material";

const NotFound = () => {
    return (
        <Box style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            height:"100vh",
        }}>
            <Typography variant="h1">
                404 Not found
            </Typography>
        </Box>
    );
};

export default NotFound;