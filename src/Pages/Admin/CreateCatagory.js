import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import BaseUrl from "../../Axios/BaseUrl";
import { useAuth } from "../../Components/UseContext/authContext";

import { Button, Modal } from "antd";

const CreateCatagory = () => {
  const [auth, setAuth] = useAuth();
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editName, setEditName] = useState("");
  const [editId, setEditId] = useState("");
  const [index, setIndex] = useState();
  const [visible2, setVisible2] = useState(false);
  //State for using modal for editing catagory via a pop up kind of desing
  const [visible, setVisible] = useState(false);

  const [categories, setCategories] = useState([]);

  async function addCategory() {
    try {
      const urlAdd = "http://localhost:3005/api/category/add";
      const bobyData = {
        catagoryname: newCategoryName,
      };
      const header = {
        headers: {
          Authorization: auth.token,
        },
      };
      const res = await BaseUrl.post(urlAdd, bobyData, header);
      if (res.data.status) {
        console.log(res);
        const newArr = [...categories];
        newArr.push(res.data.body);
        setCategories(newArr);
        toast.success(res.data.message);
        return;
      }
    } catch (error) {
      console.log("Error in adding data  is : " + error);
      toast.error("Some error happend");
    }
  }
  //Edit category name
  async function handleEditCategory() {
    try {
      const urlAdd = "http://localhost:3005/api/category/update";
      const bobyData = {
        id: editId,
        newname: editName,
      };
      const header = {
        headers: {
          Authorization: auth.token,
        },
      };
      console.log(editName, editId);
      const res = await BaseUrl.put(urlAdd, bobyData, header);
      if (res.data.status) {
        console.log(res.data.catagory);
        const newArr = [...categories];
        newArr[index] = res.data.catagory;
        setCategories(newArr);
        setVisible(false);
        toast.success(res.data.message);
        return;
      }
    } catch (error) {
      console.log("Error in updating category  is : " + error);
      toast.error("Some error happend");
    }
  }
  async function handleDelete() {
    console.log("ccccccc")
    console.log(editId);
    try {
      const urlAdd = `http://localhost:3005/api/category/delete/${editId}`;
      const header = {
        headers: {
          Authorization: auth.token,
        },
      };
      const res = await BaseUrl.delete(urlAdd, header);
      if (res.data.status) {
        console.log(res.data.catagory);
        const newArr = [...categories];
        newArr.splice(index, 1);
        setCategories(newArr);
        setVisible2(false)
        toast.success(res.data.message);
        return;
      }
    } catch (error) {
      console.log("Error in deleting category  is : " + error);
      toast.error("Some error happend");
    }
  }
  useEffect(() => {
    async function callApi() {
      try {
        const url = "http://localhost:3005/api/category/getall";
        const { data } = await BaseUrl.get(url, {
          headers: {
            Authorization: auth.token,
          },
        });
        if (data.status) {
          const arr = data.categories;
          setCategories(...categories, arr);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong while fetching the categories");
      }
    }
    callApi();
  }, []);
  return (
    <Layout>
      <div id="menu-content-container" className="">
        <AdminMenu></AdminMenu>
        <div id="right-admin-dashoard" className="col-md-9 ">
          <h1>Manage Categories</h1>
          <div>
            <h2>Create new Category</h2>
            <input
              onChange={(e) => {
                setNewCategoryName(e.target.value);
              }}
              placeholder="Enter new catagory name"
              type="text"
              class="form-control"
              id="enter-new-category"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
            ></input>
            <button onClick={addCategory} type="button" class="btn btn-success">
              Submit
            </button>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Actions</th>
                </tr>

                {categories &&
                  categories?.map((element, i) => {
                    return (
                      <tr key={i}>
                        <td key={element._id}>{element.name}</td>
                        <td>
                          <button
                            onClick={() => {
                              setEditName("");
                              setEditName(element.name);
                              setEditId(element._id);
                              setIndex(i);
                              setVisible(true);
                            }}
                            type="button"
                            class="btn btn-primary"
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              setEditId(element._id);
                              setIndex(i);
                              setVisible2(true);
                            }}
                            type="button"
                            class="btn btn-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </thead>
              <tbody>
                <tr></tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Footer nahi chaiye isiliye null kr die hai  */}
        <Modal
          onCancel={() => {
            setVisible(false);
          }}
          footer={null}
          visible={visible}
        >
          <input
            onChange={(e) => setEditName(e.target.value)}
            value={editName}
            id="modal-input"
            class="form-control"
            placeholder="enter new name"
          ></input>
          <button
            onClick={handleEditCategory}
            type="button"
            class="btn btn-success"
          >
            Save
          </button>
        </Modal>
        <Modal
          onCancel={() => {
            setVisible2(false);
          }}
          footer={null}
          visible={visible2}
        >
          <div
            style={{
              display: "flex",
              flexFlow: "row wrap",
              gap: "50px",
              justifyContent: "center",
            }}
          >
            <button type="button" class="btn btn-danger" onClick={handleDelete}>
              YES
            </button>
            <button type="button" class="btn btn-primary" onClick={()=>{setVisible2(false)}}>NO</button>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default CreateCatagory;
