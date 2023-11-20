import React from 'react';
import {Box} from "@mui/material";
import {NavLink} from "react-router-dom";

import close from "../../img/close.png"
import {methods} from "../../api/methods";

const DeskItem = ({desk}) => {

    const deleteDesk = async () => {
        const token =JSON.parse(localStorage.getItem("token")).accessToken
        const data = await methods.deleteDesk(token,desk.deskId)
        console.log(data)
    }

    return (

            <Box sx={{
                background:"#b2b2b2",
                width:"250px",
                height:"50px",
                borderRadius:"20px",
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center",
                padding:"5px 10px"
            }}>
                <NavLink to={`${desk.deskId}`}>
                    <Box>
                        {desk.deskName}
                    </Box>
                </NavLink>
                <Box onClick={deleteDesk} style={{cursor:"pointer"}}>
                    <img style={{
                        width:"20px",
                        height:"20px"
                    }} src={close} alt="close"/>
                </Box>
            </Box>
    );
};

export default DeskItem;