import React from 'react';
import {Box} from "@mui/material";

const CardProductivity = ({card}) => {
    return (
        <Box style={{
            background:"#FFF",
            maxWidth:"350px",
            padding:"15px",
            height:"100%",
            borderRadius:"20px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "box-shadow 0.3s"
        }}
             onMouseEnter={(e) => {
                 e.currentTarget.style.boxShadow = "0px 8px 16px rgba(0, 0, 0, 0.2)";
             }}
             onMouseLeave={(e) => {
                 e.currentTarget.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)";
             }}
        >
            <h3>
                {card.title}
            </h3>
            <p>
                {card.subtitle}
            </p>
        </Box>
    );
};

export default CardProductivity;