import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import BaseUrl from "../Axios/BaseUrl";
import FeatureProducts from "../Components/FeatureProducts";

const HomePage = () => {
  const [currIndex, setCurrIndex] = useState(0);
  const [productList, setProductList] = useState();
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
    {link:`https://images-eu.ssl-images-amazon.com/images/G/31/img22/Toys/GW/GW-Hero-PC_BBAug23_Soft-toys_with-Apay_Lifestyle_2x._CB597740150_.jpg`},
    {
      link: `https://rukminim2.flixcart.com/fk-p-flap/844/140/image/41fac6f59554c679.jpg?q=50`,
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
  }, []);
  return (
    <Layout title={"Home"}>
      <div className="">
        <div className="home-category-container">
          {categoryArr &&
            categoryArr.map((element, i) => {
              return (
                <div key={i}>
                  <img src={element.link}></img>
                  <p>{element.name}</p>
                </div>
              );
            })}
        </div>
        <div className="slider-container">
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
                    ></img>
                  </div>
                );
              })}
          </div>
          <button onClick={(e) => { slideRight(e);}} id="right-arrow">&gt;</button>
        </div>
        {/* Making reusable components first here to test it  */}
        
        <FeatureProducts productList={productList}></FeatureProducts>
        <FeatureProducts productList={productList}></FeatureProducts>
        <FeatureProducts productList={productList}></FeatureProducts>
      </div>
    </Layout>
  );
};

export default HomePage;
