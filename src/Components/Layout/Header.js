import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../UseContext/authContext";
import toast from "react-hot-toast";

const Header = () => {
  //variable for using context api
  const [auth, setAuth] = useAuth();
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
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <NavLink to="/" className="navbar-brand">
              🛒 Ecommerce
            </NavLink>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link active" aria-current="page">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/catagory"
                  className="nav-link active"
                  aria-current="page"
                >
                  CATAGORY
                </NavLink>
              </li>

              {/* Here condition for showing log in or log out button  */}
              {/* If user is not present then show him register and log in button */}
              {/* else show him just the log out button */}
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink to="/user" className="nav-link">
                      {auth?.user?.name}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to={`/dashboard/${auth?.user?.role ===1 ?'admin':'user'}`} className="nav-link">
                      Dashboard
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink onClick={handleLogOut} to="/" className="nav-link">
                      Log out
                    </NavLink>
                  </li>
                </>
              )}

              <li className="nav-item">
                <NavLink to="/cart" className="nav-link">
                  Cart
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
