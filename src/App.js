import React from "react";
import {Routes,Route} from 'react-router-dom'
import HomePage from "./Pages/HomePage";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Policy from "./Pages/Policy";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import PageNotFound from "./Pages/PageNotFound";
import Dashboard from "./Pages/User/Dashboard";
import PrivateRoute from "./Components/Routes/Private";
import AdminRoute from "./Components/Routes/AdminRoute";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import CreateCatagory from "./Pages/Admin/CreateCatagory";
import CreateProducts from "./Pages/Admin/CreateProducts";
import UserDashboard from "./Pages/Admin/UserDashboard";
import Orders from "./Pages/User/Orders";
import Profile from "./Pages/User/Profile";



const App = () => {
  return(
    <Routes>
      <Route path="/" element={<HomePage></HomePage>}/> 
      {/* For making private routes  */}
      <Route path="/dashboard" element={<PrivateRoute></PrivateRoute>}>
        <Route path="/dashboard/user" element={<Dashboard></Dashboard>}></Route>
        <Route path="/dashboard/user/orders" element={<Orders></Orders>}></Route>
        <Route path="/dashboard/user/profile" element={<Profile></Profile>}></Route>
      </Route>
      <Route path="/dashboard" element={<AdminRoute></AdminRoute>}>
        <Route path="admin/" element={<AdminDashboard></AdminDashboard>}></Route>
        <Route path="admin/create-catagory" element={<CreateCatagory></CreateCatagory>}></Route>
        <Route path="admin/create-product" element={<CreateProducts></CreateProducts>}></Route>
        <Route path="admin/users" element={<UserDashboard></UserDashboard>}></Route>
      </Route>
      <Route path="/dashboard" element={<Dashboard></Dashboard>}> </Route>
      <Route path="/register" element={<Register></Register>}> </Route>
      <Route path="/login" element={<Login></Login>}> </Route>
      <Route path="/about" element={<About></About>}> </Route>
      <Route path="/contact" element={<Contact></Contact>}> </Route>
      <Route path="/policy" element={<Policy></Policy>}> </Route>
      <Route path="/*" element={<PageNotFound></PageNotFound>}> </Route>
    </Routes>
  );
};

export default App;
