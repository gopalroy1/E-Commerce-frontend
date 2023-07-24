import React from 'react'
import Layout from '../Components/Layout/Layout'

const PageNotFound = () => {
  return (
    <Layout>

        <div className='pagenotfound'>
          <h1>404</h1>
          <p>Oops ! Page Not Found</p>
          <button>Go Back</button>
        </div>
    </Layout>
  )
}

export default PageNotFound