import React from "react";
import  ReactDOM  from "react-dom";
import App from "./App";
import "./style.css" ;
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import  { Toaster } from 'react-hot-toast';
import { AuthProvider } from "./Components/UseContext/authContext";
import 'antd/dist/reset.css';
import { CartProvider } from "./Components/UseContext/CartContext.js";


ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <CartProvider>
        <App></App>
        <Toaster />
      </CartProvider>
    </BrowserRouter>
  </AuthProvider>,

  document.getElementById("root")
);