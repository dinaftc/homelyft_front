import { Divider, Icon, IconButton, Box, Modal } from "@mui/material";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import ViewReviews from "./ViewReviews";
import { connect } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Rating from "@mui/material/Rating";
import { useLocation, useNavigate } from "react-router-dom";

const ProductInfo = ({ isAuthenticated, user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);

  const [value, setValue] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProductDescription, setSelectedProductDescription] =
    useState("");
 

  const [showPopup, setShowPopup] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [Categories, setCategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const product = location.state.product;
  
  
  

  const handleAddToCartClick = (productId) => {
    setSelectedProductId(productId);
    setShowPopup(true);
  };

  const handleAddToCartSubmit = async () => {
    if (selectedProductId !== null && quantity > 0) {
      console.log(selectedProductId);
      if (!isAuthenticated) {
        toast.error("Please sign up or login to buy", {
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
        try {
          const response = await axios.post(
            `http://127.0.0.1:8000/home/${user.id}/${selectedProductId}/addtocart/`,
            { Quantity: quantity },
            { headers: { "Content-Type": "application/json" } }
          );

          console.log(response.data);
          if (response.status === 201) {
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
          } else {
            toast.error("Product already exists in cart", {
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
        } catch (error) {
          console.error(error);
        }
      }
    } else {
      if (quantity <= 0) {
        toast.error("Negative value", {
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
    }

    setShowPopup(false);
    setSelectedProductId(null);
    setQuantity(1);
  };
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
           
          </div>
          <p
            className="text-black text-2xl font-pop font-bold "
            onDoubleClick={(e) => {
              e.preventDefault();
            }}
            style={{ userSelect: "none" }}
          >
            {product.price} <span>DA</span>
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
       
        <div className="w-full ">
        <div className=" my-8 space-y-4">
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
            <Modal open={viewReviewsModalOpen}>
              <ViewReviews
                onClose={closeViewReviewsModal}
                user={user}
                product={product}
              />
            </Modal>
          </div>
          <Divider className="" />
        </div>
      </div>
      </div> </div>

     

      <div className="mt-5">
        <div className="px-14">
          <Divider></Divider>
          <p
            className=" font-pop font-bold text-3xl mb-3 mt-3"
            onDoubleClick={(e) => {
              e.preventDefault();
            }}
            style={{ userSelect: "none" }}
          >
            Recommended for you
          </p>
          <Divider />
        </div>
        <div className="w-fit bg-white m-3" style={{ display: "flex" }}>
          {products.map((product, index) => {
            const shortDescription = product.description.slice(
              0,
              DESCRIPTION_LIMIT
            );
            const showFullDescriptionForThisProduct =
              showFullDescription[product.id] || false;

            return (
              <div className="card  card-compact w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-base-100 shadow-xl m-3">
                <figure className=" h-1/3 rounded-md">
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </figure>
                <div className="card-body ">
                  <h2 className="font-pop font-bold text-xl">{product.name}</h2>
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
                              [product.id]: !showFullDescriptionForThisProduct,
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
                  <div>
                    <p className="font-pop font-bold text-primary text-2xl">
                      {" "}
                      {product.price} DA
                    </p>
                  </div>
                  <div className="flex flex-row">
                    <Rating name="read-only" value={value} readOnly />
                    <p className="mt-1 ml-1 font-pop text-gray-500">(100)</p>
                  </div>
                  <div className="flex justify-between ">
                    <div className="flex justify-start mt-2 space-x-3 cursor-pointer ">
                      <button
                        className="underline "
                        onClick={() =>
                          navigate(`/product-details/${product.id}`, {
                            state: { product },
                          })
                        }
                      >
                        more details
                      </button>
                      <button onClick={() => handleAddToCartClick(product.id)}>
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
                      </button>
                     
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {showPopup && (
            <div className="popup">
              <div className="popup-inner">
                <h3>Enter Quantity</h3>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <button onClick={handleAddToCartSubmit}>Add to Cart</button>
                <button onClick={() => setShowPopup(false)}>Cancel</button>
              </div>
            </div>
          )}
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
              border-radius: 50px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
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
              border-radius: 50px;
              background-color: #25a5aa;
              color: white;
              font-size: 1rem;
              cursor: pointer;
              transition: all 0.2s ease-in;
            }
            .popup-inner button:hover {
              background-color: #1a7680;
            }
          `}</style>
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
