import React, {useState} from 'react';
import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {methods} from "../../api/methods";

import classes from "../../style/desks.module.css"

const NewWorkspace = () => {

    const [formData, setFormData] = useState({
        name: '',
        type: 'public', // По умолчанию - открытое рабочее пространство
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token =JSON.parse(localStorage.getItem("token")).accessToken
        console.log(token)

        const data = await methods.createWorkspace(token,formData.name,formData.type)

        alert(data.status)
        console.log(data)
    };

    return (<Box className={classes.newWorkspace}>
            <form onSubmit={handleSubmit}>
                <Box sx={{width:"290px"}}>
                    <TextField
                        fullWidth
                        label="Название рабочего пространства"
                        variant="outlined"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </Box>
                <Box sx={{width:"290px"}} mt={2}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel>Тип рабочего пространства</InputLabel>
                        <Select
                            label="Тип рабочего пространства"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="public">Открытое</MenuItem>
                            <MenuItem value="private">Закрытое</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box mt={2}>
                    <Button type="submit" variant="contained" color="primary">
                        Создать
                    </Button>
                </Box>
            </form>
    </Box>

    );
};

export default NewWorkspace;