import React from 'react';
import Home from "./pages/Home";
import {Box} from "@mui/material";
import { Route, Routes} from "react-router-dom";
import NotFound from "./pages/NotFound";

import "./style/reset.css"
import Header from "./components/Header";
import AuthPage from "./pages/AuthPage";

const Main = () => {
    return (
        <Box>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<AuthPage isExist={true}/>}/>
                <Route path="/register" element={<AuthPage isExist={false}/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Box>
    );
};

export default Main;