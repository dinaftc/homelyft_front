import React, { useEffect, useState } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Addadress({ showModal, setShowModal }) {
  const [user, setUser] = useState({});

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
  const [formData, setFormData] = useState({
    adresse_line: user.adresse_line,
    code_postal: user.code_postal,
    daira: user.daira,
    mairie: user.mairie,
    street: user.street,
    wilaya: user.wilaya,
   
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(user.email)
    const id = user.id;
    const data = new FormData();
    data.append("fullname", user.fullname);
    data.append("email", user.email);
    data.append("phone_number", user.phone_number);
    data.append("password", user.password);
    data.append("adresse_line", formData.adresse_line);
    data.append("code_postal", formData.code_postal);
    data.append("daira", formData.daira);
    data.append("mairie", formData.mairie);
    data.append("street", formData.street);
    data.append("wilaya", formData.wilaya);

    axios
      .put(`http://127.0.0.1:8000/account/${id}/view-profile/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      })

      .then((response) => {
        console.log("Profile updated:", response.data);
        toast.success("Profile updated Successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        toast.error("Error updating profile", {
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
    setShowModal(!showModal);
  };

  return (
    
      <div className="w-full h-full relative flex  my-20 justify-center items-center">
        <form
          className="bg-white rounded-lg py-6  px-10"
          onSubmit={handleSubmit}
        >
          <div className="InputBox">
            <input
              name="wilaya"
              id="wilaya"
              value={formData.wilaya}
              onChange={handleChange}
              required
              type="text"
            />
            <span>Wilaya</span>
          </div>
          <div className="InputBox">
            <input
              name="daira"
              id="daira"
              value={formData.daira}
              onChange={handleChange}
              type="text"
            />
            <span>Daira</span>
          </div>

          <div className="InputBox">
            <input
              name="mairie"
              id="mairie"
              value={formData.mairie}
              onChange={handleChange}
              required
              type="text"
            />
            <span>Mairie</span>
          </div>

          <div className="InputBox">
            <input
              name="code_postal"
              id="code_postal"
              value={formData.code_postal}
              onChange={handleChange}
              type="number"
            />
            <span>Code postal</span>
          </div>
          <div className="InputBox">
            <input
              name="street"
              id="street"
              value={formData.street}
              onChange={handleChange}
              type="text"
            />
            <span>street</span>
          </div>
          <div className="InputBox">
            <input
              name="adresse_line"
              id="adresse_line"
              value={formData.adresse_line}
              onChange={handleChange}
              type="text"
            />
            <span>adresse line</span>
          </div>

          <div className="my-5">
            <button
              className=" font-pop w-20 btn normal-case text-white rounded-full bg-primary  border-primary hover:bg-hoverADD hover:border-hoverADD "
              type="submit"
            >
              add
            </button>
            <button
              onClick={() => setShowModal(!showModal)}
              className="font-pop btn btn-outline normal-case bg-gray-300 text-black hover:bg-gray-200 rounded-full border-transparent hover:border-transparent hover:text-black"
            >
              Cancel
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>

   
    
  );
}
