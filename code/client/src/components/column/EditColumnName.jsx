import React, { useContext, useState } from 'react';
import { Box, Typography, Modal, Fade, TextField, Button } from "@mui/material";
import { DeskContext } from '../../pages/Workspace';
import { methods } from "../../api/methods";

const EditColumnName = ({openModal,handleCloseModal, id,setColumns}) => {
    
    const [editedColumnName, setEditedColumnName] = useState("");


    const changeNameHandler = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token")).accessToken;
            const data = await methods.updateColumnName(token, id, editedColumnName);
            setColumns(prev => prev.map((item) => (item.id === id ? { ...item, name: editedColumnName } : item)));

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
                        <Box sx={{ position: "absolute", display: "flex",flexDirection: "column",gap:"10px", top: "50%", left: "50%", transform: "translate(-50%, -50%)", minWidth: 310, maxWidth: 400, bgcolor: "background.paper", padding: "20px", boxShadow: 24, p: 4 }}>
                            <Typography variant="h6" gutterBottom>
                                Update Column Name
                            </Typography>
                            <TextField
                                label="New Desk Name"
                                variant="outlined"
                                value={editedColumnName}
                                onChange={(e) => setEditedColumnName(e.target.value)}
                            />
                            <Button variant="contained" color="primary" onClick={changeNameHandler}>
                                Update
                            </Button>
                        </Box>
                    </Fade>
               </Modal>
    );
};

export default EditColumnName;
