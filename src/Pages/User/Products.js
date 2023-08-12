import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import { useSearch } from "../../Components/UseContext/SearchContext";
import Filters from "../../Components/Layout/Filters";
import { useCart } from "../../Components/UseContext/CartContext";
import toast from "react-hot-toast";
import BaseUrl from "../../Axios/BaseUrl";
import { useList } from "../../Components/UseContext/originalSearchList";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [searchList, setSearchList] = useSearch();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [originalList, setOriginalList] = useList();
  const [filterHide, setFilterHide] = useState("none");

  useEffect(() => {
    async function fetchProductList() {
      try {
        const url = `${process.env.REACT_APP_API}/products/getall`;
        const res = await BaseUrl.get(url);
        const list = res.data.productList;
        let arr = [...list];
        setSearchList({ ...searchList, searchedList: arr });
        setOriginalList(arr);
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
    <Layout title={"Products"}>
      <div className="filter-content-container">
        <div className="filter-desktop">
          <Filters></Filters>
        </div>

        <div className="pro-container">
          {searchList.searchedList &&
            searchList.searchedList?.map((element, i) => {
              return (
                <div key={i} className="pro-item">
                  <img onClick={()=>{navigate(`/product/${element._id}`);
                }} 
                    src={`${process.env.REACT_APP_API}/products/get/product-image/${element.slug}`}
                  ></img>
                  <h6 onClick={()=>{navigate(`/product/${element._id}`);
                    }} >{element?.name.substring(0, 30)}</h6>
                  <p onClick={()=>{navigate(`/product/${element._id}`);
                    }} >
                    Description: {element.description.substring(0, 40) + "..."}
                  </p >
                  <p onClick={()=>{navigate(`/product/${element._id}`);
                    }} >Price: {element.price}</p>
                  <div className="pro-item-btn-container">
                    <button
                      onClick={()=>{navigate(`/product/${element._id}`);
                    }} 
                      type="button"
                      class="btn btn-info"
                    >
                      More Details
                    </button>
                    <button
                      type="button"
                      class="btn btn-warning"
                      onClick={() => {
                        setCart([...cart, element]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, element])
                        );
                        toast.success("Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="mob-button-filter-container"  >
          <button
            type="button"
            class="btn btn-warning"
            onClick={() => {
              if (filterHide === "none") {
                setFilterHide("block");
              } else {
                setFilterHide("none");
              }
            }}
          >
            Filter
          </button>
          <div
            className="filter-mob-version"
            style={{ display: `${filterHide}` }}
          >
            <Filters></Filters>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
