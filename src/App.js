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
import Modal2 from "./Admin/components/Modal/Modal2";
function App() {
  return <Modal2 />;
}

export default App;
