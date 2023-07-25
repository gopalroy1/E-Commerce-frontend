import React,{useState} from 'react'
import  toast  from 'react-hot-toast';
import BaseUrl from '../../Axios/BaseUrl';
import { useAuth } from '../../Components/context';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  let url = "http://localhost:3005/api/user/login";

  const [auth,setAuth] = useAuth();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");


  async function handleLogIn(e){
    e.preventDefault();
    console.log("chala log in")
    const inputText = input;
    if(!inputText || !password){
      toast.error("Enter valid details");
      return;

    }
    if(inputText.includes("@")){
      console.log("aaya email me")
      try {
        let res = await BaseUrl.post(url,{
          email:input,
          password:password
        });
        // let da = await res.parse();
        setAuth({...auth,user:res.data.user,token:res.data.token})
        console.log(res);
        localStorage.setItem('auth:',JSON.stringify(res.data));
        navigate("/")
        
      } catch (error) {
        console.log(error)
        
      }
    }
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
        navigate("/")
        
      } catch (error) {
        console.log(error)
        
      }
    }
  }


  return (
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
  <button onClick={handleLogIn} type="submit" className="btn btn-primary">Submit</button>
</form>

    </div>
  )
}

export default Login;