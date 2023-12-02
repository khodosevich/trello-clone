import React, { Fragment, useContext, useState } from "react";
import plus from "../../img/plus.png"
import { Box , Button} from "@mui/material";
import { UserContext } from "../../Main";
import {methods} from "../../api/methods";
import AddIcon from '@mui/icons-material/Add';

const CreateCard = ({column,setCardIds}) => {

    
    const {setIsFetching} = useContext(UserContext)

    const [createCard, setCreateCard] = useState(false)

    const [cardData, setCardData] = useState({
        title: "",
        description: "",
        columnId: column.id
    })

    const newCardHandler = async () => {
        try{
            setIsFetching(true)
            const token =JSON.parse(localStorage.getItem("token")).accessToken
            const response = await methods.createCard(token,cardData)
            setCardIds(prev => [...prev, response.data])

        }catch(e) {
            console.log(e)
        }finally {
            setIsFetching(false)
            setCreateCard(false)
            setCardData({...cardData,title:"",description:""})
        }
    }


    return( 
        <Fragment>
            {
                !createCard &&
                <Box sx={{
                        margin:"10px",
                        borderRadius:"20px",
                        padding:"10px",
                        background:"white",
                        color:"black",
                        cursor:"pointer",
                        display:"flex",
                        gap:"10px"
                    }} onClick={()=> setCreateCard(true)}
                    >
                        <AddIcon/>
                        Create a card
                    </Box>
            }

            {
                createCard && <Box sx={{
                    background:"#a4a4a4",
                    padding:"20px",
                    borderRadius:"20px"
                }}>
                    <input
                        onChange={(e)=> setCardData({...cardData,title:e.target.value})}
                        style={{
                            width:"90%",
                            margin:"10px",
                            borderRadius:"20px",
                            padding:"10px",
                            background:"white",
                            color:"black",
                            border:"0",
                            outline:"0"
                        }} value={cardData.title} placeholder="Card name" type="text"/>
                    <input
                        onChange={(e)=> setCardData({...cardData,description:e.target.value})}
                        style={{
                            width:"90%",
                            margin:"10px",
                            borderRadius:"20px",
                            padding:"10px",
                            background:"white",
                            color:"black",
                            border:"0",
                            outline:"0"
                        }} value={cardData.description} placeholder="Card description" type="text"/>

                    <Box mt={4} sx={{
                        display:"flex",
                        gap:"20px"
                    }}>
                        <Button onClick={newCardHandler} variant="contained">Create</Button>
                        <Button onClick={ () => setCreateCard(false)} variant="outlined" color="error">
                            Cancel
                        </Button>
                    </Box>
                </Box>
            }
        </Fragment>
    )

}

export default CreateCard;