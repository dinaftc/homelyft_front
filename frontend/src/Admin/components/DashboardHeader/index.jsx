import React, { useState, useEffect } from "react";
import { setProducts } from "../../pages/Products";
import "./styles.css";
import search from "../../assets/icons/search.png";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function DashboardHeader({ orders,place }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (place) => {
    axios
      .get(`http://127.0.0.1:8000/${place}/?search=${searchTerm}`)
       .then((response) => {
        if (response.data.length ==0){
          toast.warning('no data found', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        }
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
      handleSearch(place);
    }
  };

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

  return (
    <div className="dashbord-header-container">
      <input
        type="text"
        className="search"
        value={searchTerm}
        placeholder="Search"
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
      />

      <img src={search} alt="" className="search-img" onClick={()=>handleSearch(place)} />

      <div className="dashbord-header-right">
        <img
          className="dashbord-header-avatar"
          src={user.profile_picture}
          alt=""
        />

        <p className="dashbord-header-right">
        <Link  to='/profile'> {user.fullname}
           </Link>
       
        </p>
      </div>
    </div>
  );
}

export default DashboardHeader;
