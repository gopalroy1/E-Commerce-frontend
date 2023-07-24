import React from "react";
import ReactDOM from "react-dom";
import Layout from "./Components/Layout/Layout";
import {Routes,Route} from 'react-router-dom'
import HomePage from "./Pages/HomePage";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Policy from "./Pages/Policy";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import PageNotFound from "./Pages/PageNotFound";


const App = () => {
  return(
    <Routes>
      <Route path="/" element={<HomePage></HomePage>}/> 
      <Route path="/about" element={<About></About>}> </Route>
      <Route path="/contact" element={<Contact></Contact>}> </Route>
      <Route path="/policy" element={<Policy></Policy>}> </Route>
      <Route path="/register" element={<Register></Register>}> </Route>
      <Route path="/login" element={<Login></Login>}> </Route>
      <Route path="/*" element={<PageNotFound></PageNotFound>}> </Route>
    </Routes>
  );
};

export default App;
