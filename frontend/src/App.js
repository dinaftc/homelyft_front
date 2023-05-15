import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import {BrowserRouter as Router , Routes, Route } from "react-router-dom";
import Layout from "./hocs/Layout";
import Home from "./Home/Home";
import Bag from "./Home/Bag";
import Addresse from "./Home/Addadress";
import Resetpwd from "./Login/Resetpwd";
import Activate from "./Signup/Activate";
import ResetpwdConfirm from "./Login/ResetpwdConfirm";
import { Provider } from "react-redux";
import store from "./Login/store";
import Orders from './Admin/pages/Products/index';
import AddProduct from './Admin/pages/Products/AddProduct'
import EditProductForm from "./Admin/pages/Products/EditProductForm";
import Profile from "./Admin/pages/Profile/Profile"
import Settings from "./Admin/pages/Settings/Settings";
import Addstaff from "./Admin/pages/Settings/Add_staff";

import Clients from "./Admin/pages/Clients/Clients";
import ProductsPerCategory from "./Home/ProductsPerCategory";
import ProductInfo from "./Home/ProductInfo";
function App() {
  return (
 
      //<ProductsPerCategory/>
      <ProductInfo/>
    
  );
}

export default App;
