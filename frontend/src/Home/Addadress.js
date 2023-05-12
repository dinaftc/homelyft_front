import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { load_user } from "../actions/auth";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function Addadress({ user, load_user }) {
  const [items, setItems] = useState([]);
  const [step1, setStep1] = useState(false);
  const [formData, setFormData] = useState({
    fullname: user.fullname,
    email: user.email,
    phone_number: user.phone_number,
    code_postal: user.code_postal,
    daira: user.daira,
    mairie: user.mairie,
    street: user.street,
    wilaya: user.wilaya,
  });

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(user.email);
    const id = user.id;
    const data = new FormData();

    data.append("code_postal", formData.code_postal);
    data.append("daira", formData.daira);
    data.append("mairie", formData.mairie);
    data.append("street", formData.street);
    data.append("wilaya", formData.wilaya);
    data.append("fullname", formData.fullname);
    data.append("email", formData.email);
    data.append("phone_number", formData.phone_number);
    axios
      .patch(`http://127.0.0.1:8000/account/${id}/view-profile/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      })

      .then((response) => {
        console.log("Profile updated:", response.data);
        toast.success("Adresse added Successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        load_user();
        setStep1(true);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        toast.error("Error updating adresse", {
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

  return (
    <div className="bg-white h-full w-full">
      <Navbar></Navbar>

      <div className="flex">
        {!step1 ? (
          <div className=" bg-white rounded-lg p-5 m-5 w-3/4">
            <h1 className="text-black text-3xl ml-5 font-bold mb-5 font-pop relative">
              <span className="absolute rounded-full bg-black text-white text-xl font-bold px-3 py-1  -left-11 top-0">
                1
              </span>
              Where Should we send your order?
            </h1>
            <p className="text-gray-700 text-xl font-bold mb-5 font-pop">
              Delivery adresse
            </p>

            <input
              name="fullname"
              id="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
              type="text"
              placeholder="Full Name*"
              className="w-3/4 h-12 m-2 px-5 border  outline-none rounded-full border-gray-300 focus:border-primary"
            />

            <input
              name="street"
              id="street"
              value={formData.street}
              onChange={handleChange}
              type="text"
              placeholder="House number and Street*"
              className="w-3/4 h-12 m-2 px-5 border  outline-none rounded-full border-gray-300 focus:border-primary"
            />

            <input
              name="mairie"
              id="mairie"
              value={formData.mairie}
              onChange={handleChange}
              required
              type="text"
              placeholder="City*"
              className="w-3/4 h-12 m-2 px-5 border  outline-none rounded-full border-gray-300 focus:border-primary"
            />

            <input
              name="code_postal"
              id="code_postal"
              value={formData.code_postal}
              onChange={handleChange}
              type="number"
              placeholder="Zip code*"
              className="w-3/4 h-12 m-2 px-5 border outline-none rounded-full border-gray-300 focus:border-primary"
            />

            <input
              name="wilaya"
              id="wilaya"
              value={formData.wilaya}
              onChange={handleChange}
              required
              type="text"
              placeholder="Wilaya*"
              className="w-3/4 h-12 m-2 px-5 border rounded-full outline-none border-gray-300 focus:border-primary"
            />

            <p className="text-gray-700 text-xl font-bold my-2 font-pop">
              Contact Details
            </p>

            <input
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              type="email"
              placeholder="Email"
              className="w-3/4 h-12 m-2 px-5 border rounded-full outline-none border-gray-300 focus:border-primary"
            />

            <input
              name="phone_number"
              id="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              type="number"
              placeholder="Phone Number*"
              className="w-3/4 h-12 m-2 px-5 border rounded-full outline-none border-gray-300 focus:border-primary"
            />

            <div className="my-5">
              <button
                className="w-3/4 h-12 m-2  font-pop btn normal-case text-white rounded-full bg-primary  border-primary hover:bg-hoverADD hover:border-hoverADD "
                onClick={handleSubmit}
              >
                Continue
              </button>
            </div>
            <hr />
            <h1 className="text-gray-400 text-3xl ml-5 font-bold m-5 font-pop relative">
              <span className="absolute rounded-full bg-white text-gray-400 border-2 border-gray-400 text-xl font-bold px-3 py-1  -left-11 top-0">
                2
              </span>
              Payment Details
            </h1>
            <hr />
          </div>
        ) : (
          <div className=" bg-white rounded-lg p-5 m-5 w-3/4">
            <hr />
            <h1 className="text-black text-3xl ml-5 font-bold m-5 font-pop relative">
              <span className="absolute rounded-full bg-white text-black border-2 border-black text-xl font-bold px-3 py-1  -left-11 top-0">
                1
              </span>
              Your Details
            </h1>
            <div class="m-4">
              <p class="text-left text-sm text-gray-400 font-medium">
                {user.fullname}
              </p>

              <p class="text-left text-sm text-gray-400 font-medium">
                {user.street}
              </p>
              <p class="text-left text-sm text-gray-400 font-medium">
                {user.mairie}
              </p>
              <p class="text-left text-sm text-gray-400 font-medium">
                {user.code_postal}
              </p>
              <p class="text-left text-sm text-gray-400 font-medium">
                {user.wilaya}
              </p>
              <p class="text-left text-sm text-gray-400 font-medium">
                {user.email}
              </p>
              <p class="text-left text-sm text-gray-400 font-medium">
                {user.phone_number}
              </p>
            </div>

            <hr />

            <h1 className="text-black text-3xl ml-5 font-bold mb-5 font-pop relative">
              <span className="absolute rounded-full bg-black text-white text-xl font-bold px-3 py-1  -left-11 top-0">
                2
              </span>
              Payment Details
            </h1>
          </div>
        )}
        <div className=" w-1/4 mr-8 fixed top-26 right-0">
          <div className="justify-between flex flex-row">
            <p className="text-black text-xl font-semibold mr-5 my-5  font-pop">
              Your Order
            </p>
            <Link
              className="text-gray-400 text-xl font-semibold m-5 font-pop"
              to="/Shopping-bag"
            >
              Edit
            </Link>
          </div>
          <div className="flex overflow-x-auto">
            {items.length !== 0 ? (
              items.map((item) => (
                <img
                  src={item.product.image}
                  alt=""
                  className="h-20 w-20 mr-4 ml-2 object-cover"
                />
              ))
            ) : (
              <p>Fetching ...</p>
            )}
          </div>

          <p className="text-black text-xl font-semibold my-4 font-pop">
            Order Summary
          </p>
          <div className="justify-between flex flex-col">
            <p className="text-gray-400 text-xl font-semibold m-2 font-pop">
              Subtotal
            </p>
            <p className="text-gray-400 text-xl font-semibold m-2 font-pop">
              Delivery
            </p>
          </div>
          <hr className="border-black m-2" />
          <div className="justify-between flex flex-row">
            <p className="text-gray-700 text-xl font-semibold m-2 font-pop">
              Total to pay
            </p>
          <hr />
          </div>
        </div>
      </div>
      <ToastContainer />
      <hr />
    </div>
  );
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});
export default connect(mapStateToProps, { load_user })(Addadress);
