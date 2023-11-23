import React, {useEffect, useState} from 'react';
import {methods} from "../../api/methods";
import {Box, MenuItem, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';

import classes from '../../style/workspace.module.css'

const MyWorkspace = () => {

    const [workspaces, setWorkspaces] = useState([])

    const fetchData = async () => {
        const token =JSON.parse(localStorage.getItem("token")).accessToken
        const data = await methods.getWorkSpaces(token)
        setWorkspaces(data.data)
    }

    const [updateWorkspace, setUpdateWorkspace] = useState(false)

    const deleteWorkspace = async (workspaceId) => {
        const token =JSON.parse(localStorage.getItem("token")).accessToken
        const data = await methods.deleteWorkspace(token,workspaceId)
        console.log(data)
        setUpdateWorkspace(!updateWorkspace)
    }

    useEffect(() => {
        fetchData()
    }, [updateWorkspace]);


    return (<Box className={classes.myspace}>
                <Typography mb={2} variant={"h3"}>My workspaces:</Typography>

                <Box>

                    {
                        workspaces.length !== null &&
                        workspaces.map((item,index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap:"10px"
                            }}
                            >
                                <Box>
                                    <NavLink to={"/workspace/" + item.id} style={{ textDecoration: 'none' }}>
                                        <Box
                                            sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            width: "200px",
                                            justifyContent: "space-between",
                                            padding: '8px',
                                            '&:hover': {
                                                backgroundColor: '#f5f5f5',
                                            },
                                        }}>
                                            <MenuItem sx={{ padding: 0 , color:"#1e1e1e"}}>{item.name}</MenuItem>
                                        </Box>
                                    </NavLink>
                                </Box>
                                <Box>
                                    <CloseIcon
                                        onClick={() => deleteWorkspace(item.id)}
                                        style={{ width: "15px", height: "15px", cursor: "pointer" }}
                                    />
                                </Box>
                            </Box>
                                ))
                    }

                </Box>
        </Box>
    );
};

export default MyWorkspace;