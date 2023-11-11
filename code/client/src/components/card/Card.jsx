import React, {useEffect, useState} from 'react';
import {Box} from "@mui/material";
import {methods} from "../../api/methods";

const Card = ({cardId,columnId}) => {

    console.log("card id" , cardId.length)

    const [cards, setCards] = useState([])
    
    const getAllCards = async () => {
        const token =JSON.parse(localStorage.getItem("token")).accessToken

        for (let i = 0; i < cardId.length; i++) {
            const data = await methods.getCards(token, columnId, cardId[i].cardId)
            console.log(data.data)
            setCards(prevArray => [...prevArray, data.data]);
        }

    }

    useEffect(() => {
        getAllCards()
    }, []);

    return (
        <Box sx={{
            display:"flex",
            flexDirection:"column",
            gap:"5px"
        }}>
            {
                cards.map((item,index) => (
                    <Box key={index} sx={{
                        width:"100%",
                        margin:"10px",
                        backgroundColor:"white",
                        borderRadius:"20px",
                        padding:"10px",
                        color:"black"
                    }}>
                        {item.description}
                    </Box>
                ))
            }
        </Box>
    );
};

export default Card;