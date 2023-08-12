import React from 'react'

const FeatureProducts = (props) => {
  console.log(props)
  const productList = props.productList;
  console.log(productList)
  return (
    <div className="feature">
          <div id="feature-product-container">
            <div id="feature-heading">
              <h1 class="display-6">Top offers</h1>
              <button type="button" class="btn btn-primary">
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
                      <p  class="text-center">{element.description.substring(0, 10)}</p>
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