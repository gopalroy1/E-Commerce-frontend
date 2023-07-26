import { useState,useEffect,useContext,createContext } from "react";
import BaseUrl from "../../Axios/BaseUrl";
import axios from "axios";

//Created context
const AuthContext = createContext();


//Arrow function for making state 
const AuthProvider =({children})=>{
    const [auth,setAuth] = useState({
        user:null,
        token:"",
    })

    //Default axios
    
    useEffect(()=>{
        const data = localStorage.getItem('auth');
        if(data){
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                user:parseData.user,
                token:parseData.token
            })
        }
        // remove this line: eslint-diable-next-line
    },[])
    return(
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

//costom hook
const useAuth=()=>
    useContext(AuthContext)

export {useAuth,AuthProvider}

