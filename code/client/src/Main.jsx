import React from 'react';
import Home from "./pages/Home";
import {Box} from "@mui/material";
import {Route, Routes, useLocation} from "react-router-dom";
import NotFound from "./pages/NotFound";

import "./style/reset.css"
import Header from "./components/Header";
import AuthPage from "./pages/AuthPage";
import Footer from "./components/Footer";
import Workspace from "./pages/Workspace";

const Main = () => {

    const location = useLocation()

    const renderHeaderAndFooter = location.pathname !== "/register" &&  location.pathname !== "/login"

    return (
        <Box>
            {renderHeaderAndFooter && <Header/>}
            <Box style={{ minHeight:"80vh"}}>
                <Routes >
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<AuthPage isExist={true}/>}/>
                    <Route path="/register" element={<AuthPage isExist={false}/>}/>
                    <Route path="/workspace/*" element={<Workspace/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </Box>
            {renderHeaderAndFooter && <Footer />}
        </Box>
    );
};

export default Main;