import React from 'react';
import {Box} from "@mui/material";

const CardAction = ({card}) => {
    return (
        <Box style={{
            width:"310px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            display: "block",
            flex:"0 0 auto",
            borderRadius:"20px",
            transition: "box-shadow 0.3s"
        }}
             onMouseEnter={(e) => {
                 e.currentTarget.style.boxShadow = "0px 8px 16px rgba(0, 0, 0, 0.2)";
             }}
             onMouseLeave={(e) => {
                 e.currentTarget.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)";
             }}
        >
            <Box style={{height:"50px" , borderRadius:"20px 20px 0 0 " , background:card.color}}>
            </Box>
            <Box style={{background:"#fff" , padding:"5px",marginTop:"-20px" , maxWidth:"48px", maxHeight:"48px",borderRadius:"5px" , marginLeft:"20px"}}>
                <img style={{ width:"35px", height:"35px"}} src={card.url} alt=""/>
            </Box>
            <Box style={{
                padding:"26px 0 10px 24px"
            }}>

                <h3>
                    {
                        card.title
                    }
                </h3>
                <p style={{maxWidth:"300px" , marginTop:"10px"}}>
                    {card.subtitle}
                </p>
            </Box>
        </Box>
    );
};

export default CardAction;