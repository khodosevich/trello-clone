import React, { useContext , useState} from 'react';
import { Box, Typography, IconButton} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import PublicIcon from "@mui/icons-material/Public";
import SecurityIcon from "@mui/icons-material/Security";
import DeleteIcon from '@mui/icons-material/Delete';
import { DeskContext } from '../../pages/Workspace';
import { methods } from "../../api/methods";
import { useNavigate } from "react-router-dom";
import classes from "../../style/desk-sidebar.module.css";
import EditDeskName from './EditDeskName';
import EditDeskVisibilityTypeCode from './EditDeskVisibilityTypeCode';

const DeskSideBar = () => {
    const navigate = useNavigate();
    const { currentDeskData, setCurrentDeskData } = useContext(DeskContext);

    const getIcon = () => {
        switch (currentDeskData.visibilityTypeCode) {
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

    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };


    const [typeOpenModal, setTypeOpenModal] = useState(false);

    const handleDelete = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token")).accessToken;
            const data = await methods.deleteDesk(token, currentDeskData.deskId);
            navigate("/workspace");
        } catch (e) {
            console.log(e);
        }
    };


    return (
        <Box className={classes.desk_sidebar}>
            <Typography onClick={handleOpenModal} sx={{ cursor: "pointer" }} variant="h6">
                {currentDeskData.deskName}
            </Typography>

            <Box sx={{ cursor: "pointer" }} onClick={() => setTypeOpenModal(true) } className={classes.typeDesk}>
                {getIcon()} {currentDeskData.visibilityTypeCode}
            </Box>

            <Box>
                <IconButton color="secondary" onClick={handleDelete}>
                    <DeleteIcon sx={{ color: "white" }} />
                </IconButton>
            </Box>

            <EditDeskName  openModal={openModal} handleCloseModal={handleCloseModal}/>        
            <EditDeskVisibilityTypeCode typeOpenModal={typeOpenModal} setTypeOpenModal={setTypeOpenModal} currentType={currentDeskData.visibilityTypeCode} />
        </Box>
    );
};

export default DeskSideBar;
