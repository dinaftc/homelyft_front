import { Icon, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
const ProductInfo = () => {
  const [products, setProducts] = useState([]);
  let [quantity, setQuantity] = useState(1);
  const soustractQuantity = () => {
    if (quantity === 1) {
      alert("Quantity minimum is 1 ");
    } else setQuantity(quantity - 1);
  };
  const addQuantity = () => {
    if (quantity > 9) {
      alert("Quantity non disponible");
    } else setQuantity(quantity + 1);
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
    <div className="p-20">
      <div className="flex  ">
        <div className="w-2/3 grid grid-cols-2"></div>
        <div className=" ml-10 w-1/3 space-y-2">
          <p className="text-lg font-bold font-pop">Product name</p>
          <div className="flex flex-row">
            <p className="text-gray-500 font pop justify-start">
              hhhhhhhhhhhhhhhhhhhhhhhhhhhhh
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
            <div className="flex justify-between px-3 w-1/2 bg-white border border-primary rounded-full space-x-2 ">
              <IconButton className="" onClick={soustractQuantity}>
                {" "}
                -{" "}
              </IconButton>
              <p className="mt-3 font-pop font "> {quantity} </p>
              <IconButton className="" onClick={addQuantity}>
                +
              </IconButton>
            </div>
            <div className="w-full ">
              <button className=" w-1/2 text-white btn outline-none border border-none rounded-full hover:bg-primary bg-primary normal-case  ">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div>
          <p className="font-pop font-bold text-xl">Recommended for you </p>
        </div>
        <div>
          <div>
            <div
              className="card-container bg-white"
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
                      <div className="flex flex-row">
                        <p className="mt-1 ml-1 font-pop text-gray-500">
                          (100)
                        </p>
                      </div>
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
                  flex-wrap: wrap;
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
    </div>
  );
};

export default ProductInfo;
