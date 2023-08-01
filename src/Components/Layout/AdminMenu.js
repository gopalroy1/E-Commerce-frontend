import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
   
      <div id="Admin-menu" className="list-group text-center">
        <h4>Admin Panel</h4>
        <NavLink
          to="/dashboard/admin/create-catagory"
          className="list-group-item list-group-item-action"
        >
          Create Catagory
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-product"
          className="list-group-item list-group-item-action"
        >
          Create Product
        </NavLink>
        <NavLink
          to="/dashboard/admin/manage-products"
          className="list-group-item list-group-item-action"
        >
          Manage Products
        </NavLink>
        <NavLink
          to="/dashboard/admin/users"
          className="list-group-item list-group-item-action"
        >
          Users
        </NavLink>
      </div>
    
  );
};

export default AdminMenu;
