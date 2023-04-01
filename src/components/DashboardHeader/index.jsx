import React from "react";

import "./styles.css";
import search from "../../assets/icons/search.png";

function DashboardHeader() {
  return (
    <div className="dashbord-header-container">
      <input type="text" className="search" />
      <span className="search-input">Search</span>
      <img src={search} alt="" className="search-img" />

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
