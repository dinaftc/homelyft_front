import Logo from "../Admin/components/Sidebar/icon/home.svg";
import search from "../Admin/assets/icons/search.png";
import person from "./assets/person.svg";
import panier from "./assets/panier.png";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import { useState,useEffect } from "react";
import { FiLogOut } from 'react-icons/fi';
import axios from "axios";
function Navbar({ isAuthenticated, logout }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/auth/users/me/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const logout_user = () => {
    
    logout();
  };

  return (
    <div class="bg-white flex">
      <img
        class="object-center bg-transparent cursor-pointer"
        src={Logo}
        alt="HomeLift admin"
      />
      <div class="relative w-3/5 px-5">
        <div class="relative ">
          <input
            type="text"
            class="w-full h-10 py-6 px-10 m-5 rounded-full leading-5 bg-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:placeholder-gray-400"
            placeholder="What are you looking for?"
          />
          <img
            src={search}
            alt=""
            class="absolute inset-y-0 left-8 w-6 h-6 my-auto mr-2 text-gray-400 pointer-events-none"
          />
        </div>
      </div>
      <div class="relative w-1/5">
        {isAuthenticated? <Link class="absolute top-0 right-0 h-full flex items-center" to='/profile'>{user.fullname}</Link> :

       
        <div class="absolute top-0 right-0 h-full flex items-center">
          <img src={person} alt="" class="h-6 w-6 mr-2" />
          <p> Hey! &nbsp;</p>
          <Link to="/Login">Login</Link>
          <p>&nbsp;or&nbsp;</p>
          <Link to="/Signup">Sign up</Link>
        </div>
         }
      </div>
      <div class="relative p-8">
        <div class="absolute top-0 right-0 h-full flex items-center mx-2">
          <Link to='/Shopping-bag'>
           
            <img src={panier} alt="" class="h-6 w-6 " />
          </Link>
        </div>
        <div class="absolute top-0 left-0 p-2  h-full flex items-center ">
          <button onClick={logout_user}>
           
          <FiLogOut/>
          </button>
        </div>
      </div>
    </div>
  );

}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);

