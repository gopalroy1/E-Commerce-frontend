import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import BaseUrl from "../../Axios/BaseUrl";
import { useAuth } from "../../Components/UseContext/authContext";
import toast from "react-hot-toast";

const CreateProducts = () => {
  const [auth, setAuth] = useAuth();
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setshipping] = useState("");
  const [photo, setPhoto] = useState("");

  //Create product
  async function handleProductAdding(e) {
    e.preventDefault();
    try {
      const urlAdd = `${process.env.REACT_APP_API}/products/add`;
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", selectedCategory);
      productData.append("photo", photo);
      const header = {
        headers: {
          Authorization: auth.token,
        },
      };

      const res = await BaseUrl.post(urlAdd, productData, header);
      if (res.data.status) {
        toast.success("Product added sucessfully");
      }
    } catch (error) {
      console.log("some error occured while adding product error: ", error);
      toast.error("Some error occured");
      return;
    }
  }
  useEffect(() => {
    async function callApi() {
      try {
        const url = `${process.env.REACT_APP_API}/category/getall`;
        const { data } = await BaseUrl.get(url, {
          headers: {
            Authorization: auth.token,
          },
        });
        if (data.status) {
          const arr = data.categories;
          setCategory(...category, arr);
        }
      } catch (error) {
        console.log("Something went wrong while fetching the categories",error);
        toast.error();
      }
    }
    callApi();
  }, []);
  return (
    <Layout title={"Products"}>
      <div id="menu-content-container" className=" ">
        <AdminMenu></AdminMenu>

        <div style={{ display: "flex", flexDirection: "column",width:"60vw" }}>
          <h2 class="display-3">Create a product</h2>

          <select
            classname="form-select form-select-lg mb-3"
            aria-label="Large select example"
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}
          >
            <option>Select a category</option>
            {category &&
              category?.map((element, i) => {
                return (
                  <option key={i} value={element._id}>
                    {element.name}
                  </option>
                );
              })}
          </select>
          {/* Category selection dropdown ends  */}
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Product Name
            </label>
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Name"
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Product Description
            </label>
            <input
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="description"
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Product Price
            </label>
            <input
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              type="number"
              placeholder="price"
              className="form-control"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Product Quantity
            </label>
            <input
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              type="number"
              placeholder="quantity"
              className="form-control"
              aria-describedby="emailHelp"
            />
          </div>

          <select
            classname="form-select form-select-lg mb-3"
            aria-label="Large select example"
            onChange={(e) => {
              setshipping(e.target.value);
            }}
          >
            <option value={"yes"}>Select Shipping</option>
            <option value={"yes"}>yes</option>
            <option value={"no"}>no</option>
          </select>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Product Quantity
            </label>
            <input
              accept="image/*"
              onChange={(e) => {
                setPhoto(e.target.files[0]);
              }}
              type="file"
              className="form-control"
              aria-describedby="emailHelp"
            />
          </div>
          
          {/* {photo && (photo.name || "upload photo")} */}
          <div>
            <h5>Image preview</h5>
            {photo && (
              <img
                src={URL.createObjectURL(photo)}
                style={{ height: "300px" }}
              ></img>
            )}
          </div>
          <button class="btn btn-primary" onClick={handleProductAdding}>Add product</button>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProducts;
