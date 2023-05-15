import { Icon, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ProductInfo = ({isAuthenticated,user}) => {
  const location = useLocation();
  const product = location.state.product;
 
  const [products, setProducts] = useState([]);
   


  const [Quantity, setQuantity] = useState(0);
  const handleAddSubmit = (Quantity) => {
   if (isAuthenticated) {
    axios
      .post(
        `http://127.0.0.1:8000/home/${user.id}/${product.id}/addtocart/`,
        { Quantity: Quantity },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        // Update the orders state with the updated quantity
        console.log(response);
        toast.success("Added to cart", {
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
        toast.error("error", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });}
      else {
        toast.error("Please login", {
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
  };
  
  const incNum = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  
  const decNum = () => {
    setQuantity((prevQuantity) => prevQuantity - 1);
  };
  
  const handleChange = (event) => {
    setQuantity(event.target.value);
  };
  useEffect(() => {
    fetch("http://127.0.0.1:8000/homeLift/products/")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const DESCRIPTION_LIMIT = 100;

  return (
    <div className="bg-white">
      <Navbar></Navbar>
      <div className="flex px-10 py-5  ">
        <div className="w-2/3 grid grid-cols-2 border border-gray-500 p-5 rounded-lg">
        {product.productImages.map((image) => {
              <img src={image} alt="" />
               })}
        </div>
        <div className=" ml-10 w-1/3 space-y-2">
          <p className="text-lg font-bold font-pop">{product.name}</p>
          <div className="flex flex-row">
            <p className="text-gray-500 font pop justify-start">
             {product.description}
            </p>
            <IconButton className="justify-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-heart"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </IconButton>
          </div>
          <p className="text-black font-pop font-bold text-xl">10 000 DA</p>
          <p className="text-gray-500 font-pop text-md"> QTY</p>
          <div className="flex justify-between space-x-2  ">
          <div className="flex relative rounded-full border-2 border-primary w-28 h-10">
                            <button
                              className="absolute left-0 top-2 px-2 rounded-full bg-white text-center"
                              type="button"
                              onClick={() => decNum()}
                            >
                              -
                            </button>

                            <input
                              className="text-center  w-full bg-transparent outline-none"
                              type="text"
                              value={Quantity}
                              onChange={(event) => handleChange(event)}
                            />

                            <button
                              className="absolute right-0 top-2 px-2 rounded-full bg-white text-center"
                              type="button"
                              onClick={() => incNum()}
                            >
                              +
                            </button>
                          </div>
            <div className="w-full ">
            <button
        className="w-1/2 text-white btn outline-none border border-none rounded-full hover:bg-primary bg-primary normal-case"
        onClick={() => handleAddSubmit(Quantity)}
      >     Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div>
          <p className=" px-20 font-pop font-bold text-xl">
            Recommended for you{" "}
          </p>
        </div>
        <div>
          <div className="">
            <div
              className="card-container  overflow-x-auto scrollbar-hide md:scrollbar-default shadow-md overflow-y-hidden bg-white"
              style={{ display: "flex" }}
            >
              {products.map((product, index) => {
                const shortDescription = product.description.slice(
                  0,
                  DESCRIPTION_LIMIT
                );
                const showFullDescriptionForThisProduct =
                  showFullDescription[product.id] || false;

                return (
                  <div className="card card-compact w-96 bg-base-100 shadow-xl m-5">
                    <figure className="h-2/3 rounded-md">
                      <img src={product.image} alt={product.name} />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{product.name}</h2>
                      {product.description.length > DESCRIPTION_LIMIT ? (
                        <div className="">
                          <p>
                            {showFullDescriptionForThisProduct
                              ? product.description
                              : `${shortDescription}...`}
                            <span
                              className="text-primary ml-1 cursor-pointer"
                              onClick={() =>
                                setShowFullDescription({
                                  ...showFullDescription,
                                  [product.id]:
                                    !showFullDescriptionForThisProduct,
                                })
                              }
                            >
                              {showFullDescriptionForThisProduct
                                ? "See less"
                                : "See more"}
                            </span>
                          </p>
                        </div>
                      ) : (
                        <p>{product.description}</p>
                      )}
                      <p className="">
                        {" "}
                        <span className="font-pop text-bold text-primary">
                          Price:
                        </span>{" "}
                        {product.price} DA
                      </p>

                      <div className="flex justify-between ">
                        <div className="flex justify-start mt-2 space-x-3 cursor-pointer">
                          <Icon className="">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class="feather feather-shopping-cart"
                            >
                              <circle cx="9" cy="21" r="1"></circle>
                              <circle cx="20" cy="21" r="1"></circle>
                              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                          </Icon>
                          <Icon>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class="feather feather-heart"
                            >
                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                          </Icon>
                        </div>
                      </div>
                    </div>
                  
                  </div>
                );
              })}
              <style jsx>{`
                .card-container {
                  display: flex;
                  width: full;
                  justify-content: flex-start;
                }

                .card {
                  flex: 1 0 20%;
                  height: 400px;
                }
                .card-body {
                  padding: 0.5rem;

                  display: flex;
                  justify-content: space-between;
                }

                .card-title {
                  margin-top: 0.2rem;
                  font-size: 1rem;
                }
                .popup {
                  position: fixed;
                  width: 100%;
                  height: 100%;
                  top: 0;
                  left: 0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  background-color: rgba(0, 0, 0, 0.7);
                }
                .popup-inner {
                  width: 50%;
                  padding: 2rem;
                  background-color: white;
                  border-radius: 5px;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                }
                .popup-inner h3 {
                  margin-top: 0;
                }
                .popup-inner input {
                  margin-bottom: 1rem;
                }
                .popup-inner button {
                  margin: 0.5rem;
                  padding: 0.5rem 1rem;
                  border: none;
                  border-radius: 5px;
                  background-color: #3f51b5;
                  color: white;
                  font-size: 1rem;
                  cursor: pointer;
                  transition: all 0.2s ease-in-out;
                }
                .popup-inner button:hover {
                  background-color: #1a237e;
                }
              `}</style>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
        <div className="grid grid-flow-col gap-4">
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
        </div>
        <div>
          <div className="grid grid-flow-col gap-4">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </div>
        <div>
          <p>
            Copyright © 2023 - All right reserved by
            <span className="text-primary font-pop font-bold text-lg ml-1">
              {" "}
              HomeLift
            </span>{" "}
          </p>
        </div>
      </footer>
      <ToastContainer />
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, {}) (ProductInfo);