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
import Statistics from "./Admin/pages/Statistics/Statistics";
import Homee from './Home/dina/HomeMain';
import Inbox from "./Admin/pages/Inbox";
import Notifications from "./Admin/pages/Notifications";
import MyOrders from './Home/Orders'

function App() {
  return (
 
      <Provider store={store}>
      <Router>
      <Layout>

          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/" element={<Homee />} />
            <Route path="/Resetpwd" element={<Resetpwd />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Inbox" element={<Inbox />} />
            <Route path="/Notifications" element={<Notifications />} />
             <Route  path="/password/reset/confirm/:uid/:token" element={<ResetpwdConfirm/>}/>
             <Route  path="/activate/:uid/:token" element={<Activate/>}/>
             <Route exact path="/products" element={< Orders/>} />
             <Route exact path="/products/Add_product" element={<AddProduct/>} />
             <Route exact path="/products/Edit_product" element={<EditProductForm/>} />
             <Route path="/Statistics"  element={<Statistics/>}/>
             <Route exact path="/profile" element={<Profile/>} />
             <Route exact path="/settings" element={<Settings/>} />
             <Route exact path="/add_staff" element={<Addstaff/>} />
             <Route exact path="/clients" element={<Clients/>} />
             <Route exact path="/Shopping-bag" element={<Bag/>} />
             <Route exact path="/Delivery" element={<Addresse/>} />
             <Route path="/product-details/:id"  element={<ProductInfo/>}/>
             <Route exact path="/MyOrders" element={<MyOrders/>} />
          </Routes>
          </Layout>

      </Router>
      </Provider>
    
  );
}

export default App;