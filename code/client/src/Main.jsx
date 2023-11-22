import React, { useState} from 'react';
import Home from "./pages/Home";
import {Box, Typography} from "@mui/material";
import {Route, Routes, useLocation} from "react-router-dom";
import NotFound from "./pages/NotFound";

import "./style/reset.css"
import Header from "./components/Header";
import AuthPage from "./pages/AuthPage";
import Footer from "./components/Footer";
import Workspace from "./pages/Workspace";
import AuthGuard from "./components/AuthGuard";
import CircularIndeterminate from "./components/CircularIndeterminate";

export const UserContext = React.createContext()

const Main = () => {


    const [user, setUser] = useState({
        id: 0,
        username: "",
        aud:"",
        isAuth: false,
        exp: 0
    })

    const [isFetching, setIsFetching] = useState(false)

    const location = useLocation()
    const renderHeaderAndFooter = location.pathname !== "/register" &&  location.pathname !== "/login"

    return (
        <Box>
            {
                isFetching && <CircularIndeterminate/>
            }

            <UserContext.Provider value={{user,setUser,isFetching, setIsFetching}}>
                {renderHeaderAndFooter && <Header/>}
                <Box style={{ minHeight:"80vh"}}>
                    <AuthGuard>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/login" element={<AuthPage isExist={true}/>}/>
                            <Route path="/register" element={<AuthPage isExist={false}/>}/>
                            <Route path="*" element={<NotFound/>}/>

                            {
                                user.isAuth
                                    ? <Route path="/workspace/*" element={<Workspace />} />
                                    : <Route path="/workspace/*" element={<NotFound/>} />
                            }


                        </Routes>
                    </AuthGuard>
                </Box>
                {renderHeaderAndFooter && <Footer />}
            </UserContext.Provider>
        </Box>
    );
};

export default Main;