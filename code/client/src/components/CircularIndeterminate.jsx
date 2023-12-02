import React from 'react';
import { Box, CircularProgress } from "@mui/material";

const CircularIndeterminate = () => {
    return (
        <Box
            sx={{
                height: "100vh",
                width: "100vw", 
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                top: 0,
                zIndex: "100",
                background: "rgba(0, 0, 0, 0.5)" 
            }}
        >
            <CircularProgress style={{ height: "200px", width: "200px" }} />
        </Box>
    );
};

export default CircularIndeterminate;
