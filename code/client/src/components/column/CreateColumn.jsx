import React, { Fragment, useContext, useState } from "react";
import { Box , Button , TextField} from "@mui/material";
import { UserContext } from "../../Main";
import { methods } from "../../api/methods";

const CreateColumn = ({setColumns,deskId}) => {

    const {setIsFetching} = useContext(UserContext)
    
    const [createColumn, setCreateColumn] = useState(false)

    const [columnData, setColumnData] = useState({
        columnName: "",
        deskId: deskId
    });

    const createNewColumn = async () => {
        try {
            setIsFetching(true)
            const token =JSON.parse(localStorage.getItem("token")).accessToken
            const response = await methods.createColumn(token,columnData)

            setColumns( prev => [...prev,response.data])

        } catch (e) {
            console.log(e)
        } finally {
            setIsFetching(false)
            setCreateColumn(false)
        }
    }

    return( 
        <Fragment>
           <Box mt={10} mb={10}>
                
                <Button onClick={ () => setCreateColumn(true)} variant="contained">Create a column</Button>

                {
                    createColumn &&  <Box sx={{minWidth:"290px",maxWidth:"500px", background:"#dcdcdc", borderRadius:"20px", padding:"20px" }} mt={2}>
                        <TextField
                            fullWidth
                            onChange={(e)=> setColumnData({ ...columnData,  columnName:e.target.value })}
                            id="outlined-basic"
                            label="Coulmn name"
                            variant="outlined"
                        />
                        <Box sx={{
                            display:"flex",
                            gap:"20px",
                            marginTop:"40px"
                        }}>
                            <Button onClick={createNewColumn} variant="contained">Create</Button>
                            <Button onClick={ () => setCreateColumn(false)} variant="outlined" color="error">
                                Cancel
                            </Button>
                        </Box>

                    </Box>
                }
            </Box>
        </Fragment>
    )

}

export default CreateColumn;