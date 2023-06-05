import { Divider, Icon, IconButton, Box, Modal } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import ViewReviews from "./ViewReviews";
import { connect } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductInfo = ({ isAuthenticated, user }) => {
  const location = useLocation();
  const product = location.state.product;

  const [products, setProducts] = useState([]);

  const [quantity, setQuantity] = useState(0);
  const handleAddSubmit = (Quantity) => {
    if (isAuthenticated) {
      axios
        .post(
          `http://127.0.0.1:8000/home/${user.id}/${product.id}/addtocart/`,
          { Quantity: quantity },
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
        });
    } else {
      toast.error("Please login", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const incNum = () => {
    if (quantity < product.quantity) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const decNum = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
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
  const [viewReviewsModalOpen, setViewReviewsModalOpen] = useState(false);
  const [addReviewModalOpen, setAddReviewModalOpen] = useState(false);
  const openViewReviewsModal = () => {
    setViewReviewsModalOpen(true);
  };

  const closeViewReviewsModal = () => {
    setViewReviewsModalOpen(false);
  };

  const openAddReviewModal = () => {
    setAddReviewModalOpen(true);
  };

  const closeAddReviewModal = () => {
    setAddReviewModalOpen(false);
  };

  return (
    <div className="bg-white">
      <Navbar></Navbar>
      <div className="flex flex-col md:flex-row px-14 py-5 space-y-5 md:space-y-0 md:space-x-10">
        <div className="md: w-3/5 border border-gray-500 p-10 rounded-lg">
          <img src={product.image} alt="" className="w-full h-full" />
        </div>
        <div className="md:w-2/5 space-y-2">
          <p
            className="text-3xl font-bold font-pop"
            onDoubleClick={(e) => {
              e.preventDefault();
            }}
            style={{ userSelect: "none" }}
          >
            {product.name}
          </p>
          <div
            className="flex flex-row"
            onDoubleClick={(e) => {
              e.preventDefault();
            }}
            style={{ userSelect: "none" }}
          >
            <p className="text-gray-500 text-lg font-pop justify-start">
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
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-heart"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </IconButton>
          </div>
          <p
            className="text-black text-2xl font-pop font-bold "
            onDoubleClick={(e) => {
              e.preventDefault();
            }}
            style={{ userSelect: "none" }}
          >
            10 000 DA
          </p>
          <p
            className="text-gray-500 text-xl font-pop text-md"
            onDoubleClick={(e) => {
              e.preventDefault();
            }}
            style={{ userSelect: "none" }}
          >
            {" "}
            QTY
          </p>
          <div className="flex  space-x-2">
            <div className=" w-1/2 justify-between px-4 flex flex-row rounded-full border border-primary ">
              <Icon
                className=" font-pop text-xl mt-2 cursor-pointer font-bold"
                onClick={decNum}
                onDoubleClick={(e) => {
                  e.preventDefault();
                }}
              >
                -
              </Icon>
              <p
                className=" font-bold mt-2 text-xl font-pop cursor-not-allowed "
                onDoubleClick={(e) => {
                  e.preventDefault();
                }}
                style={{ userSelect: "none" }}
              >
                {quantity}
              </p>
              <Icon
                className=" font-pop font-bold text-xl mt-2 cursor-pointer"
                onClick={incNum}
                disabled={quantity >= product.quantity}
                onDoubleClick={(e) => {
                  e.preventDefault();
                }}
                style={{ userSelect: "none" }}
              >
                +
              </Icon>
            </div>
            <div className="w-1/2">
              <button
                className=" w-full text-base text-white btn outline-none border border-none rounded-full hover:bg-primary bg-primary normal-case"
                onClick={() => handleAddSubmit(quantity)}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full ">
        <div className="w-3/5  px-14 space-y-4">
          <Divider className="" />
          <div className="flex justify-between">
            <h2
              className="font-pop font-bold text-3xl "
              onDoubleClick={(e) => {
                e.preventDefault();
              }}
              style={{ userSelect: "none" }}
            >
              Reviews here !
            </h2>
            <IconButton onClick={openViewReviewsModal}>
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
                class="feather feather-arrow-right"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </IconButton>
            <Modal open={viewReviewsModalOpen} >
              <ViewReviews onClose={closeViewReviewsModal} />
            </Modal>
          </div>
          <Divider className="" />
        </div>
      </div>

      <div className="mt-5">
        <div className="px-14">
          <p
            className=" font-pop font-bold text-3xl mb-3"
            onDoubleClick={(e) => {
              e.preventDefault();
            }}
            style={{ userSelect: "none" }}
          >
            Recommended for you
          </p>
          <Divider />
        </div>
        <div className="">
          <div className="card-container flex flex-wrap justify-start p-5">
            {products.map((product, index) => {
              const shortDescription = product.description.slice(
                0,
                DESCRIPTION_LIMIT
              );
              const showFullDescriptionForThisProduct =
                showFullDescription[product.id] || false;

              return (
                <div
                  key={index}
                  className="card card-compact w-full md:w-1/2 lg:w-1/3 xl:w-1/4 bg-base-100 shadow-xl m-5"
                >
                  <figure className="h-2/3 rounded-md">
                    <img src={product.image} alt={product.name} />
                  </figure>
                  <div className="card-body">
                    <h2
                      className="card-title"
                      onDoubleClick={(e) => {
                        e.preventDefault();
                      }}
                      style={{ userSelect: "none" }}
                    >
                      {product.name}
                    </h2>
                    {product.description.length > DESCRIPTION_LIMIT ? (
                      <div
                        className=""
                        onDoubleClick={(e) => {
                          e.preventDefault();
                        }}
                        style={{ userSelect: "none" }}
                      >
                        <p
                          onDoubleClick={(e) => {
                            e.preventDefault();
                          }}
                          style={{ userSelect: "none" }}
                        >
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
                      <p
                        onDoubleClick={(e) => {
                          e.preventDefault();
                        }}
                        style={{ userSelect: "none" }}
                      >
                        {product.description}
                      </p>
                    )}
                    <p
                      className=""
                      onDoubleClick={(e) => {
                        e.preventDefault();
                      }}
                      style={{ userSelect: "none" }}
                    >
                      <span className="font-pop text-bold text-primary">
                        Price:
                      </span>{" "}
                      {product.price} DA
                    </p>

                    <div className="flex justify-between">
                      <div className="flex justify-start mt-2 space-x-3 cursor-pointer">
                        <Icon className="">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-shopping-cart"
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
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-heart"
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
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(ProductInfo);
