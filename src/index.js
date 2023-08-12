import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./StyleSheets/style.css";
import "./StyleSheets/ResponsiveStyle.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./Components/UseContext/authContext";
import "antd/dist/reset.css";
import { CartProvider } from "./Components/UseContext/CartContext.js";
import { SearchProvider } from "./Components/UseContext/SearchContext";
import { ListProvider } from "./Components/UseContext/originalSearchList";

ReactDOM.render(
  <AuthProvider>
    <SearchProvider>
      <BrowserRouter>


        <CartProvider>
          <ListProvider>
            <App></App>
            <Toaster />
          </ListProvider>
        </CartProvider>

      </BrowserRouter>
    </SearchProvider>
  </AuthProvider>,

  document.getElementById("root")
);
