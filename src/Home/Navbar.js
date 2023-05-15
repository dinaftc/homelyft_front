import Logo from "../Admin/components/Sidebar/icon/home.svg";
import search from "../Admin/assets/icons/search.png";
import person from "./assets/person.svg";
import panier from "./assets/panier.png";
import { Link, Navigate } from "react-router-dom";
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import { FiLogOut } from 'react-icons/fi';
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import axios from "axios";
function Navbar({ isAuthenticated, logout ,user, setProducts }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    axios
      .get(`http://127.0.0.1:8000/homeLift/products/?search=${searchTerm}`)
       .then((response) => {
        // handle the response data here
        console.log(response.data);
       setProducts(response.data);
      })
      .catch((error) => {
        // handle errors here
        console.log(error);
      });
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
 
 
  const logout_user = () => {
    
    logout();
    return (<Navigate to="/" replace />)
  };

  return (
    <div class="bg-white flex">
      <img
        class="object-center bg-transparent cursor-pointer"
        src={Logo}
        alt="HomeLift admin"
      />
      <div class="relative w-3/5 px-5">
        <div class="relative " >
          <input
            type="text"
            class="w-full h-10 py-6 px-10 m-5 rounded-full leading-5 bg-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:placeholder-gray-400"
            placeholder="What are you looking for?"
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <img
            src={search}
            alt=""
            class="absolute inset-y-0 left-8 w-6 h-6 my-auto mr-2 text-gray-400 pointer-events-none"
          />
        </div>
      </div>
      <div class="relative w-1/5">
        {isAuthenticated? 
        <div class="absolute top-0 right-0 h-full flex items-center">
        <Link  to='/profile'>{user.fullname}</Link> 
          <button onClick={logout_user} className="m-8">
          <FiLogOut/>
          </button></div>
        :

       
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
          {isAuthenticated?   <Link to='/Shopping-bag'>
           
           <img src={panier} alt="" class="h-6 w-6 " />
         </Link> : <button onClick={()=>{toast.error("Please login first", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            })}}>   <img src={panier} alt="" class="h-6 w-6 " /></button> }
        
        </div>
       
      </div>
      <ToastContainer />
    </div>
  );

}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user : state.auth.user,
});

export default connect(mapStateToProps, { logout })(Navbar);

