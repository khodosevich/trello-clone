import React, {Fragment, useCallback, useContext, useEffect, useState} from "react";
import { UserContext } from "../Main";
import { useNavigate } from "react-router-dom"
import {jwtDecode} from 'jwt-decode';
import {methods} from "../api/methods";


const AuthGuard = (props) => {
    const { children } = props;

    const navigate = useNavigate()

    const {user, setUser} = useContext(UserContext)

    const [checked, setChecked] = useState(false);

    const check = useCallback(async () => {
        if (!localStorage.getItem("token")) {
            navigate("/")
            setUser(prev => {
                return {
                    ...prev,
                    isAuth: false
                }
            })
        } else {

            try{
                const user = jwtDecode(localStorage.getItem("token"));

                const token = JSON.parse(localStorage.getItem("token"))
    
                if (user.exp < Date.now() / 1000) {
                    const response = await methods.refresh(token.accessToken,token.refreshToken)
                    console.log("refresh " , response)
                    localStorage.setItem("token" , JSON.stringify(response.data))
    
                    const user = jwtDecode(localStorage.getItem("token"));
    
                    setChecked(true)
                    setUser(prev => {
                        return {
                            ...prev,
                            id: user.sid,
                            username: user.name,
                            aud: user.aud,
                            isAuth: true,
                            exp: user.exp
                        }
                    })
                }
    
                setChecked(true)
                setUser(prev => {
                    return {
                        ...prev,
                        id: user.sid,
                        username: user.name,
                        aud: user.aud,
                        isAuth: true,
                        exp: user.exp
                    }
                })

            }catch(e) {
                console.log(e)
            }
           
        }
    }, [user.isAuth]);

    useEffect(() => {
        check();
    }, [user.isAuth]);

    return <Fragment>{children}</Fragment>
}

export default AuthGuard;