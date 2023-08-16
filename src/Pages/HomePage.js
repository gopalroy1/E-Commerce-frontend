import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import BaseUrl from "../Axios/BaseUrl";
import FeatureProducts from "../Components/FeatureProducts";
import { Navigate, useNavigate } from "react-router-dom";
import { useList } from "../Components/UseContext/originalSearchList";
import { useSearch } from "../Components/UseContext/SearchContext";

const HomePage = () => {
  const [productListOffers, setProductList] = useState();
  const [productTopClothes, setProductTopClothes] = useState();
  const [productTopBooks, setProductTopBooks] = useState();
  const navigate = useNavigate();
  const [originalList,setOriginalList] = useList();
  const [searchList,setSearchList] = useSearch();
  const categoryArr = [
    {
      link: `https://rukminim2.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100`,
      name: "Grocery",
    },
    {
      link: `https://rukminim2.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100`,
      name: "Mobiles",
    },
    {
      link: `https://rukminim2.flixcart.com/fk-p-flap/128/128/image/0d75b34f7d8fbcb3.png?q=100`,
      name: "Fashion",
    },
    {
      link: `https://rukminim2.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100`,
      name: "Electronics",
    },
    {
      link: `https://rukminim2.flixcart.com/flap/128/128/image/ab7e2b022a4587dd.jpg?q=100`,
      name: "Home & Furniture",
    },
    {
      link: `https://rukminim2.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png?q=100`,
      name: "Appliances",
    },
    {
      link: `https://rukminim2.flixcart.com/flap/128/128/image/71050627a56b4693.png?q=100`,
      name: "Travel",
    },
    {
      link: `https://rukminim2.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100`,
      name: "Beauty Toys & more",
    },
    {
      link: `https://rukminim2.flixcart.com/fk-p-flap/128/128/image/05d708653beff580.png?q=100`,
      name: "Two wheelers",
    },
  ];
  const sliderArr = [
    {
      link: `https://rukminim2.flixcart.com/fk-p-flap/844/140/image/c2d8527e77c55b8c.jpg?q=50`,
    },
    {link:`https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Shreyansh/BAU/Unrexc/D70978891_INWLD_BAU_Unrec_Uber_PC_Hero_3000x1200._CB594707876_.jpg`},
    {link:`https://rukminim2.flixcart.com/fk-p-flap/844/140/image/fe37d9750b067d16.jpg?q=50`},
    {
      link: `https://rukminim2.flixcart.com/fk-p-flap/844/140/image/41fac6f59554c679.jpg?q=50`,
    },
  ];
  const sliderMobArr = [
    {
      link: `https://rukminim2.flixcart.com/fk-p-flap/1200/550/image/0b23d7c39b1af56a.jpg?q=20`,
    },
    {link:`https://rukminim2.flixcart.com/fk-p-flap/1200/550/image/f96a9c98319f4740.png?q=20`},
    {link:`https://rukminim2.flixcart.com/fk-p-flap/1200/550/image/e5de2df8b1ae549d.jpg?q=20`},
    {
      link: `https://rukminim2.flixcart.com/fk-p-flap/1200/550/image/26a9d936fe448001.jpg?q=20`,
    },
  ];


  // function fun(){

  //   const timer = setInterval(() => {
  //     const slider = document.getElementById("all-slides-homepage");
  //     const a = slider.scrollLeft;
  //     console.log(a);
  //     if(slider.scrollLeft>=4500){
  //       console.log("true hua hai ");
  //       slider.scrollLeft=0;
  //     }
  //     else{
  //       const slider = document.getElementById("all-slides-homepage");
  //       slider.scrollLeft+=1536;
  //     }
  //   }, (10000));
  // }
  // fun();



  function slideRight(e) {
    const slider = document.getElementById("all-slides-homepage");
    slider.scrollLeft+=1536;
  }
  function sliderLeft(e) {
    const slider = document.getElementById("all-slides-homepage");
    slider.scrollBehaviour="smooth";
    slider.scrollLeft-=1536;
  }
  function slideRightMob(e) {
    const slider = document.getElementById("all-slider-homepage-mobile");
    slider.scrollLeft+=500;
  }
  function sliderLeftMob(e) {
    const slider = document.getElementById("all-slider-homepage-mobile");
    slider.scrollBehaviour="smooth";
    slider.scrollLeft-=500;
  }

  useEffect(() => {
    async function fetchProductList() {
      try {
        const url = `${process.env.REACT_APP_API}/products/getall`;
        const res = await BaseUrl.get(url);
        const list = res.data.productList;
        setProductList(list);
      } catch (error) {
        console.log(
          "Error happend while fetching all products error is : ",
          error
        );
        return;
      }
    }
    fetchProductList();
    async function fetchTopDeals() {
      try {
        //Search and set top deals 
        const urlNew = `${process.env.REACT_APP_API}/products/search/women`;
        const res = await BaseUrl.get(urlNew);
        let arr = res.data.productList;
        setProductTopClothes(arr);
        //Search and set top in clothes
        const urlNew2 = `${process.env.REACT_APP_API}/products/search/book`;
        const res2 = await BaseUrl.get(urlNew2);
        let arr2 = res2.data.productList;
        setProductTopBooks(arr2);

    } catch (error) {
        console.log("Error while fetching the search data ",error.response.data)
    }
    }
    fetchTopDeals();
  }, []);
  return (
    <Layout title={"Home"}>
      {/* Creating top categories in homepage  */}
      <div className="">
        <div className="home-category-container">
          {categoryArr &&
            categoryArr.map((element, i) => {
              return (
                <div key={i} onClick={async()=>{
                 try {
                  const urlNew = `${process.env.REACT_APP_API}/products/search/${element.name}`;
                  const res = await BaseUrl.get(urlNew);
                  let arr = res.data.productList;
                  setSearchList({ ...searchList, searchedList: arr });
                  setOriginalList(arr);
                  console.log(arr);
                  navigate("/products");
                  
                 } catch (error) {
                  console.log("Error while serching based on category ", error)
                 }
                }} >
                  <img src={element.link}></img>
                  <p>{element.name}</p>
                </div>
              );
            })}
        </div>
        {/* Slider for desktop starts  */}
        <div className="slider-container home-desktop-slider-container">
          <button onClick={sliderLeft} id="left-arrow">
            &lt;
          </button>
          <div id="all-slides-homepage">
            {sliderArr &&
              sliderArr.map((element, i) => {
                return (
                  <div key={i}>
                    <img
                      alt="slide-image"
                      id={`slide${i}`}
                      src={`${element.link}`}
                      onClick={async()=>{
                        try {
                         const urlNew = `${process.env.REACT_APP_API}/products/search/deals}`;
                         const res = await BaseUrl.get(urlNew);
                         let arr = res.data.productList;
                         setSearchList({ ...searchList, searchedList: arr });
                         setOriginalList(arr);
                         console.log(arr);
                         navigate("/products");
                         
                        } catch (error) {
                         console.log("Error while serching based on category ", error)
                        }
                       }} 
                    ></img>
                  </div>
                );
              })}
          </div>
          <button onClick={(e) => { slideRight(e);}} id="right-arrow">&gt;</button>
        </div>
        {/* slider for mobiles  */}

        <div  id="mobile-home-slider-container">
          {/* <button onClick={sliderLeftMob} id="left-arrow">
            &lt;
          </button> */}
          <div id="all-slider-homepage-mobile">
            {sliderMobArr &&
              sliderMobArr.map((element, i) => {
                return (
                  <div key={i}>
                    <img
                      alt="slide-image"
                      id={`slide${i}`}
                      src={`${element.link}`}
                      onClick={async()=>{
                        try {
                         const urlNew = `${process.env.REACT_APP_API}/products/search/deals}`;
                         const res = await BaseUrl.get(urlNew);
                         let arr = res.data.productList;
                         setSearchList({ ...searchList, searchedList: arr });
                         setOriginalList(arr);
                         console.log(arr);
                         navigate("/products");
                         
                        } catch (error) {
                         console.log("Error while serching based on category ", error)
                        }
                       }} 
                    ></img>
                  </div>
                );
              })}
          </div>
          {/* <button onClick={(e) => { slideRightMob(e);}} id="right-arrow">&gt;</button> */}
        </div>
        {/* Product Fetch components  */}
        
        <div style={{paddingBottom:"60px"}}>
        <FeatureProducts  url={`${process.env.REACT_APP_API}/products/search/getall`} heading="Top offers" deals="Top Deals" productList={productListOffers}></FeatureProducts>
        <FeatureProducts  url={`${process.env.REACT_APP_API}/products/search/clothes`} heading="Best in clothes" deals="Exclusive offer" productList={productTopClothes}></FeatureProducts>
        <FeatureProducts  url={`${process.env.REACT_APP_API}/products/search/Books`} heading="Best in Books" deals="min 30% off!" productList={productTopBooks}></FeatureProducts>
        </div>
      
      </div>
    </Layout>
  );
};

export default HomePage;
