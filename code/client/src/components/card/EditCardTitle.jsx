import React from "react";
import { Modal, Fade, Box, Typography, TextField, Button } from "@mui/material";
import { methods } from "../../api/methods";

const EditCardTitle = ({openModal,handleCloseModal,setCards,card}) => {

    const [editedCardTitle, setEditedCardTitle] = React.useState(card.title);

    const changeCardTitle = async () => {
        
        try{
            const token = JSON.parse(localStorage.getItem("token")).accessToken;
            const response = await methods.updateCardTitle(token,card.cardId,editedCardTitle);

            setCards(prev => prev.map((item) => (item.cardId === card.cardId ? { ...item, title: editedCardTitle } : item)));
            
        }catch(e){
            console.log(e);
        }finally{
            handleCloseModal();
        }
        
    }

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
                        Update Desk Name
                    </Typography>
                    <TextField
                        label="New Desk Name"
                        variant="outlined"
                        value={editedCardTitle}
                        onChange={(e) => setEditedCardTitle(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={changeCardTitle}>
                        Update
                    </Button>
                </Box>
            </Fade>
       </Modal>
    )
}

export default EditCardTitle;