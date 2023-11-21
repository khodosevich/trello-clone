import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Box, Button, TextField, Typography} from "@mui/material";
import {methods} from "../../api/methods";
import Column from "../column/Column";
import DeskSideBar from "./DeskSideBar";


import classes from "../../style/desks.module.css"

export const UpdateState = React.createContext()

const DeskElement = () => {

    const {id} = useParams()

    const [columns, setColumns] = useState([])

    const [createColumn, setCreateColumn] = useState(false)

    const [columnData, setColumnData] = useState({
        columnName: "",
        deskId: ""
    });

    const [updateState, setUpdateState] = useState(false)

    const fetchColumn = async () => {
        const token =JSON.parse(localStorage.getItem("token")).accessToken
        const data = await methods.getColumn(token,id)
        setColumns(data.data)
    }

    const createNewColumn = async () => {
        const token =JSON.parse(localStorage.getItem("token")).accessToken
        const response = await methods.createColumn(token,columnData)
        console.log(response)
        setCreateColumn(false)
        setUpdateState(prevState => !prevState)
    }



    useEffect(() => {
        fetchColumn()
        setColumnData({...columnData, deskId:id})
    }, [updateState]);

    return (
        <Box className={classes.desks_column}>

            <DeskSideBar id={id}/>

            <Typography variant="h6">Columns:</Typography>
            <Box sx={{display:"flex", flexDirection:"row", gap:"20px", flexWrap:"wrap",justifyContent:"center",alignItem:"center"}}>
                {
                    columns.map((item,index) => (
                            <Box key={index} sx={{
                                background:"black",
                                width:"310px",
                                color:"white",
                                padding:"20px 25px",
                                height:"100%",
                                borderRadius:"20px"
                            }} >
                                <UpdateState.Provider value={{updateState,setUpdateState}}>
                                    <Column column={item}/>
                                </UpdateState.Provider>
                            </Box>
                    ))
                }
            </Box>
            <Box mt={10} mb={10}>
                {
                    !createColumn && <Button onClick={ () => setCreateColumn(true)} variant="contained">Create a column</Button>
                }


                {
                    createColumn &&  <Box sx={{minWidth:"290px",maxWidth:"500px", background:"#dcdcdc", borderRadius:"20px", padding:"20px" }} mt={2}>
                        <TextField
                            fullWidth
                            onChange={(e)=> setColumnData({ ...columnData,  columnName:e.target.value })}
                            id="outlined-basic"
                            label="Coulmn name"
                            variant="outlined"
                        />
                        <Box sx={{
                            display:"flex",
                            gap:"20px",
                            marginTop:"40px"
                        }}>
                            <Button onClick={createNewColumn} variant="contained">Create</Button>
                            <Button onClick={ () => setCreateColumn(false)} variant="outlined" color="error">
                                Cancel
                            </Button>
                        </Box>

                    </Box>
                }
            </Box>

        </Box>
    );
};

export default DeskElement;