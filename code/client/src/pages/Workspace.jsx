import React, { useEffect, useState} from 'react';
import {Box} from "@mui/material";

import classes from "../style/workspace.module.css"
import SideBarBoards from "../components/SideBarBoards";
import {Routes, Route, useLocation} from "react-router-dom";
import Account from "../components/Account";
import {methods} from "../api/methods";
import NewWorkspace from "../components/workspace/NewWorkspace";
import Desks from "../components/desk/Desks";
import DeskElement from "../components/desk/DeskElement";

export const DeskContext = React.createContext()

const Workspace = () => {

    const location = useLocation()

    const [currentWorkspace, setCurrentWorkspace] = useState({name:"dont used workspace"})

    const checkWorkspace = async () => {

        const current = location.pathname.substring(11)

        const token =JSON.parse(localStorage.getItem("token")).accessToken
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

                    <DeskContext.Provider value={{currentWorkspace,setCurrentWorkspace}}>
                        <SideBarBoards/>

                        <Routes>
                            <Route path="/account" element={<Account/>}/>
                            <Route path="/desks" element={<Desks />}/>

                            <Route path="/desks/:id" element={<DeskElement />}/>
                            <Route path="/messages" element={<h2>messages</h2>}/>
                            <Route path="/create" element={<NewWorkspace/>}/>
                        </Routes>
                    </DeskContext.Provider>

                </Box>
            </Box>
        </Box>
    );
};

export default Workspace;