import React, {useContext} from 'react';
import {Box} from "@mui/material";
import {NavLink} from "react-router-dom";

import {methods} from "../../api/methods";
import ClearIcon from '@mui/icons-material/Clear';
import {UserContext} from "../../Main";

const DeskItem = ({desk}) => {

    const {setIsFetching} = useContext(UserContext)

    const deleteDesk = async () => {
        setIsFetching(true)
        const token =JSON.parse(localStorage.getItem("token")).accessToken
        const data = await methods.deleteDesk(token,desk.deskId)
        setIsFetching(false)
    }

    return (

            <Box sx={{
                display:"flex",
                alignItems:"center",
                gap:"2px"
            }}>
                <Box>
                    <NavLink style={{textDecoration:"none",  color:"white"}} to={`${desk.deskId}`}>
                        <Box sx={{
                            background:"#000000",
                            width:"250px",
                            height:"50px",
                            borderRadius:"20px",
                            display:"flex",
                            justifyContent:"space-between",
                            alignItems:"center",
                            padding:"5px 10px",
                        }}>
                            {desk.deskName}
                        </Box>
                    </NavLink>
                </Box>
                <Box onClick={deleteDesk} style={{cursor:"pointer"}}>
                    <ClearIcon
                        style={{
                        width:"20px",
                        height:"20px",
                    }}
                    />
                </Box>
            </Box>
    );
};

export default DeskItem;