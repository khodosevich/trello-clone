import React, {useEffect, useState} from 'react';
import {Box, Typography} from "@mui/material";
import {methods} from "../../api/methods";
import Card from "../card/Card";

const Column = ({column}) => {

    const [cards, setCards] = useState([])


    const [cardId, setCardId] = useState([])
    const fetchCard = async () => {
        const token =JSON.parse(localStorage.getItem("token")).accessToken
        const data = await methods.getColumnCard(token,column.id)
        setCardId(data.data)
    }

    useEffect(() => {
        fetchCard()
    }, []);

    return (
        <Box>
            {column.name}
            <Box>
                {
                    cardId.length ? <Card columnId={column.id} cardId={cardId}/> : <>
                        Cards is empty
                    </>
                }
            </Box>
        </Box>
    );
};

export default Column;