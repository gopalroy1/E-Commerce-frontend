import React,{useEffect,useState} from 'react'
import Layout from '../../Components/Layout/Layout'
import { useAuth } from '../../Components/UseContext/authContext'
import UserMenu from '../../Components/Layout/UserMenu';

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard- Ecomm"}>

        <div className='container-fluid p-3 m-3'>
            <div className='row'>
                <div className='col-md-3' >
                    <UserMenu></UserMenu>
                </div> 
                <div className='col-md-9' >
                    <div className='card 2-75 p-3'>

                      <h1>name:{auth?.user?.name}</h1>
                      <h1>Email:{auth?.user?.email}</h1>
                      <h1>Adress:{auth?.user?.address}</h1>
                      <h1>Your total order with us is ...</h1>
                    </div>
                </div>

            </div>
        </div>

    </Layout>
  )
}

export default Dashboard;