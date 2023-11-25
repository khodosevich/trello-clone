import React ,{useContext , useState} from "react";
import { Modal , Fade ,Box, Typography , Button, TextField, FormControl, InputLabel, Select, MenuItem} from "@mui/material";
import { DeskContext } from "../../pages/Workspace";
import { methods } from "../../api/methods";



const EditDeskVisibilityTypeCode = ({typeOpenModal, setTypeOpenModal,currentType}) => {

     
    const { currentDeskData, setCurrentDeskData } = useContext(DeskContext);
    const [editedDeskVisibilityTypeCode, setEditedDeskVisibilityTypeCode] = useState(currentType);

    const handleChange = (e) => {
        const { value } = e.target;
        setEditedDeskVisibilityTypeCode(value);
    };


    const changeTypeHandler = async () => {

        try {
            const token = JSON.parse(localStorage.getItem("token")).accessToken;
            await methods.updateDeskVisibilityType(token, currentDeskData.deskId, editedDeskVisibilityTypeCode);
            setCurrentDeskData(prev => ({ ...prev, visibilityTypeCode: editedDeskVisibilityTypeCode}));
        } catch (e) {
            console.log(e);
        } finally {
            setTypeOpenModal(false)
        }
    };

    return (
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={typeOpenModal}
        onClose={() => setTypeOpenModal(false)}
        closeAfterTransition
    >
            <Fade in={typeOpenModal}>
                <Box sx={{ position: "absolute", display: "flex",flexDirection: "column",gap:"10px", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", padding: "20px", boxShadow: 24, p: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Update Visibility Type
                    </Typography>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel>Тип рабочего пространства</InputLabel>
                        <Select
                            label="Тип рабочего пространства"
                            name="visibilityTypeCode"
                            onChange={handleChange}
                            value={editedDeskVisibilityTypeCode}
                            required
                        >
                            <MenuItem value="Public">Открытое</MenuItem>
                            <MenuItem value="Private">Закрытое</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" onClick={changeTypeHandler}>
                        Update
                    </Button>
                </Box>
            </Fade>
       </Modal>
    );
};

export default EditDeskVisibilityTypeCode;