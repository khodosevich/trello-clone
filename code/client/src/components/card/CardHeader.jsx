import React , {useState, useContext} from "react";
import { Box } from "@mui/material";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ClearIcon from '@mui/icons-material/Clear';
import { methods } from "../../api/methods";
import { UserContext } from "../../Main";


const CardHeader = ({column,setColumns}) => {

    const {setIsFetching} = useContext(UserContext)

    const [updateColumnName, setUpdateColumnName] = useState(false)

    const [editedColumnName,setEditedColumnName] = useState(column.name)

    const changeName = async () => {
        try{
            setIsFetching(true)
            const token =JSON.parse(localStorage.getItem("token")).accessToken
            const res = await methods.updateColumnName(token,column.id,editedColumnName)

        //     заменить текущее имя на новое

        }catch(e) {
            console.log(e)
        }finally{
            setIsFetching(false)
            setUpdateColumnName(false)
        }      
    }

    const deleteColumn = async () => {
        try{
            setIsFetching(true)
            const token =JSON.parse(localStorage.getItem("token")).accessToken
            const data = await methods.deleteColumn(token,column.id)
            setColumns(prev => prev.filter((item) => item.id !== column.id))
        }catch(e) {
            console.log(e)
        }finally{
            setIsFetching(false)
        }
    }


    return(
        <Box sx={{display:"flex",justifyContent:"space-between"}}>
                <Box sx={{display:"flex",justifyContent:"space-between" , gap:"10px" , margin:"10px"}}>

                    {
                        !updateColumnName &&  <Box>
                            {editedColumnName}
                        </Box>
                    }

                    {
                        updateColumnName && <input
                            value={editedColumnName}
                            onChange={(e) => setEditedColumnName(e.target.value)}
                            onBlur={changeName}
                            style={{
                                borderRadius:"20px",
                                border:"0",
                                outline:"0",
                                padding:"5px"
                            }}
                            type="text"/>
                    }

                    <Box onClick={() => setUpdateColumnName(true)} sx={{cursor:"pointer"}}>
                        <DriveFileRenameOutlineIcon/>
                    </Box>
                </Box>
                <Box>
                    <ClearIcon onClick={deleteColumn} style={{width:"20px",height:"20px", cursor:"pointer"}}/>
                </Box>
            </Box>
    )

}

export default CardHeader;