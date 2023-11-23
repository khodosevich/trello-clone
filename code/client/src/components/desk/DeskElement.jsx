import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Box, Typography} from "@mui/material";
import {methods} from "../../api/methods";
import DeskSideBar from "./DeskSideBar";


import classes from "../../style/desks.module.css"
import {UserContext} from "../../Main";
import CreateColumn from '../column/CreateColumn';
import ColumnList from '../column/ColumnList';

export const UpdateState = React.createContext()

const DeskElement = () => {

    const {setIsFetching} = useContext(UserContext)

    const {id,deskId} = useParams()

    const [columns, setColumns] = useState([])

  
    const [updateState, setUpdateState] = useState(1)

    const fetchColumn = async () => {
        try{
            setIsFetching(true)
            const token =JSON.parse(localStorage.getItem("token")).accessToken
            const data = await methods.getColumn(token,deskId)
            setColumns(data.data)
        }catch (e) {
            console.log(e)
        }finally {
            setIsFetching(false)
        }
    }


    useEffect(() => {
        fetchColumn()
    }, [updateState]);

    return (
        <Box className={classes.desks_column}>

            <DeskSideBar/>

            <Typography mb={2} variant="h3">Columns:</Typography>
            
            <ColumnList setColumns={setColumns} columns={columns}/>
            
            <CreateColumn setColumns={setColumns} deskId={deskId}/>

        </Box>
    );
};

export default DeskElement;