import React, { useState} from 'react';
import Home from "./pages/Home";
import {Box} from "@mui/material";
import {Route, Routes, useLocation} from "react-router-dom";
import NotFound from "./pages/NotFound";

import "./style/reset.css"
import Header from "./components/Header";
import AuthPage from "./pages/AuthPage";
import Footer from "./components/Footer";
import Workspace from "./pages/Workspace";
import AuthGuard from "./components/AuthGuard";

export const UserContext = React.createContext()

const Main = () => {

    const logout = () => {
        localStorage.removeItem("token")
        setUser({
            id: 0,
            username: "",
            aud:"",
            isAuth: false,
        })
    }

    const [user, setUser] = useState({
        id: 0,
        username: "",
        aud:"",
        isAuth: false,
        exp: 0
    })


    const location = useLocation()
    const renderHeaderAndFooter = location.pathname !== "/register" &&  location.pathname !== "/login"

    return (
        <Box>
            <UserContext.Provider value={{user,setUser}}>
                {renderHeaderAndFooter && <Header/>}
                <Box style={{ minHeight:"80vh"}}>
                    <AuthGuard>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/login" element={<AuthPage isExist={true}/>}/>
                            <Route path="/register" element={<AuthPage isExist={false}/>}/>
                            <Route path="*" element={<NotFound/>}/>

                            <Route path="/workspace/*" element={<Workspace />} />

                        </Routes>
                    </AuthGuard>
                </Box>
                {renderHeaderAndFooter && <Footer />}
            </UserContext.Provider>
        </Box>
    );
};

export default Main;