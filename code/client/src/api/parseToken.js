import {jwtDecode} from "jwt-decode";


export const parseToken = (token) => {
    const decode = jwtDecode(token)
    return decode;
}