import AdminMenu from "../../Components/Layout/AdminMenu";
import Layout from "../../Components/Layout/Layout";
import React,{useState,useEffect} from "react";
import { useAuth } from "../../Components/UseContext/authContext";
import BaseUrl from "../../Axios/BaseUrl";
import { Button, Modal } from "antd";
import toast from "react-hot-toast";

const ManageProducts = () => {
    const [auth,setAuth] = useAuth();
    const [productList,setProductList] = useState([]);
    const [visible,setVisible] = useState(false);
    const [modalvisible2,setModalVisible2] = useState(false);
    const [category,setCategory] = useState([]);
    const [categoryId,setCategoryId] = useState([]);
    const [name,setName] =useState("");
    const [description,setDescription] =useState("");
    const [price,setPrice] =useState("");
    const [quantity,setQuantity] =useState("");
    const [shipping,setshipping] =useState("");
    const [photo,setPhoto] =useState("");
    const [id,setId] = useState("");
    const [index,setIndex] =useState("");
    
    // Onclick adding values to the use state to manage the product 
    async function editForm(element){
        setName(element.name);
        setCategory(element.category.name);
        setCategoryId(element.category?._id);
        setDescription(element.description);
        setPrice(element.price);
        setQuantity(element.quantity)
        setshipping(element.shipping);
        setId(element._id);
        let ph = await fetch(`${process.env.REACT_APP_API}/products/get/product-image/${element.slug}`);
        setPhoto(ph);
        setVisible(true);
    }
    async function handleEdit(){
        try {
            const url = `${process.env.REACT_APP_API}/products/update/${id}`;
            const productData = new FormData();
            productData.append("name",name)
            productData.append("description",description)
            productData.append("price",price)
            productData.append("quantity",quantity)
            productData.append("category",categoryId)
            if(photo){

                productData.append("photo",photo)
            }
            const header = {
              headers: {
                Authorization: auth.token,
              },
            };
         
            const res = await BaseUrl.put(url, productData, header);
            if(res.data.status){
                setVisible(false);
                const pro = res.data.products;
                const arr = [...productList];
                arr[index]= pro;
                setProductList(arr);
                console.log(arr);
              toast.success("Product updated sucessfully");

      
            }
          } catch (error) {
            console.log("some error occured while adding updating product error: ",error.response.data)
            toast.error("Some error occured");
            return;
          }
    }
    async function handleDelete(){
       
        try {
            const url = `${process.env.REACT_APP_API}/products/delete/${id}`;
            const header = {
                headers: {
                  Authorization: auth.token,
                },
              };
           
            const res = await BaseUrl.delete(url, header);
            if(res.data.status){
                setModalVisible2(false);
                toast.success(res.data.message);
                const arr = [...productList];
                arr.splice(index,1);
                setProductList(arr);
                return;
            }
            
        } catch (error) {
            console.log("Error while deleting the product error is : ",error)
            return;
        }
    }
    useEffect(()=>{
        //Make a function for fetching product list and then calling it immediately
        async function fetchProductList(){
            try {
                
            const url = `${process.env.REACT_APP_API}/products/getall`;
            const res = await BaseUrl.get(url);
            const list = res.data.productList;
            setProductList(list);
            } catch (error) {
                console.log("Error happend while fetching all products error is : ",error)
                return
            }
        }
        fetchProductList();
    },[])
  return (
    <Layout>
      <div id="menu-content-container">
        <AdminMenu></AdminMenu>
        <div>
          <h1 class="display-5">All products</h1>
          <div id="product-container">
            {productList &&
              productList?.map((element, i) => {
                return (
                  <div key={i} className="product-item">
                    <img
                      src={`${process.env.REACT_APP_API}/products/get/product-image/${element.slug}`}
                    ></img>
                    <div style={{ height: "350px" }}>
                      <h4>Name: {element?.name.substring(0, 55)}</h4>
                      <p>
                        Description:{" "}
                        {element.description.substring(0, 70) + "..."}
                      </p>
                      <div>
                        <p>Price: {element.price}</p>
                        <p>Quantity available: {element.quantity}</p>
                      </div>
                      <p>Category: {element.category?.name}</p>
                      <p>Created at:{element.createdAt}</p>
                      <p>Updated at:{element.updatedAt}</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <button
                        class="btn btn-primary"
                        onClick={(e) => {
                          editForm(element);
                          setIndex(i);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        class="btn btn-danger"
                        onClick={() => {
                          setModalVisible2(true);
                          setId(element._id);
                          setIndex(i);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
{/* Modal for updating the product  */}
          <Modal
            onCancel={() => setVisible(false)}
            visible={visible}
            footer={null}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin:"auto",
                width: "90%",
              }}
            >
              <h2 class="display-5">Update the product</h2>

              <label>Category</label>
              <input
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                value={category}
              ></input>
              {/* Category selection dropdown ends  */}
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Product Name
                </label>
                <input
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
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
                  value={description}
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
                  value={price}
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
                  value={quantity}
                  type="number"
                  placeholder="quantity"
                  className="form-control"
                  aria-describedby="emailHelp"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Select photo
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

              <button style={{marginBottom:"10px"}} class="btn btn-primary" onClick={handleEdit}> 
                Confirm changes
              </button>
              <button
                class="btn btn-danger"
                onClick={() => {
                  setVisible(false);
                }}
              >
                Exit
              </button>
            </div>
          </Modal>

{/* Modal for deleting the product  */}
          <Modal
            onCancel={() => {
              setModalVisible2(false);
            }}
            visible={modalvisible2}
            footer={null}
          >
            <div
              style={{
                display: "flex",
                flexFlow: "row wrap",
                gap: "50px",
                justifyContent: "center",
              }}
            >
              <button class="btn btn-primary" onClick={handleDelete}>
                Yes
              </button>
              <button
                class="btn btn-danger"
                onClick={() => {
                  setModalVisible2(false);
                }}
              >
                No
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
