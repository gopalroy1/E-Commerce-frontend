import React,{useState} from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from '../../Components/Layout/UserMenu'
import { useAuth } from '../../Components/UseContext/authContext'
import { Modal } from 'antd';
import BaseUrl from '../../Axios/BaseUrl';
import { toast } from 'react-hot-toast';
import { json } from 'react-router-dom';

const Profile = () => {
    const [auth,setAuth] =useAuth();
    const [profileVisible,setProfileVisible] =useState(false);
    const [name,setName] = useState(auth?.user?.name)
    const [phone,setPhone] = useState(auth?.user?.phone)
    const [address,setAddress] = useState(auth?.user?.address)
    const [email,setEmail] = useState(auth?.user?.email)
    const [error,setError] = useState(null)
    async function handleUpdate(e){
        e.preventDefault();
        
        try {
            setError(null);
            if(!name || !phone || !email || !address){
                setError("Please provide all the details");
                return;
            }
            const url = `http://localhost:3005/api/user/update`;
            const reqBody = {
                name:name,
                phone:phone,
                email:email,
                address:address,
                id:auth.user._id
            }
            const au={
                headers:{
                    Authorization:auth.token
                }
            }
            const res = await BaseUrl.put(url,reqBody,au);
            if(res.data.status){
                localStorage.setItem('auth',JSON.stringify({...auth,user:res.data.user}))
                setAuth({...auth,user:res.data.user});
                setProfileVisible(false);
                toast.success(res.data.message);
            }
            
        } catch (error) {
            console.log(auth.token,name,email,phone,address,auth.user._id)
            console.log("Error while updating the profile and it is : ",error.response.data)
        }
    }
  return (
    <Layout title={"your profile"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu></UserMenu>
          </div>
          <div className="col-md-9">
            <h1 className="display-3 text-center">Profile</h1>
            <div className="profile-view">
              <h1 className="display-6">Name: </h1>
              <p>{auth.user.name}</p>
            </div>
            <div className="profile-view">
              <h1 className="display-6">Phone: </h1>
              <p>{auth.user.phone}</p>
            </div>
            <div className="profile-view">
              <h1 className="display-6">Email: </h1>
              <p>{auth.user.email}</p>
            </div>
            <div className="profile-view">
              <h1 className="display-6">Address: </h1>
              <p>{auth.user.address}</p>
            </div>
            <button
              onClick={() => {
                setProfileVisible(true);
              }}
              type="button"
              class="btn btn-outline-info "
            >
              Edit Profile
            </button>
          </div>
        </div>
        <Modal
          visible={profileVisible}
          onCancel={() => {
            setProfileVisible(false);
          }}
          footer={null}
        >
           

          <form className="row g-3 needs-validation" noValidate>
            <div className="col-md-4">
              <label htmlFor="validationCustom01" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="validationCustom01"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
              />
            
            </div>
            <div className="col-md-4">
              <label htmlFor="validationCustom01" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="validationCustom01"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
              />
            
            </div>
            <div className="col-md-4">
              <label htmlFor="validationCustom01" className="form-label">
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                id="validationCustom01"
                value={phone}
                onChange={(e)=>{setPhone(e.target.value)}}
              />
            
            </div>
            <div className="col-md-4">
              <label htmlFor="validationCustom01" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="validationCustom01"
                value={address}
                onChange={(e)=>{setAddress(e.target.value)}}
              />
            
            </div>
            <div className="col-12">
              <label>{error}</label>
              <button onClick={handleUpdate} className="btn btn-primary" type="submit"> 
                Update Changes
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </Layout>
  );
}

export default Profile