import React from "react";
import  ReactDOM  from "react-dom";
import App from "./App";
import "./style.css" ;
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import  { Toaster } from 'react-hot-toast';


ReactDOM.render(<BrowserRouter>

<App></App>
<Toaster />
</BrowserRouter>
,document.getElementById("root"))