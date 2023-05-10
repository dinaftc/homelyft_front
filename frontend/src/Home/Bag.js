import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import Navbar from "./Navbar";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Addadress from "./Addadress";

function Bag({ isAuthenticated,user }) {
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditingQuantity, setIsEditingQuantity] = useState(false);
  const [editedQuantity, setEditedQuantity] = useState(0);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/home/${user.id}/view-cart/`)
      .then((response) => response.json())
      .then(async (data) => {
        // Map through the items and fetch product information for each item
        const updatedItems = await Promise.all(
          data.map(async (item) => {
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
  }, [user.id]);
  

  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/home/${user.id}/view-cart/${id}`)
      .then(function (response) {
        console.log(" deleted successfully");
        alert("done");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleEditQuantity = (productId, orderQuantity) => {
    setIsEditingQuantity(true);
    
    setEditedQuantity(orderQuantity);
  };

  const handleEditSubmit = (id) => {
    setIsEditingQuantity(false);
    fetch(
      `http://127.0.0.1:8000/home/${user.id}/view-cart/${id}/`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Quantity: editedQuantity }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Update the orders state with the updated quantity
        setOrders(
          orders.map((order) => {
            if (order.id === id) {
              return { ...order, Quantity: editedQuantity };
            } else {
              return order;
            }
          })
        );
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
        <div className="bg-white rounded-lg p-5 w-1/3">
          <h1 className="text-black text-2xl font-bold mb-5 font-pop">
            Shopping Bag
          </h1>

          {items.length === 0 ? (
  <p className="p-5">No items in your shopping bag.</p>
) : (
  <div className="card-container bg-white" style={{ display: "flex" }}>
    {items.map((order, index) => (
      <div key={index} className="card card-compact  bg-base-100 shadow-xl m-5">
        <div className="card-body">
          <h2 className="card-title">{order.product.name}</h2>
          <p>description: {order.product.description}</p>
          <p>price: {order.product.price}</p>
          {isEditingQuantity ? (
            <div key={index}>
              <input
                type="number"
                value={editedQuantity}
                onChange={(e) => setEditedQuantity(e.target.value)}
              />
              <button
                onClick={() => handleEditSubmit(order.id)}
                className="text-white bg-primary rounded-full m-3 p-3"
              >
                Edit
              </button>
              <button
                onClick={() => setIsEditingQuantity(false)}
                className="m-3 p-3 bg-gray-300 text-black rounded-full border-transparent"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div key={index}>
              <p>Quantity: {order.Quantity}</p>
              <button
                onClick={() =>
                  handleEditQuantity(order.id, order.Quantity)
                }
                className="font-pop btn normal-case text-white rounded-full bg-primary border-primary hover:bg-hoverADD hover:border-hoverADD"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(order.id)}
                className="font-pop btn normal-case text-white rounded-full bg-red-500 outline-none border-none"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
)}

              
          <div style={{ display: "flex" }}>
            <h1 className="text-black text-2xl font-bold m-5 font-pop">
              Delivery?
            </h1>
            <button
              className="btn text-white rounded-full bg-primary outline-none border-none m-3"
              onClick={() => setShowModal(!showModal)}
            >
              Add an address
            </button>
            {showModal && (
              <Addadress showModal={showModal} setShowModal={setShowModal} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

 const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user : state.auth.user,
  });

export default connect(mapStateToProps, { logout })(Bag);
