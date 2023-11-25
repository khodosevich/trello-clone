import React from "react";
import { Box } from "@mui/material";
import Column from "./Column";

const ColumnList = ({columns,setColumns}) => {

    console.log(columns)

    return (
        <Box sx={{display:"flex", flexDirection:"row", gap:"20px", flexWrap:"wrap",justifyContent:"center",alignItem:"center"}}>
            {
                columns.map((item) => (
                    <Box
                        key={item.id}
                        sx={{
                            background:"black",
                            width:"310px",
                            color:"white",
                            padding:"20px 25px",
                            height:"100%",
                            borderRadius:"20px"
                        }} >
                            <Column setColumns={setColumns} column={item}/>
                         </Box>
                      ))
                }
        </Box>
    )
}

export default ColumnList;