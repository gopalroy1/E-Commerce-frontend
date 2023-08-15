import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useList } from './UseContext/originalSearchList';
import { useSearch } from './UseContext/SearchContext';
import BaseUrl from '../Axios/BaseUrl';


const FeatureProducts = (props) => {
  const productList = props.productList;
  const [searchList,setSearchList] = useSearch();
  const navigate = useNavigate();
  const [originalList,setOriginalList] = useList();
  return (
    <div className="feature">
          <div id="feature-product-container">
            <div id="feature-heading">
              <h4 >{props.heading}</h4>
              <button type="button" class="btn btn-primary" onClick={async(e)=>{
                const urlNew = props.url;
                const res = await BaseUrl.get(urlNew);
                let arr = res.data.productList;
                setSearchList({...searchList,searchedList:arr});
                setOriginalList(arr);
                console.log(arr);
                navigate("/products");
                
              }}>
                
                View All
              </button>
            </div>
              <button id="right-feature-btn">&lt;</button>
            <div id="all-feature-products">
              {productList &&
                productList.map((element) => {
                  return (
                    <div className="feature-product-items">
                      <img
                        src={`${process.env.REACT_APP_API}/products/get/product-image/${element.slug}`}
                      ></img>
                      <p  class="text-center" >{element.name.substring(0, 10)}</p>
                      <p  class="text-center">{props.deals}</p>
                    </div>
                  );
                })}
            </div>
            <button id="left-feature-btn">&gt;</button>
          </div>
        </div>
  )
}

export default FeatureProducts;