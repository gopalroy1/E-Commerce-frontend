import React,{useState,useEffect} from 'react'
import Layout from '../../Components/Layout/Layout'

const Products = () => {
    const [productList,setProductList] = useState([]);

    //Use Effect for fetching product for the first time
  return (
    <Layout title={"Products"}>
        <div className='prod-container'></div>
        <div className='pro-item'>
            
        </div>
    </Layout>
  )
}

export default Products