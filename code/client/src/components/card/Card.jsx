import React, {useContext, useEffect, useState} from 'react';
import {Box, Button} from "@mui/material";
import {methods} from "../../api/methods";

import close from "../../img/close.png"
import {UpdateCardContext} from "../column/Column";

const Card = ({cardId}) => {


    const {updateCard,setUpdateCard} = useContext(UpdateCardContext)
    console.log(cardId)

    const deleteCard = async () => {
        const token =JSON.parse(localStorage.getItem("token")).accessToken

        const response = await methods.deleteCard(token,cardId.cardId)
        console.log(response)
        setUpdateCard(!updateCard)
    }

    return (
            <Box sx={{
                display:"flex",
                flexDirection:"row",
                justifyContent:"center",
                alignItem:"center",
                gap:"5px"
            }}>
                <Box sx={{
                    width:"90%",
                    margin:"10px",
                    backgroundColor:"white",
                    borderRadius:"20px",
                    padding:"10px",
                    color:"black"
                }}>
                    {cardId.title}
                </Box>
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