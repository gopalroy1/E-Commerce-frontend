import { useState,useEffect } from "react";
import { useAuth } from "../UseContext/authContext";
import { Outlet } from "react-router-dom";
import BaseUrl from "../../Axios/BaseUrl";
import Spinner from "../Spinner";
export default function AdminRoute(){
    const [ok,setOk] = useState(false);
    const [auth,setAuth] = useAuth();
    
    useEffect(()=>{
        const authCheck = async ()=>{
            try {
                let url = `${process.env.REACT_APP_API}/user/admin`
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
            } catch (error) {
                console.log(error)
            }
        }
        if(auth?.token) authCheck()
    },[auth?.token]);
    return ok ? <Outlet/> : <Spinner path=""></Spinner>
}