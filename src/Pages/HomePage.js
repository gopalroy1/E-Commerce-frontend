import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import { useAuth } from "../Components/UseContext/authContext";
import BaseUrl from "../Axios/BaseUrl";
import Filters from "../Components/Layout/Filters";
import { useCart } from "../Components/UseContext/CartContext.js";
import  toast  from "react-hot-toast";


const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [cart,setCart] = useCart();
  const [product, SetProduct] = useState();

  useEffect(() => {
    async function fetchProductList() {
      try {
        const url = `${process.env.REACT_APP_API}/products/getall`;
        const res = await BaseUrl.get(url);
        const list = res.data.product;
        SetProduct(list);
      } catch (error) {
        console.log(
          "Error happend while fetching all products error is : ",
          error
        );
        return;
      }
    }
    fetchProductList();
  }, []);
  return (
    <Layout title={"Home"}>
      <div className="filter-content-container">
        
        <div className="pro-container">
          {product &&
            product?.map((element) => {
              return (
                <div className="pro-item">
                  <img 
                    src={`${process.env.REACT_APP_API}/products/get/product-image/${element.slug}`}
                  ></img>

                  <h6>{element?.name.substring(0, 30)}</h6>
                  <p>
                    Description: {element.description.substring(0, 40) + "..."}
                  </p>
                  <p>Price: {element.price}</p>
                  <div className="pro-item-btn-container">
                    <button type="button" class="btn btn-info">More Details</button>
                    <button  type="button" class="btn btn-warning" onClick={()=>{
                     
                      setCart([...cart,element]);
                      localStorage.setItem('cart',JSON.stringify([...cart,element]))
                      toast.success("Added to cart");
                    }}>ADD TO CART</button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
