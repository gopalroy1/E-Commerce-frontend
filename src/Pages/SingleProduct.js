import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import BaseUrl from "../Axios/BaseUrl";
import { useCart } from "../Components/UseContext/CartContext";
import toast  from "react-hot-toast";

const SingleProduct = () => {
  const [product, setProduct] = useState(null);
  const param = useParams();
  const [cart,setCart] = useCart();

  useEffect(() => {
    async function getProduct() {
      try {
        const id = param.id;
        let url = `${process.env.REACT_APP_API}/products/get/${id}`;
        let res = await BaseUrl.get(url);
        let pro = res.data.product;
        setProduct(pro);
      } catch (error) {
        console.log("Error while fetching the product is ", error);
      }
    }
    getProduct();
  }, []);
  return (
    <Layout>
      {product && (
        <div className="SingleProduct">
          <div className="img-price-container">
            <img
              src={`${process.env.REACT_APP_API}/products/get/product-image/${product.slug}`}
            ></img>
            <div style={{display:"flex",gap:"40px",marginTop:"20px",marginLeft:"10px"}}>
            <button
                      type="button"
                      class="btn btn-warning"
                      onClick={() => {
                        setCart([...cart, product]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, product])
                        );
                        toast.success("Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                <button  type="button" class="btn btn-success">Buy now</button>
            </div>
          </div>
          <div className="single-pro-right-content" >
            <h1  class="display-4">{product.name}</h1>
            <p style={{color:"green"}}>Special price </p>
            <p>{product.price} Rs</p>
            <p  class="fw-light">{product.description}</p>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default SingleProduct;
