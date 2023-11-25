import React , {useState, useContext} from "react";
import { Box } from "@mui/material";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ClearIcon from '@mui/icons-material/Clear';
import { methods } from "../../api/methods";
import { UserContext } from "../../Main";
import EditColumnName from "../column/EditColumnName";


const ColumnHeader = ({column,setColumns}) => {

    console.log(column)
    const {setIsFetching} = useContext(UserContext)

    const [editedColumnName,setEditedColumnName] = useState(column.name)

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
        }      
    }

    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return(
        <Box sx={{display:"flex",justifyContent:"space-between"}}>
                <Box sx={{display:"flex",justifyContent:"space-between" , gap:"10px" , margin:"10px"}}>

                    <EditColumnName setColumns={setColumns} id={column.id} openModal={openModal} handleCloseModal={handleCloseModal}/>

                    <Box onClick={handleOpenModal} sx={{cursor:"pointer"}}>
                        {column.name}
                    </Box>

                </Box>
                <Box>
                    <ClearIcon onClick={deleteColumn} style={{width:"20px",height:"20px", cursor:"pointer"}}/>
                </Box>
            </Box>
    )

}

export default ColumnHeader;