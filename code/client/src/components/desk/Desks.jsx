import React, {Fragment, useContext, useEffect, useState} from 'react';
import {Box, Typography} from "@mui/material";
import {methods} from "../../api/methods";

import classes from "../../style/desks.module.css"
import {UserContext} from "../../Main";
import CreateDesk from "./CreateDesk";
import DeskList from "./DeskList";
import { useParams } from 'react-router-dom';


const Desks = () => {

    const {setIsFetching} = useContext(UserContext)

    const {id} = useParams()

    const [desks, setDesks] = useState([])

    const fetchDesk =  async () => {

        try {
            setIsFetching(true)

            const token =JSON.parse(localStorage.getItem("token")).accessToken
            const data = await methods.getDesk(token,id);
    
            setDesks(data.data)
        }
        catch(e) {
            console.error(e)
        }
        finally {
            setIsFetching(false)
        }
      
    }

    useEffect(() => {
        fetchDesk()
    }, []);

    return (
        <Box className={classes.desks} >
            <Typography mb={2} variant="h3">Desks:</Typography>

            <Fragment>
                    <DeskList desks={desks} setDesks={setDesks} />

                    <CreateDesk setDesks={setDesks} workspaceId={id}/>
            </Fragment>
            
        
        </Box>
    );
};

export default Desks;