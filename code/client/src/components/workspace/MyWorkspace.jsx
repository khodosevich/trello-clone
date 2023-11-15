import React, {useEffect, useState} from 'react';
import {methods} from "../../api/methods";
import {Box, MenuItem} from "@mui/material";
import {NavLink} from "react-router-dom";
import close from "../../img/close.png";

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


    return (<Box ml={10} mt={6}>
            <h3>My workspaces:</h3>
            {
                workspaces.length !== null &&
                workspaces.map((item,index) => (
                    <Box key={index} sx={{display:"flex" , alignItems:"center" , width:"200px" , justifyContent:"space-between"}}>
                        <NavLink  to={"/workspace/" + item.id}>
                            <MenuItem>{item.name}</MenuItem>
                        </NavLink>
                        <img onClick={() => deleteWorkspace(item.id)} style={{width:"15px",height:"15px", cursor:"pointer"}} src={close} alt="close"/>
                    </Box>

                ))
            }

        </Box>
    );
};

export default MyWorkspace;