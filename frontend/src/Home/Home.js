import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Navbar from './Navbar';
import axios from "axios";

function Home({ isAuthenticated }) {
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [quantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/auth/users/me/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
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

  const handleAddToCartClick = (productId) => {
    setSelectedProductId(productId);
    setShowPopup(true);
  };

 

  const handleAddToCartSubmit = async () => {
    if (selectedProductId !== null && quantity > 0) {
      if (!isAuthenticated) {
        alert('Please sign up or login to buy');
      } else {
      try {  const response = await axios.post(
          `http://127.0.0.1:8000/home/${user.id}/${selectedProductId}/addtocart/`,
          { Quantity: quantity },
          { headers: { 'Content-Type': 'application/json' } }
        );
          
          console.log(response.data);
        } 
         catch (error) {
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
    { (isAuthenticated && (user.role===3 )) || !isAuthenticated?<div> <Navbar /> 
      <div className="card-container bg-white" style={{ display: "flex" }}>
        {products.map((product, index) => (
          <div className="card card-compact w-96 bg-base-100 shadow-xl m-5">
            <figure className='h-2/3'>
              <img src={product.image} alt={product.name} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.name}</h2>
              <p>{product.description}</p>
              <p>Price :{product.price} DA</p>
              <div className="card-actions justify-end">
                <button
                  className="btn bg-primary border-none outline-none"
                  onClick={() => handleAddToCartClick(product.id)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <h3>Enter Quantity</h3>
            <input
               type="number"
               value={quantity}
               onChange={(e) => setSelectedQuantity(e.target.value)}
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
      `}</style></div> : <p>admin</p>}
    </div>
  );}
  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
  });
  
  export default connect(mapStateToProps, { })(Home);