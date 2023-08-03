import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import { useSearch } from "../../Components/UseContext/SearchContext";
import Filters from "../../Components/Layout/Filters";
import { useCart } from "../../Components/UseContext/CartContext";
import toast from "react-hot-toast";

const Products = () => {
  const [searchList, setSearchList] = useSearch();
  const [cart, setCart] = useCart();
  const [filterHide, setFilterHide] = useState("none");

  return (
    <Layout title={"Products"}>
      <button
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
      <div className="filter-content-container">
        <div className="filter-desktop">
          <Filters></Filters>
        </div>

        <div
          className="filter-mob-version"
          style={{ display: `${filterHide}` }}
        >
          <Filters></Filters>
        </div>
        <div className="pro-container">
          {searchList.searchedList &&
            searchList.searchedList?.map((element, i) => {
              return (
                <div key={i} className="pro-item">
                  <img
                    src={`${process.env.REACT_APP_API}/products/get/product-image/${element.slug}`}
                  ></img>

                  <h6>{element?.name.substring(0, 30)}</h6>
                  <p>
                    Description: {element.description.substring(0, 40) + "..."}
                  </p>
                  <p>Price: {element.price}</p>
                  <div className="pro-item-btn-container">
                    <button
                      onClick={() => {}}
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
      </div>
    </Layout>
  );
};

export default Products;
