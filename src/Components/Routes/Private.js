import { useState,useEffect } from "react";
import { useAuth } from "../UseContext/authContext";
import { Outlet } from "react-router-dom";
import BaseUrl from "../../Axios/BaseUrl";
import Spinner from "../Spinner";
export default function PrivateRoute(){
    const [ok,setOk] = useState(false);
    const [auth,setAuth] = useAuth();
    
    useEffect(()=>{
        const authCheck = async ()=>{
            let url = 'http://localhost:3005/api/user/auth'
            const res = await BaseUrl.get(url,{
                headers:{
                    'Authorization': auth.token
            }
        });
            if(res){
                setOk(true);
            }
            else{
                setOk(false);
            }
        }
        if(auth?.token) authCheck()
    },[auth?.token]);
    return ok ? <Outlet/> : <Spinner></Spinner>
}