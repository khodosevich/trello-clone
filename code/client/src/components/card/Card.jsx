import React, {useContext, useEffect, useState} from 'react';
import {Box, Button} from "@mui/material";
import {methods} from "../../api/methods";

import close from "../../img/close.png"
import {UpdateCardContext} from "../column/Column";

const Card = ({cardId}) => {


    const {updateCard,setUpdateCard} = useContext(UpdateCardContext)

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(cardId.title);


    const deleteCard = async () => {
        const token =JSON.parse(localStorage.getItem("token")).accessToken
        const response = await methods.deleteCard(token,cardId.cardId)

        setUpdateCard(!updateCard)
    }


    const handleTitleChange = (e) => {
        setEditedTitle(e.target.value);
    };

    const handleTitleBlur = async () => {
        setIsEditing(false);

        const token =JSON.parse(localStorage.getItem("token")).accessToken
        const response = await methods.updateCardTitle(token,cardId.cardId,editedTitle)
        console.log(response)

        setUpdateCard(!updateCard);
    };


    return (
            <Box sx={{
                display:"flex",
                flexDirection:"row",
                justifyContent:"center",
                alignItem:"center",
                gap:"5px"
            }}>
                <input
                    type="text"
                    value={editedTitle}
                    onChange={handleTitleChange}
                    onBlur={handleTitleBlur}
                    readOnly={!isEditing}
                    onClick={() => setIsEditing(true)}
                    style={{
                        width: "90%",
                        margin: "10px",
                        backgroundColor: "white",
                        borderRadius: "20px",
                        padding: "10px",
                        color: "black",
                        cursor: "pointer",
                        border: "none",
                        outline: "none",
                    }}
                />
                <Box sx={{
                    display:"flex",
                    justifyContent:"center",
                    alignItem:"center",
                }}>
                    <img onClick={deleteCard} style={{width:"15px",height:"20px",marginTop:"20px",objectFit:"contain",cursor:"pointer"}} src={close} alt="delete"/>
                </Box>
            </Box>
    );
};

export default Card;