import React, {useContext, useEffect, useState} from 'react';
import {Box} from "@mui/material";
import {methods} from "../../api/methods";
import {UserContext} from "../../Main";
import CardList from '../card/CardList';
import CardHeader from '../card/CardHeader';
import CreateCard from '../card/CreateCard';


const Column = ({column,setColumns}) => {

    
    const {setIsFetching} = useContext(UserContext)

    const [cardsIds, setCardIds] = useState([])
   
    const fetchCard = async () => {
        try {
            setIsFetching(true)
            const token =JSON.parse(localStorage.getItem("token")).accessToken
            const data = await methods.getColumnCard(token,column.id)
            setCardIds(data.data)
        }catch(e) {
            console.log(e)
        }
        finally{
            setIsFetching(false)
        }
    }

    
    useEffect(() => {
        fetchCard()
    }, []);

    return (
        <Box>
            <CardHeader column={column} setColumns={setColumns} />

            <CardList cards={cardsIds} setCardIds={setCardIds}/>

            <CreateCard column={column} setCardIds={setCardIds}/>
        </Box>
    );
};

export default Column;