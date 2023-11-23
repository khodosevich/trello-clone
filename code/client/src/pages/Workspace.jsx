import React, {useContext, useEffect, useState} from 'react';
import {Box} from "@mui/material";

import classes from "../style/workspace.module.css"
import SideBarBoards from "../components/SideBarBoards";
import {Routes, Route, useLocation} from "react-router-dom";
import Account from "../components/Account";
import {methods} from "../api/methods";
import NewWorkspace from "../components/workspace/NewWorkspace";
import Desks from "../components/desk/Desks";
import DeskElement from "../components/desk/DeskElement";
import MyWorkspace from "../components/workspace/MyWorkspace";
import {UserContext} from "../Main";

export const DeskContext = React.createContext()

const Workspace = () => {

    const location = useLocation()
    const {setIsFetching} = useContext(UserContext)

    const [currentWorkspace, setCurrentWorkspace] = useState({name:"dont used workspace"})

    const [currentDeskData,setCurrentDeskData] = useState({
        name: "",
        visibilityTypeCode: "",
        workSpaceId: ""
    })

    const checkWorkspace = async () => {

        const current = location.pathname.substring(11)

        try {
            setIsFetching(true)
            const token =JSON.parse(localStorage.getItem("token")).accessToken
            const data = await methods.getWorkSpaces(token)
            const workspaces = await data.data


            for (let i = 0; i < workspaces.length; i++) {
                if(workspaces[i].id === current) {
                    setCurrentWorkspace(workspaces[i])
                }
            }
        } catch (e) {
            console.log(e)
        } finally {
            setIsFetching(false)
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

                    <DeskContext.Provider value={{currentWorkspace,setCurrentWorkspace,currentDeskData,setCurrentDeskData}}>
                        <SideBarBoards/>


                        <Routes>
                            <Route path="/account" element={<Account/>}/>
                            <Route path=":id" element={<Desks />} />
                            <Route path=":id/:deskId" element={<DeskElement />} />

                            <Route path="/messages" element={<h2>messages</h2>}/>
                            <Route path="/create" element={<NewWorkspace/>}/>
                            <Route path="/myspace" element={<MyWorkspace/>}/>
                        </Routes>
                    </DeskContext.Provider>

                </Box>
            </Box>
        </Box>
    );
};

export default Workspace;