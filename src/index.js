import React from "react";
import  ReactDOM  from "react-dom";
import App from "./App";
import "./style.css" ;
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";

ReactDOM.render(<BrowserRouter>

<App></App>

</BrowserRouter>
,document.getElementById("root"))