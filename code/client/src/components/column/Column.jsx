import React, {useContext, useEffect, useState} from 'react';
import {Box, Button} from "@mui/material";
import {methods} from "../../api/methods";
import Card from "../card/Card";

import {UpdateState} from "../desk/DeskElement";

import plus from "../../img/plus.png"
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ClearIcon from '@mui/icons-material/Clear';

export const UpdateCardContext = React.createContext()

const Column = ({column}) => {

    const {updateState,setUpdateState} = useContext(UpdateState)

    const [cardId, setCardId] = useState([])
    const fetchCard = async () => {
        const token =JSON.parse(localStorage.getItem("token")).accessToken
        const data = await methods.getColumnCard(token,column.id)
        console.log(data.data)
        setCardId(data.data)
    }

    const deleteColumn = async () => {
        const token =JSON.parse(localStorage.getItem("token")).accessToken
        const data = await methods.deleteColumn(token,column.id)
        console.log(data)
        setUpdateState(!updateState)
    }


    const [createCard, setCreateCard] = useState(false)

    const [cardData, setCardData] = useState({
        title: "",
        description: "",
        columnId: column.id
    })

    const [updateCard, setUpdateCard] = useState(false)

    const newCardHandler = async () => {
        const token =JSON.parse(localStorage.getItem("token")).accessToken
        const response = await methods.createCard(token,cardData)
        console.log(response)
        setUpdateCard(!updateCard)
        setCreateCard(false)
    }

    const [updateColumnName, setUpdateColumnName] = useState(false)
    const [editedColumnName,setEditedColumnName] = useState(column.name)

    const changeName = async () => {

        console.log("change name " , editedColumnName)
        const token =JSON.parse(localStorage.getItem("token")).accessToken
        const res = await methods.updateColumnName(token,column.id,editedColumnName)

        setUpdateColumnName(false)
    }

    useEffect(() => {
        fetchCard()
        console.log(cardId)
    }, [updateCard]);

    return (
        <Box>
            <Box sx={{display:"flex",justifyContent:"space-between"}}>
                <Box sx={{display:"flex",justifyContent:"space-between" , gap:"10px" , margin:"10px"}}>

                    {
                        !updateColumnName &&  <Box>
                            {editedColumnName}
                        </Box>
                    }

                    {
                        updateColumnName && <input
                            value={editedColumnName}
                            onChange={(e) => setEditedColumnName(e.target.value)}
                            onBlur={changeName}
                            style={{
                                borderRadius:"20px",
                                border:"0",
                                outline:"0",
                                padding:"5px"
                            }}
                            type="text"/>
                    }

                    <Box onClick={() => setUpdateColumnName(true)} sx={{cursor:"pointer"}}>
                        <DriveFileRenameOutlineIcon/>
                    </Box>
                </Box>
                <Box>
                    <ClearIcon onClick={deleteColumn} style={{width:"20px",height:"20px", cursor:"pointer"}}/>
                </Box>
            </Box>

            <Box>
                {
                    cardId.map((item,index) => (
                        <UpdateCardContext.Provider key={index} value={{updateCard,setUpdateCard}}>
                            <Card cardId={item}/>
                        </UpdateCardContext.Provider>
                    ))
                }
            </Box>

            {
                !createCard &&  <Box sx={{
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
                    <img style={{width:"20px",height:"20px"}} src={plus} alt="add"/>
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
                        onChange={(e)=>setCardData({...cardData,title:e.target.value})}
                        style={{
                            width:"90%",
                            margin:"10px",
                            borderRadius:"20px",
                            padding:"10px",
                            background:"white",
                            color:"black",
                            border:"0",
                            outline:"0"
                        }}  placeholder="Card name" type="text"/>
                    <input
                        onChange={(e)=>setCardData({...cardData,description:e.target.value})}
                        style={{
                            width:"90%",
                            margin:"10px",
                            borderRadius:"20px",
                            padding:"10px",
                            background:"white",
                            color:"black",
                            border:"0",
                            outline:"0"
                        }}  placeholder="Card description" type="text"/>

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
        </Box>
    );
};

export default Column;