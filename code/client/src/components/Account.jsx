import React, {useContext} from 'react';
import {Box, Typography} from "@mui/material";
import {UserContext} from "../Main";

const Account = () => {

    const {user,setUser} = useContext(UserContext)

    return (
        <Box  sx={{
            marginTop:"20px",
            marginLeft:"100px"
        }}>
            Account data:
            <Box sx={{
                background:"#b7b7b7",
                width:"400px",
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