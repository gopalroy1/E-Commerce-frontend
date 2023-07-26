import React,{useState,useEffect} from "react";
import { useNavigate,useLocation } from "react-router-dom";


const Spinner = ({path="login"}) => {
    const [count,setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(()=>{
        const interval = setInterval(()=>{

            let newCount = count-1;
            setCount(newCount);
        },1000);
        if(count ===0 ){
            clearInterval(interval);
            navigate(`/${path}`,{
                state:location.pathname
            });
            return;
        }
        
    },[count,navigate.location,path])
  return (
    <>
      <div
        class="d-flex justify-content-center align-items-center "
        style={{ height: "100vh" }}>
            <h1>Please login first Redirecting you in {count} seconds</h1>
            
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
