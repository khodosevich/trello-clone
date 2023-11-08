import React, { useEffect, useState} from 'react';
import {Box} from "@mui/material";

import classes from "../style/workspace.module.css"
import SideBarBoards from "../components/SideBarBoards";
import {Routes, Route, useLocation} from "react-router-dom";
import Account from "../components/Account";
import {methods} from "../api/methods";
import NewWorkspace from "../components/workspace/NewWorkspace";

const Workspace = () => {

    const location = useLocation()

    const [currentWorkspace, setCurrentWorkspace] = useState({
        name:"dont use workspace"
    })

    const checkWorkspace = async () => {

        const current = location.pathname.substring(11)

        const token =JSON.parse(localStorage.getItem("token")).accessToken
        console.log(token)
        const data = await methods.getWorkSpaces(token)
        const workspaces = await data.data

        for (let i = 0; i < workspaces.length; i++) {
            if(workspaces[i].id === current) {
                setCurrentWorkspace(workspaces[i])
            }
        }
    }


    useEffect(()=>{
        checkWorkspace()
    },[location])

    return (
        <Box className={classes.content}>
            <Box className={classes.container}>
                <Box className={classes.title}>
                    {
                        `Current workspace: ${currentWorkspace.name}`
                    }
                </Box>
                <Box className={classes.boadrs}>

                    <SideBarBoards/>

                    <Routes>
                        <Route path="/account" element={<Account/>}/>
                        <Route path="/boards" element={<h2>boards</h2>}/>
                        <Route path="/messages" element={<h2>messages</h2>}/>
                        <Route path="/create" element={<NewWorkspace/>}/>
                    </Routes>
                </Box>
            </Box>
        </Box>
    );
};

export default Workspace;