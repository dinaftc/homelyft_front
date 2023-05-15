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
import ProductInfo from "./Home/ProductInfo";
import Clients from "./Admin/pages/Clients/Clients";
function App() {
  return (
 
      <Provider store={store}>
      <Router>
      <Layout>

          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route path="/Resetpwd" element={<Resetpwd />} />
            
             <Route  path="/password/reset/confirm/:uid/:token" element={<ResetpwdConfirm/>}/>
             <Route  path="/activate/:uid/:token" element={<Activate/>}/>
             <Route exact path="/products" element={< Orders/>} />
             <Route exact path="/products/Add_product" element={<AddProduct/>} />
             <Route exact path="/products/Edit_product" element={<EditProductForm/>} />
             <Route exact path="/profile" element={<Profile/>} />
             <Route exact path="/settings" element={<Settings/>} />
             <Route exact path="/add_staff" element={<Addstaff/>} />
             <Route exact path="/clients" element={<Clients/>} />
             <Route exact path="/Shopping-bag" element={<Bag/>} />
             <Route exact path="/Delivery" element={<Addresse/>} />
             <Route path="/product-details/:id"  element={<ProductInfo/>}/>
          </Routes>
          </Layout>

      </Router>
      </Provider>
    
  );
}

export default App;