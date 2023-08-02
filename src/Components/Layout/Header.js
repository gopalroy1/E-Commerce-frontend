import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../UseContext/authContext";
import toast from "react-hot-toast";
import { useCart } from "../UseContext/CartContext.js";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Avatar, Badge, Space } from "antd";

const Header = () => {
  //variable for using context api
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  function handleLogOut() {
    //Remove values from global context variable
    //Spreading then removing because some other details may be present there

    setAuth({ ...auth, user: null, token: null });
    //Remove the local storage
    localStorage.removeItem("auth");
    toast.success("Log out sucessful");
  }
  return (
    <div>
      <nav className="topnavbar">
        <li className="">
          <NavLink to="/" className="link">
            🛒 Ecommerce
          </NavLink>
        </li>
        <li className="search-container">
          <input placeholder="search"></input>
          <button>Search</button>
        </li>
       
        <ul className="">
          <li className="">
            <NavLink to="/" className="link">
              Home
            </NavLink>
          </li>
          <li className="">
            <NavLink to="/catagory" className="link" aria-current="page">
              CATAGORY
            </NavLink>
          </li>

          {/* Here condition for showing log in or log out button  */}
          {/* If user is not present then show him register and log in button */}
          {/* else show him just the log out button */}
          {!auth.user ? (
            <>
              <li className="">
                <NavLink to="/register" className="link">
                  Register
                </NavLink>
              </li>
              <li className="">
                <NavLink to="/login" className="link">
                  Login
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="">
                <NavLink to="/user" className="link">
                  {auth?.user?.name}
                </NavLink>
              </li>
              <li className="">
                <NavLink
                  to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                  className="link"
                >
                  Dashboard
                </NavLink>
              </li>
              <li className="">
                <NavLink onClick={handleLogOut} to="/" className="link">
                  Log out
                </NavLink>
              </li>
            </>
          )}

          <li className="">
            <Badge count={cart?.length}>
              <NavLink to="/dashboard/cart" className="link">
                Cart
              </NavLink>
            </Badge>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
