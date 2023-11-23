import React, {useContext, useState} from 'react';
import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {methods} from "../../api/methods";
import {UserContext} from "../../Main";

const CreateDesk = ({workspaceId,setDesks}) => {

    const {setIsFetching} = useContext(UserContext)

    const [createDesk, setCreateDesk] = useState(false)

    const [deskData, setDeskData] = useState({
        name: "",
        visibilityTypeCode: "Public",
        workSpaceId: workspaceId
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDeskData({ ...deskData, [name]: value });
    };

    const newDeskHandler = async () => {
        try {
            setIsFetching(true)
            const token =JSON.parse(localStorage.getItem("token")).accessToken
            const response = await methods.createDesk(token,deskData)        
            setDesks( prev => [...prev, response.data])
        }catch(e) {
            console.log(e)
        }finally {
            setIsFetching(false)
            setCreateDesk(false)
        }   
    }

    return (
        <Box mt={5}>
            <Button onClick={ () => setCreateDesk(true)} variant="contained">Create a desk</Button>

            {
                createDesk &&

                <Box sx={{minWidth:"290px",maxWidth:"500px", background:"#dcdcdc", borderRadius:"20px", padding:"20px" }} mt={2}>
                    <TextField style={{
                        marginBottom:"40px"
                    }}
                               fullWidth
                               onChange={(e)=>    setDeskData({ ...deskData,  name:e.target.value })}
                               id="outlined-basic"
                               label="Desk name"
                               variant="outlined"
                    />
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel>Тип рабочего пространства</InputLabel>
                        <Select
                            label="Тип рабочего пространства"
                            name="visibilityTypeCode"
                            onChange={handleChange}
                            value={deskData.visibilityTypeCode}
                            required
                        >
                            <MenuItem value="Public">Открытое</MenuItem>
                            <MenuItem value="Private">Закрытое</MenuItem>
                        </Select>
                    </FormControl>
                    <Box sx={{
                        display:"flex",
                        gap:"20px",
                        marginTop:"40px"
                    }}>
                        <Button onClick={newDeskHandler} variant="contained">Create</Button>
                        <Button onClick={ () => setCreateDesk(false)} variant="outlined" color="error">
                            Cancel
                        </Button>
                    </Box>

                </Box>
            }
        </Box>
    );
};

export default CreateDesk;