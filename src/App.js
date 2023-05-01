import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./hocs/Layout";
import Home from "./Home/Home";
import Resetpwd from "./Login/Resetpwd";
import Activate from "./Signup/Activate";
import ResetpwdConfirm from "./Login/ResetpwdConfirm";
import { Provider } from "react-redux";
import store from "./Login/store";
import Orders from "./Admin/pages/Orders/index";
import AddProduct from "./Admin/pages/Orders/AddProduct";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Resetpwd" element={<Resetpwd />} />

            <Route
              path="/password/reset/confirm/:uid/:token"
              element={<ResetpwdConfirm />}
            />
            <Route path="/activate/:uid/:token" element={<Activate />} />
            <Route exact path="/products" element={<Orders />} />
            <Route
              exact
              path="/products/Add_product"
              element={<AddProduct />}
            />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
