import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Box, Typography} from "@mui/material";
import {methods} from "../../api/methods";
import Column from "../column/Column";

const DeskElement = () => {

    const {id} = useParams()

    const [columns, setColumns] = useState([])

    const fetchColumn = async () => {
        const token =JSON.parse(localStorage.getItem("token")).accessToken
        const data = await methods.getColumn(token,id)
        setColumns(data.data)
    }


    useEffect(() => {
        fetchColumn()
    }, []);

    return (
        <Box>
            <Typography variant="h6">Columns:</Typography>
            <Box sx={{
                display:"flex",
                justifyContent:"space-between",
                gap:"50px"
            }}>
                {
                    columns.map((item,index) => (
                        <Box>
                            <Box key={index} sx={{
                                background:"#836ed0",
                                width:"350px",
                                color:"white",
                                padding:"20px 30px"
                            }} >
                                <Column column={item}/>
                            </Box>
                        </Box>

                    ))
                }
            </Box>
        </Box>
    );
};

export default DeskElement;