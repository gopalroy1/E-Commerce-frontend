import React, { useState, useEffect } from "react";
import BaseUrl from "../../Axios/BaseUrl";
import { useAuth } from "../UseContext/authContext";
import toast from "react-hot-toast";

const Filters = () => {
  const [auth, setAuth] = useAuth();
  const [category, setCategory] = useState([]);
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
        console.log(error);
        toast.error("Something went wrong while fetching the categories");
      }
    }
    callApi();
  }, []);
  return (
    <div className="Filter">
      <h4 class="display-6">Filter By Category</h4>

      {category &&
        category?.map((element, i) => {
          return (
            <div class="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                value={element._id}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                {element.name}
              </label>
            </div>
          );
        })}
        <h1 class="display-6">Filter by Price</h1>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          defaultValue
          id="flexCheckDefault"
          value={500}
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          Below 500
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          defaultValue
          id="flexCheckDefault"
          value={1000}
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          500-1000
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          defaultValue
          id="flexCheckDefault"
          value={500}
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          1000-1500
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          defaultValue
          id="flexCheckDefault"
          value={500}
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          1500-2000
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          defaultValue
          id="flexCheckDefault"
          value={500}
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          2000-2500
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          defaultValue
          id="flexCheckDefault"
          value={500}
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          3000+
        </label>
      </div>
    </div>
  );
};

export default Filters;
