import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Rating from "@mui/material/Rating";
import { Icon } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

function Home({ isAuthenticated, user }) {
  const [products, setProducts] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const DESCRIPTION_LIMIT = 100;
  const [value, setValue] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProductDescription, setSelectedProductDescription] =
    useState("");
    const navigate = useNavigate();
    const location = useLocation();

  const [showPopup, setShowPopup] = useState(false);

  const [quantity, setSelectedQuantity] = useState(1);
  const [Categories, setCategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/homeLift/categories/")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSearch = (searchTerm) => {
    axios
      .get(`http://127.0.0.1:8000/homeLift/products/?search=${selectedSubcategory}`)
      .then((response) => {
        // handle the response data here
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        // handle errors here
        console.log(error);
      });
  };
  useEffect(() => {
    handleSearch();
  }, [ selectedSubcategory]);
  

  const handleAddToCartClick = (productId) => {
    setSelectedProductId(productId);
    setShowPopup(true);
  };

  const handleAddToCartSubmit = async () => {
    if (selectedProductId !== null && quantity > 0) {
      if (!isAuthenticated) {
        alert("Please sign up or login to buy");
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
    }

    setShowPopup(false);
    setSelectedProductId(null);
    setSelectedQuantity(1);
  };

  return (
    <div>
      {(user || !isAuthenticated) && (
        <>
          {(isAuthenticated && user.role === 3) || !isAuthenticated ? (
            <div className="bg-white">
              <Navbar setProducts={setProducts} />
             
                 <div className="mb-5 ">
                {Categories.map((category) => (
                  <div key={category.id} className="relative inline-block">
                    <select
                      className="select w-36 max-w-xs bg-transparent outline-none border-none focus:bg-offwhite"
                      onChange={(e) => setSelectedSubcategory(e.target.value)}
                    >
                      <option disabled selected>
                        {category.name}
                      </option>
                      {category.subCategories.map((subcategory) => (
                        <option
                          key={subcategory.id}
                          className="bg-transparent outline-none hover:bg-primary focus:bg-offwhite"
                        >
                          {subcategory.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
                <hr />
                 </div>
                 <div
                className="card-container bg-white "
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
                <p className="">
                  {" "}
                  <span className="font-pop text-bold text-primary">
                    Price:
                  </span>{" "}
                  {product.price} DA
                </p>
                <div className="flex flex-row">
                  <Rating name="read-only" value={value} readOnly />
                  <p className="mt-1 ml-1 font-pop text-gray-500">(100)</p>
                </div>
                <div className="flex justify-between ">
                  <div className="flex justify-start mt-2 space-x-3 cursor-pointer">
                  <button onClick={() => navigate(`/product-details/${product.id}`, { state: { product } })}>
         more details
          </button>
                    <button onClick={handleAddToCartClick}>
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
                    </button>
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
                {showPopup && (
                  <div className="popup">
                    <div className="popup-inner">
                      <h3>Enter Quantity</h3>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setSelectedQuantity(e.target.value)}
                      />
                      <button onClick={handleAddToCartSubmit}>
                        Add to Cart
                      </button>
                      <button onClick={() => setShowPopup(false)}>
                        Cancel
                      </button>
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
                    border-radius:50px;
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
                    border-radius:50px;
                    background-color: #25A5AA;
                    color: white;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: all 0.2s ease-in-out;
                  }
                  
                `}</style>
              </div>
            </div>
          ) : (
            <p>admin</p>
          )}
        </>
      )}
      <ToastContainer />
    </div>
  );
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(Home);
