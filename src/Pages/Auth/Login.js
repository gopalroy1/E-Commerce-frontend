import React,{useState} from 'react'
import BaseUrl from '../../Axios/BaseUrl';
import { useAuth } from '../../Components/UseContext/authContext';
import { useNavigate,useLocation } from 'react-router-dom';
import Layout from '../../Components/Layout/Layout';
import  toast  from 'react-hot-toast';

const Login = () => {
  let url = `${process.env.REACT_APP_API}/user/login`;

  const [auth,setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");


  async function handleLogIn(e){
    e.preventDefault();
    const inputText = input;
    if(!inputText || !password){
      toast.error("Enter valid details");
      return;

    }
    //login via email

    if(inputText.includes("@")){
      try {
        let res = await BaseUrl.post(url,{
          email:input,
          password:password
        });
        console.log(res.data);
        // let da = await res.parse();
        setAuth({...auth,user:res.data.user,token:res.data.token}) 
        localStorage.setItem('auth',JSON.stringify(res.data));
        toast.success("Logged in ");
        navigate(location.state || "/")
        
      } catch (error) {
        console.log(error.response.data);
        toast.error("Log in failed")
        
      }
    }

    //Log in via phone
    else{
    
      try {
        let res = await BaseUrl.post(url,{
          phone:input,
          password:password
        });
        // let da = await res.parse();
        console.log(res);
        console.log(res);
        setAuth({...auth,user:res.data.user,token:res.data.token})
        toast.success("Logged in ");
        navigate("/")
        
      } catch (error) {
        console.log(error);
        toast.error("Log in failed")
        
      }
    }
  }


  return (
    <Layout>
       <div className='Login'>
      <form>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address or Phone</label>
    <input onChange={(e)=>setInput(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input onChange={(e)=>setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" />
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
    <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
  </div>
  <button onClick={handleLogIn} type="submit" className="btn btn-primary">Log in</button>
</form>

    </div>
    </Layout>
   
  )
}

export default Login;