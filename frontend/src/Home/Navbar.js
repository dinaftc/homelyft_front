import Logo from "../Admin/components/Sidebar/icon/home.svg";
import search from "../Admin/assets/icons/search.png";
import person from "./assets/person.svg";
import panier from "./assets/panier.png";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Home from "./Home";
import axios from "axios";
import { Button } from "flowbite-react";
import Lottie from "lottie-react";
import cart from "./assets/cart.json";
function Navbar({ isAuthenticated, logout, user, setProducts }) {
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

  const navigate = useNavigate();

  const logout_user = () => {
    logout();
    navigate("/", { replace: true });
  };

  const positionStyles = {
    width: "100px",
    height: "100px",
  };
  return (
    <div className="bg-white flex flex-wrap items-center justify-between px-4 py-2">
      <Link to="/">
        <img
          class="object-center bg-transparent cursor-pointer"
          src={Logo}
          alt="HomeLift admin"
        />
      </Link>
      <div className="w-full md:w-3/5 relative mx-auto mt-2 md:mt-0 md:ml-2">
        <div className="relative">
          <input
            type="text"
            className="w-full h-10 py-6 px-10 m-5 rounded-full leading-5 bg-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:placeholder-gray-400"
            placeholder="What are you looking for?"
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <img
            src={search}
            alt=""
            className="absolute inset-y-0 left-8 w-6 h-6 my-auto mr-2 text-gray-400 pointer-events-none"
          />
        </div>
      </div>
      <div className="flex items-center">
        {isAuthenticated ? (
          <div className="flex items-center text-center">
            <Link to="/profile" className="mr-2">
              {user.fullname}
            </Link>
            <button onClick={logout_user} className="mr-8">
              <FiLogOut />
            </button>
          </div>
        ) : (
          <div className="flex items-center text-center">
            <img src={person} alt="" className="h-6 w-6 mr-2" />
            <Link to="/Login" className="mr-2">
              Login
            </Link>
            <span className="mr-2">or</span>
            <Link to="/Signup" className="mr-2">
              Sign up
            </Link>
          </div>
        )}
        <div className="flex flex-row">
          {isAuthenticated ? (
            <>
              <Link className=" mt-10" to="/MyOrders">
                <p className="font-pop text-base hover:text-primary">
                  See Orders
                </p>
              </Link>
              <Link to="/Shopping-bag">
                <Lottie animationData={cart} loop style={positionStyles} />
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                toast.error("Please login first", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }}
            >
              <Lottie animationData={cart} loop style={positionStyles} />
            </button>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Navbar);
