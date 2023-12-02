import React, {useContext, useState} from 'react';
import {Box} from "@mui/material";
import {methods} from "../../api/methods";
import ClearIcon from '@mui/icons-material/Clear';
import {UserContext} from "../../Main";
import EditCardTitle from './EditCardTitle';


const Card = ({cardId,setCardsIds}) => {
    const [editedTitle, setEditedTitle] = useState(cardId.title);

    const {setIsFetching} = useContext(UserContext)

    const deleteCard = async () => {

        try {
            setIsFetching(true)
            const token =JSON.parse(localStorage.getItem("token")).accessToken
            const response = await methods.deleteCard(token,cardId.cardId)
            setCardsIds(prev => prev.filter((item) => item.cardId !== cardId.cardId))

        } catch (error) {
            console.log(error)
        }finally {
            setIsFetching(false)
        }
    }

    const [openModal, setOpenModal] = useState(false)

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleTitleChange = (e) => {
        setEditedTitle(e.target.value);
    };

    return (
            <Box
             sx={{
                display:"flex",
                flexDirection:"row",
                justifyContent:"center",
                alignItem:"center",
                gap:"5px"
            }}>
                <input
                    type="text"
                    value={cardId.title}
                    onChange={handleTitleChange}
                    onClick={handleOpenModal}
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
                    <ClearIcon onClick={deleteCard} style={{width:"15px",height:"20px",marginTop:"20px",objectFit:"contain",cursor:"pointer"}}/>
                </Box>
                <EditCardTitle openModal={openModal}  handleCloseModal={handleCloseModal} card={cardId} setCards={setCardsIds}/>
            </Box>
    );
};

export default Card;