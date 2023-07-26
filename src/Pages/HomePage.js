import React from 'react'
import Layout from '../Components/Layout/Layout'
import { useAuth } from '../Components/UseContext/authContext'

const HomePage = () => {
  const [auth,setAuth]=useAuth();
  return (
    <Layout title={"Home"}>
        
        <div>HomePage</div>
        <pre>{JSON.stringify(auth,null,4)}</pre>
    </Layout>
  )
}

export default HomePage