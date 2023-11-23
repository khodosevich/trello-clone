import React from 'react';
import {Box} from "@mui/material";
import DeskItem from "./DeskItem";

const DeskList = ({desks,setDesks}) => {
    return (
        <Box sx={{display:"flex",flexDirection:"row", gap:"20px" , flexWrap:"wrap"}}>
            {
                desks.map((item) => (
                    <DeskItem key={item.deskId} desk={item} setDesks={setDesks}/>
                ))
            }
        </Box>
    );
};

export default DeskList;