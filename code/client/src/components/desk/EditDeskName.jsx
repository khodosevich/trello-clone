import React, { useContext, useState } from 'react';
import { Box, Typography, Modal, Fade, TextField, Button } from "@mui/material";
import { DeskContext } from '../../pages/Workspace';
import { methods } from "../../api/methods";

const EditDeskName = ({openModal,handleCloseModal}) => {
    
    const { currentDeskData, setCurrentDeskData } = useContext(DeskContext);

    const [editedDeskName, setEditedDeskName] = useState("");


    const changeNameHandler = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token")).accessToken;
            await methods.updateDeskName(token, currentDeskData.deskId, editedDeskName);
            setCurrentDeskData(prev => ({ ...prev, deskName: editedDeskName }));
        } catch (e) {
            console.log(e);
        } finally {
            handleCloseModal();
        }
    };

    return (
        <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModal}
                onClose={handleCloseModal}
                closeAfterTransition
            >
                    <Fade in={openModal}>
                        <Box sx={{ position: "absolute", display: "flex",flexDirection: "column",gap:"10px", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", padding: "20px", boxShadow: 24, p: 4 }}>
                            <Typography variant="h6" gutterBottom>
                                Update Desk Name
                            </Typography>
                            <TextField
                                label="New Desk Name"
                                variant="outlined"
                                value={editedDeskName}
                                onChange={(e) => setEditedDeskName(e.target.value)}
                            />
                            <Button variant="contained" color="primary" onClick={changeNameHandler}>
                                Update
                            </Button>
                        </Box>
                    </Fade>
               </Modal>
    );
};

export default EditDeskName;
