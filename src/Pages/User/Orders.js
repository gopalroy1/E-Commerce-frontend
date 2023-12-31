import React from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from '../../Components/Layout/UserMenu'

const Orders = () => {
  return (
    <Layout title={"your orders"}>
    <div className='container-fluid p-3 m-3'>
        <div className='row'>
            <div className='col-md-3' >
                <UserMenu></UserMenu>
            </div>
            <div className='col-md-9' >
                <h1>Orders</h1>
            </div>

        </div>
    </div>
</Layout>
  )
}

export default Orders