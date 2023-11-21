import React, { useContext } from 'react';
import {Box, IconButton, Typography} from "@mui/material";

import LockIcon from "@mui/icons-material/Lock";
import PublicIcon from "@mui/icons-material/Public";
import SecurityIcon from "@mui/icons-material/Security";
import DeleteIcon from '@mui/icons-material/Delete';

import classes from "../../style/desk-sidebar.module.css"
import { DeskContext } from '../../pages/Workspace';
import {methods} from "../../api/methods";
import {useNavigate} from "react-router-dom";


const DeskSideBar = () => {

    const navigate = useNavigate()

    const {currentDeskData,setCurrentDeskData} = useContext(DeskContext)

    const getIcon = () => {
        switch (currentDeskData[0].visibilityTypeCode) {
            case "Private":
                return <LockIcon />;
            case "Public":
                return <PublicIcon />;
            case "Protected":
                return <SecurityIcon />;
            default:
                return null;
        }
    };

    const handleDelete = async () => {
        const token =JSON.parse(localStorage.getItem("token")).accessToken
        const data = await methods.deleteDesk(token,currentDeskData[0].deskId)
        console.log(data)
        navigate("/workspace")
    }

    return (
        <Box className={classes.desk_sidebar}>

            <Typography sx={{cursor:"pointer"}} variant={"h6"}>
                {currentDeskData[0].deskName}
            </Typography>

            <Box className={classes.typeDesk}>
                {getIcon()} {currentDeskData[0].visibilityTypeCode}
            </Box>

            <Box>
                <IconButton color="secondary" onClick={handleDelete}>
                    <DeleteIcon sx={{color:"white"}} />
                </IconButton>
            </Box>

        </Box>
    );
};

export default DeskSideBar;