import React from 'react'
import Layout from '../../Components/Layout/Layout';
import AdminMenu from '../../Components/Layout/AdminMenu';

const CreateProducts = () => {
  return (
    <Layout title={"Products"}>
<div className='container-fluid m-3 p-3'>
    <div className='row'>
        <div className='col-md-3'></div>
        <AdminMenu></AdminMenu>
        <div className='col-md-9'>
            <h1>Create products</h1>

        </div>
    </div>
    </div>
</Layout>
  )
}

export default CreateProducts;