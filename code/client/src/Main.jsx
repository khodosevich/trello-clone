import React from 'react';
import Home from "./pages/Home";
import {Box} from "@mui/material";
import {BrowserRouter, HashRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

import "./reset.css"
import Header from "./components/Header";

const Main = () => {
    return (
        <Box>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Box>
    );
};

export default Main;