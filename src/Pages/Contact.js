import React from 'react'
import Layout from '../Components/Layout/Layout'
import customerSuppImg from "../images/customer-support-footer.jpg"

const Contact = () => {
  return (
    <Layout title={"contact-us"}>

        <div className='contact-page'>
          <div className='contact'>
            <img src={customerSuppImg} ></img>
            <div>
              <h1>CONTACT US</h1>
              <p>For any query related to product feel free to contact us anytime</p>
              <p>📧 contact@websitename.com</p>
              <p>📞 989786856 </p>
              
            </div>
          </div>
         
        </div>
    </Layout>
  )
}

export default Contact