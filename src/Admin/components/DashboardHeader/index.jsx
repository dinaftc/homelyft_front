import React, { useState } from "react";
import {products,setProducts} from "../../pages/Orders";
import "./styles.css";
import search from "../../assets/icons/search.png";
import axios from 'axios';
function DashboardHeader({orders}) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    axios.get(`http://127.0.0.1:8000/homeLift/products/?search=${searchTerm}`)
      .then(response => {
        // handle the response data here
        console.log(response.data);
        setProducts(response.data);
        
      })
      .catch(error => {
        // handle errors here
        console.log(error);
      });
  };


 
  return (
    <div className="dashbord-header-container">
      <input type="text" className="search"  value={searchTerm} placeholder="Search"
        onChange={e => setSearchTerm(e.target.value)}/>
      
      <img src={search} alt="" className="search-img" onClick={handleSearch} />

      <div className="dashbord-header-right">
        <img
          className="dashbord-header-avatar"
          src="https://reqres.in/img/faces/9-image.jpg"
          alt=""
        />
       
        <p>
          <select className="dashbord-header-right"><option value="Admin name">Admin name</option></select>
        </p>
      </div>
    </div>
  );
}

export default DashboardHeader;
