import React, {useContext} from 'react';
import {Box, Typography} from "@mui/material";
import {UserContext} from "../Main";

const Account = () => {

    const {user,setUser} = useContext(UserContext)

    return (
        <Box  sx={{
            maxWidth:"100%",
            margin:"10px",
        }}>
            Account data:
            <Box sx={{
                background:"#b7b7b7",
                width:"100%",
                padding:"20px",
                borderRadius:"20px",
                marginTop:"20px"
            }}>
                <Typography>
                    {`Username: ${user.username}`}
                </Typography>
                <Typography>
                    {`User id: ${user.id}`}
                </Typography>
            </Box>
        </Box>
    );
};

export default Account;