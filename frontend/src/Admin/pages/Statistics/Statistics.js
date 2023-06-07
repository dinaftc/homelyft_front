/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import "../styles.css";
import { connect } from "react-redux";
import { logout } from "../../../actions/auth";
import product from "./unsplash_Uxqlfigh6oE.png";
import order from "./unsplash_-gkndM1GvSA.svg";
import { products } from "./../Products/index";
import Chart from './Chart';
import img from './unsplash_Ot2iTXgC6fY.png'

function Statistics({ isAuthenticated, logout }) {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [TotalOrders, setTotalOrders] = useState(0);
  const [TotalProducts, setTotalProducts] = useState(0);
const[statistic,setStatistic]=useState([])
  const logout_user = () => {
    logout();
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/home/orders")
      .then((response) => response.json())
      .then((data) => {
        const totalOrders = data.length;
        setTotalOrders(totalOrders);
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/home/cards/")
      .then((response) => response.json())
      .then((data) => {
      setStatistic(data)
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/homeLift/products/")
      .then((response) => response.json())
      .then((data) => {
        const totalProducts = data.length;
        setTotalProducts(totalProducts);
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/home/orders")
      .then((response) => response.json())
      .then((data) => {
        const totalOrders = data.length;
        setTotalOrders(totalOrders);
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/home/orders")
      .then((response) => response.json())
      .then((data) => {
        const totalOrders = data.length;
        setTotalOrders(totalOrders);
      })
      .catch((error) => console.error(error));
  }, []);
  

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  } else {
    return (
      <div className="dashboard-content">
        <DashboardHeader />

       
          <div className="dashboard-content-header">
            <p>Statistics</p>
          </div>
          <div className="flex inline-flex">
  <div className="card bg-white inline-block w-96 h-52 m-2 shadow-xl rounded-xl relative">
   
    <div className="card-body absolute inset-0 flex flex-col rounded-xl">
      <h1 className="card-title text-3xl font-bold font-pop text-black-300 z-10">
        Products
      </h1>
      <div className="card-actions absolute bottom-4 right-6">
        <h2 className="text-5xl font-bold font-pop text-primary">
          {TotalProducts}
        </h2>
      </div>
    </div>
  </div>

  <div className="card bg-white inline-block w-96 h-52 m-2 shadow-xl rounded-xl relative">
   
    <div className="card-body absolute inset-0 flex flex-col rounded-xl">
      <h1 className="card-title text-3xl font-bold font-pop text-black-300 z-10">
        Orders
      </h1>
      <div className="card-actions absolute bottom-4 right-6">
        <h2 className="text-5xl font-bold font-pop text-primary">
          {TotalOrders}
        </h2>
      </div>
    </div>
  </div>

  <div className="card bg-white inline-block w-96 h-52 m-2 shadow-xl rounded-xl relative">
    
    <div className="card-body absolute inset-0 flex flex-col rounded-xl">
      <h1 className="card-title text-3xl font-bold font-pop text-black-300 z-10">
        Revenue
      </h1>
      <div className="card-actions absolute bottom-4 right-6">
        <h2 className="text-5xl font-bold font-pop text-primary">
          {statistic.Revenue}DA
        </h2>
      </div>
    </div>
  </div>
  </div>
  <div className="flex inline-flex ">
  <div className="card bg-white inline-block w-96 h-52 m-2 shadow-xl rounded-xl relative">
   
    <div className="card-body absolute inset-0 flex flex-col rounded-xl">
      <h1 className="card-title text-3xl font-bold font-pop text-black-300 z-10">
        Profits
      </h1>
      <div className="card-actions absolute bottom-4 right-6">
        <h2 className="text-5xl font-bold font-pop text-primary">
          {statistic.Total_Profit}DA
        </h2>
      </div>
    </div>
  </div>

  <div className="card bg-white inline-block w-96 h-52 m-2 shadow-xl rounded-xl relative">
    
    <div className="card-body absolute inset-0 flex flex-col rounded-xl">
      <h1 className="card-title text-3xl font-bold font-pop text-black-300 z-10">
        Customers
      </h1>
      <div className="card-actions absolute bottom-4 right-6">
        <h2 className="text-5xl font-bold font-pop text-primary">
          {statistic.Total_Customer}
        </h2>
      </div>
    </div>
  </div>
  <div  className="card bg-white inline-block w-96 h-52 m-2">
  <Chart percentage={statistic.Conversion_rate} />
</div>

</div>


         
        </div>
    
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Statistics);
