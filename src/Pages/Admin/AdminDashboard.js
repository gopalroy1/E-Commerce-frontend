import React from 'react'
import Layout from '../../Components/Layout/Layout.js'
import AdminMenu from '../../Components/Layout/AdminMenu';
import { useAuth } from '../../Components/UseContext/authContext.js';

const AdminDashboard = () => {
    const [auth,setAuth] = useAuth();
  return (
    <Layout>
        <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu></AdminMenu>
                </div>
                <div className='col-md-9'>
                    <div className='cardm w-75 p-3'>
                        <h1>Name: {auth?.user?.name}</h1>
                        <h1>Email: {auth?.user?.email}</h1>
                        <h1>Phone: {auth?.user?.phone}</h1>
                    </div>
                </div>
            </div>
        </div>

        
    </Layout>
  )
}

export default AdminDashboard;