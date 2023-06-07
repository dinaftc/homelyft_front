import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import Navbar from "./Navbar";
import { Navigate} from "react-router-dom";
import axios from "axios";
import discount from "./assets/Vector.svg";
import down from "./assets/down.svg";
import truck from "./assets/truck.svg";
import store from "./assets/store.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Divider } from "@mui/material";
import { Link } from "react-router-dom";
function Bag({ isAuthenticated, user }) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const[discode,Setdisode]=useState(0);
  const[Down,Setdown]=useState(false);
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/home/${user.id}/view-cart/`)
      .then((response) => response.json())
      .then(async (data) => {

        setTotal(data[0].total_amount);
        // Map through the items and fetch product information for each item
        const updatedItems = await Promise.all(
          data[0].items.map(async (item) => {
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
  }, [triggerFetch, user.id]);

  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/home/${user.id}/view-cart/${id}`)
      .then(function (response) {
        console.log("deleted successfully");
        
        setTriggerFetch(true);
        toast.success("Item deleted successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      })
      .catch(function (error) {
        console.log(error);
        toast.error("failed to delete", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      });
  };

  const incNum = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, Quantity: item.Quantity + 1 };
      }
      return item;
    });
    setItems(updatedItems);
    handleEditSubmit(id, updatedItems.find((item) => item.id === id).Quantity);
  };

  const decNum = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id && item.Quantity > 0) {
        return { ...item, Quantity: item.Quantity - 1 };
      }
      return item;
    });
    setItems(updatedItems);
    handleEditSubmit(id, updatedItems.find((item) => item.id === id).Quantity);
  };

  const handleChange = (event, id) => {
    const newQuantity = parseInt(event.target.value);
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, Quantity: newQuantity };
      }
      return item;
    });
    setItems(updatedItems);
    handleEditSubmit(id, newQuantity);
  };
  const handleEditSubmit = (id, quantity) => {
    fetch(`http://127.0.0.1:8000/home/${user.id}/view-cart/${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Quantity: quantity }),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Quantity changed successfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          throw new Error("Failed to update quantity");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };
  

  const handleCheckout = () => {
    fetch(`http://127.0.0.1:8000/home/${user.id}/verify-cart/`)
      .then((response) => {
        if (response.status === 200) {
          return fetch(`http://127.0.0.1:8000/home/${user.id}/checkout/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
          });
        } else {
          throw new Error("Failed to verify cart");
        }
      })
      .then((response) => {
        if (response.status === 200) {
          setTriggerFetch(true);
          toast.success("Order added Successfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
          });
          // Checkout successful, handle the response as needed
        } else {
          throw new Error("Checkout failed");
          toast.error("Chouckout failed", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
          });

        }
      })
      .catch((error) => {
        console.error(error);
        // Handle the error, show an error message, etc.
      });
  };
  
  

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  } else {
    return (
      <div className="bg-white h-full w-full">
        <Navbar />
        <Divider />

        <div className="flex flex-col sm:flex-row">
          <div className="bg-white rounded-lg p-5 sm:w-3/4">
            <h1 className="text-gray-700 text-3xl font-bold mb-5 font-pop">
              Shopping Bag
            </h1>
            <p className="text-gray-700 text-xl font-bold mb-5 font-pop">
              How would you like to receive your order?
            </p>

            <div className="flex flex-col h-20 sm:flex-row ">
              <button
                className={`flex items-center text-center w-full sm:w-1/2 border-gray-300 border rounded px-4 py-2 m-1 focus:border-primary ${
                  delivery ? "bg-primary text-white" : ""
                }`}
                onClick={() => setDelivery(true)}
              >
                <img src={truck} alt="" className="mr-2" />
                <p className="ml-14 text-gray-700 text-md font-semibold  ">
                  Delivery
                </p>
              </button>

              <button
                className={`flex items-center text-center w-full sm:w-1/2 border-gray-300 border rounded px-4 py-2 m-1 focus:border-primary ${
                  !delivery ? "bg-primary text-white" : ""
                }`}
                onClick={() => setDelivery(false)}
              >
                <img src={store} alt="" className="mr-2" />
                <p className="ml-8 text-gray-700 text-md font-semibold">
                  Collect from store
                </p>
              </button>
            </div>

            {items.length !== 0 ? (
              <div>
                {items.map((item, index) => (
                  <div className="hero h-1/3" key={item.id}>
                    <div className="hero-content flex-col lg:flex-row">
                      <img
                        src={item.product.image}
                        className="h-1/3 w-1/3 rounded-lg shadow-2xl"
                        alt={item.product.name}
                      />
                      <div className="flex flex-col justify-between">
                        <div className="flex flex-row justify-between">
                          <h1 className="text-2xl font-bold">
                            {item.product.name}
                          </h1>
                          <p className="text-right text-xl font-bold py-5 self-center mr-4">
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
                              className="text-center w-full bg-transparent outline-none"
                              type="text"
                              value={item.Quantity}
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
                <Divider />
              </div>
            ) : (
              <p className="text-gray-400 text-xl font-semibold mx-5 my-4 font-pop"git>it's empty ...</p>
            )}
          </div>

          <div className="w-full mr-5 sm:w-1/4 sm:ml-8 mt-8 sm:mt-0">
            <div className="justify-between flex flex-row">
              <p className="text-gray-400 text-xl font-semibold mx-5 my-4 font-pop">
                Products price
              </p>
              <p className="text-gray-400 text-xl font-semibold mx-5 my-4 font-pop">
                {total}DA
              </p>
            </div>
            <p className="text-gray-700 text-xl font-semibold mx-5 my-4 font-pop">
              Order Summary
            </p>
            <div className="justify-between flex flex-row">
              <p className="text-gray-400 text-xl font-semibold mx-5 my-4 font-pop">
                Delivery
              </p>
              {delivery ? (
                <p className="text-gray-400 text-xl font-semibold mx-5 my-4 font-pop">
                  200 DA
                </p>
              ) : (
                <p className="text-gray-400 text-xl font-semibold mx-5 my-4 font-pop">
                  None
                </p>
              )}
            </div>
            <hr className="border-black" />
            <div className="justify-between flex flex-row">
              <p className="text-gray-700 text-xl font-semibold mx-5 my-4 font-pop">
                Total to pay
              </p>
              <p className="text-gray-700 text-xl font-semibold mx-5 my-3 font-pop">
                {total}DA
              </p>
            </div>
            <Divider />
            <div className="flex flex-row">
            <img src={discount} alt="" className="mr-4" />
              <p className="text-gray-700 text-xl font-semibold my-4 mr-8 font-pop">
                
                Have a discount code?
              </p>
              <img src={down} alt="" className="ml-10" onClick={()=>Setdown(true)} />
              
            </div>
            {Down &&  <input
              name="discode"
              id="discode"
              value={discode}
              onChange={handleChange}
              type="text"
              placeholder="Discount code"
              className=" w-full h-12 m-2 px-5 border  outline-none rounded-full border-gray-300 focus:border-primary"
            />  }
            {delivery ? (
              <Link   to='/Delivery'>
                <button className="w-full text-white my-5 h-20 bg-primary border-none rounded px-4 py-2"
              
               >
                  Continue to Checkout
                </button>
                </Link>
            ) : (
              <button
                className="w-full text-white my-5 h-20 bg-primary border-none rounded px-4 py-2"
                onClick={() => handleCheckout()}
              >
                Checkout
              </button>
            )}
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Bag);
