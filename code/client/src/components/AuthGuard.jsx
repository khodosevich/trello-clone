import React, {Fragment, useCallback, useContext, useEffect, useState} from "react";
import { UserContext } from "../Main";
import { useNavigate } from "react-router-dom"
import {jwtDecode} from 'jwt-decode';


const AuthGuard = (props) => {
    const { children } = props;

    const navigate = useNavigate()

    const {user, setUser} = useContext(UserContext)

    const [checked, setChecked] = useState(false);

    const check = useCallback(() => {
        if (!localStorage.getItem("token")) {
            navigate("/")
            setUser(prev => {
                return {
                    ...prev,
                    isAuth: false
                }
            })
        }
        else {
            const user = jwtDecode(localStorage.getItem("token"));

            setChecked(true)
            setUser(prev => {
                return {
                    ...prev,
                    id: user.sid,
                    username: user.name,
                    aud:user.aud,
                    isAuth: true,
                }
            })
        }
    }, [user.isAuth]);

    useEffect(() => {
        check();
    }, [user.isAuth]);

    return <Fragment>{children}</Fragment>
}

export default AuthGuard;