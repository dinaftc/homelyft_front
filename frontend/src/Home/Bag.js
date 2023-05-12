import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import Navbar from "./Navbar";
import { Navigate } from "react-router-dom";
import axios from "axios";

import truck from "./assets/truck.svg";
import store from "./assets/store.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Divider } from "@mui/material";
import { Link } from "react-router-dom";
function Bag({ isAuthenticated, user }) {
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditingQuantity, setIsEditingQuantity] = useState(false);
  const [editedQuantity, setEditedQuantity] = useState(0);
  const [triggerFetch, setTriggerFetch] = useState(false);
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/home/${user.id}/view-cart/`)
      .then((response) => response.json())
      .then(async (data) => {
        // Map through the items and fetch product information for each item
        const updatedItems = await Promise.all(
          data.map(async (item) => {
            setEditedQuantity(item.Quantity);
            const response = await fetch(
              `http://127.0.0.1:8000/homeLift/products/${item.Product_id}/`
            );
            const product = await response.json();
            return { ...item, product };
          })
        );

        setItems(updatedItems);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [triggerFetch]);

  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/home/${user.id}/view-cart/${id}`)
      .then(function (response) {
        console.log(" deleted successfully");
        alert("done");
        setTriggerFetch(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  let incNum = (id) => {
    setEditedQuantity(editedQuantity + 1);
    handleEditSubmit(id);
  };

  let decNum = (id) => {
    setEditedQuantity(editedQuantity - 1);
    handleEditSubmit(id);
  };

  let handleChange = (event, id) => {
    setEditedQuantity(event.target.value);
    handleEditSubmit(id);
  };

  const handleEditSubmit = (id) => {
    setIsEditingQuantity(false);
    fetch(`http://127.0.0.1:8000/home/${user.id}/view-cart/${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Quantity: editedQuantity }),
    })
      .then(() => {
        // Update the orders state with the updated quantity
        setTriggerFetch(true);
        toast.success("Quanity changed successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (!isAuthenticated) {
    return <Navigate to="/" replace></Navigate>;
  } else {
    return (
      <div className="bg-white h-full w-full">
        <Navbar></Navbar>

        <Divider/>
        <div className="flex w-full">
        <div className=" bg-white rounded-lg p-5 w-3/4">
          <h1 className="text-gray-700 text-3xl font-bold mb-5 font-pop">
            Shopping Bag
          </h1>
          <p className="text-gray-700 text-xl font-bold mb-5 font-pop">
            How would you like to receive your order ?{" "}
          </p>
          <div class="flex h-20 w-full ">
            <button class="flex items-center ml-12 text-center w-1/2 border-gray-300 border rounded px-4 py-2 m-1 focus:border-primary ">
              <img src={truck} alt="" class="mr-2" />
              <p class="ml-14 text-gray-700 text-md font-semibold">Delivery</p>
            </button>
            <button class="flex items-center mr-12 text-center w-1/2 border-gray-300 border rounded px-4 py-2 m-1 focus:border-primary">
              <img src={store} alt="" class="mr-2" />
              <p class="ml-8 text-gray-700 text-md font-semibold">
                Collect from store
              </p>
            </button>
          </div>
          {items.length !== 0 ? (
            <div>
              {items.map((item) => (
                <div className="hero h-1/3 " key={item.id}>
                  <div className="hero-content flex-col lg:flex-row">
                    <img
                      src={item.product.image}
                      className="h-1/3 w-1/3 rounded-lg shadow-2xl"
                      alt={item.product.name}
                    />
                    <div className="flex flex-col justify-between ">
                      <div className="flex flex-row justify-between">
                        <h1 className="text-3xl font-bold">
                          {item.product.name}
                        </h1>
                        <p className="text-right text-xl font-bold ml-4 self-center">
                          {item.product.price} dzd
                        </p>
                      </div>

                      <div className="flex mt-12">
                        <div className="flex relative rounded-full border-2 border-primary w-28 h-10">
                          <button
                            className="absolute left-0 top-2 px-2 rounded-full bg-white text-center"
                            type="button"
                            onClick={() => decNum(item.id)}
                          >
                            -
                          </button>

                          <input
                            className="text-center  w-full bg-transparent outline-none"
                            type="text"
                            value={editedQuantity}
                            onChange={(event) => handleChange(event, item.id)}
                          />

                          <button
                            className="absolute right-0 top-2 px-2 rounded-full bg-white text-center"
                            type="button"
                            onClick={() => incNum(item.id)}
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="font-pop normal-case text-gray-400 rounded-full bg-none outline-none border-none w-28 ml-4"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
     <Divider/>
     </div>
         
             

          ) : (
            <p>Fetching data ...</p>
          )}</div>
          <div className=" w-1/4 mr-8 fixed top-26 right-0">
            <div className="justify-between flex flex-row">
            <p  className="text-gray-400 text-xl font-semibold m-5 font-pop">Products price</p>
          <p className="text-gray-400 text-xl font-semibold m-5 font-pop">1000 Dzd</p>
      
            </div>
            <p className="text-gray-700 text-xl font-semibold m-5 font-pop">Order Summaey </p>
            <div className="justify-between flex flex-row">
            <p  className="text-gray-400 text-xl font-semibold m-5 font-pop">Delivery</p>
          <p className="text-gray-400 text-xl font-semibold m-5 font-pop">to be determined</p>
      
            </div>
          <hr className="border-black"/>
            <div className="justify-between flex flex-row">
            <p className="text-gray-700 text-xl font-semibold m-5 font-pop">Total to pay </p>
            <p className="text-gray-700 text-xl font-semibold m-5 font-pop">10000dzd</p>
      
            </div>
            <Divider></Divider>
            <Link to="/Delivery">  <button class="w-full text-white my-5 h-20 bg-primary border-none rounded px-4 py-2" > 
           Continue to Checkout
            </button></Link>
      
          
         </div>
        </div>
        
       
        <ToastContainer></ToastContainer>
      </div>
      
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Bag);
