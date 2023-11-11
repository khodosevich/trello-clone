import React, {useContext, useEffect, useState} from 'react';
import {Box, Typography} from "@mui/material";
import {methods} from "../../api/methods";
import {DeskContext} from "../../pages/Workspace";
import DeskItem from "./DeskItem";

const Desks = () => {

    const {currentWorkspace,setCurrentWorkspace}  = useContext(DeskContext);

    const [deskItems, setDeskItems] = useState([])


    const fetchDesk =  async () => {
        const token =JSON.parse(localStorage.getItem("token")).accessToken
        const data = await methods.getDesk(token,currentWorkspace.id);
        setDeskItems(data.data)
    }

    useEffect(() => {
        fetchDesk()
    }, []);

    return (
        <Box ml={10}>
            <Typography variant="h4">Boards:</Typography>

            <Box sx={{display:"flex",flexDirection:"column", gap:"20px" }}>
                {
                    deskItems.map((item,index) => (
                            <DeskItem key={index} desk={item} key={index}/>
                    ))
                }
            </Box>
            <Box>

            </Box>
        </Box>
    );
};

export default Desks;