import React from "react";
import { Box } from "@mui/material";
import Card from "./Card";

const CardList = ({cards,setCardIds}) => {

    return(
        <Box>
            {
                cards.map((item) => (
                    <Card key={item.cardId} setCardsIds={setCardIds} cardId={item}/>
                ))
            }
        </Box>
    )
}

export default CardList;