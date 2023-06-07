import React, { useState } from "react";
import axios from "axios";
import { load_user } from "../../../actions/auth";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "../../../Home/Navbar";
function Profile({ user, load_user }) {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    phone_number: "",
    shipping_address: "",
    payment_info: "",
    profile_picture: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    setFormData({
      ...formData,
      profile_picture: event.target.files[0],
    });
  };

  const handleEditProfile = () => {
    setEditMode(true);
    setFormData({
      username: user.username,
      fullname: user.fullname,
      email: user.email,
      phone_number: user.phone_number,
      payment_info: user.payment_info,
      profile_picture: user.profile_picture,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = user.id;
    const data = new FormData();
    data.append("username", formData.username);
    data.append("fullname", formData.fullname);
    data.append("email", formData.email);
    data.append("phone_number", formData.phone_number);

    data.append("payment_info", formData.payment_info);
    if (formData.profile_picture !== user.profile_picture) {
      data.append("profile_picture", formData.profile_picture);
    }

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
        load_user();
        setEditMode(false);
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
  };

  if (editMode && user) {
    return (
      <div className={user.role === 3 ? "bg-white" : "dashboard-content"}>
        {user.role === 3 && <Navbar /> }
        <div className="w-full h-full relative flex  my-20 justify-center items-center">
          <form
            className="bg-white rounded-lg py-6  px-10"
            onSubmit={handleSubmit}
          >
            <div class="flex justify-right p-6">
              <label for="profile_picture" class="cursor-pointer">
                <img
                  src={formData.profile_picture}
                  alt={formData.fullname}
                  class="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
                />
                <input
                  id="profile_picture"
                  name="profile_picture"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  class="hidden"
                />
              </label>
            </div>

            <div className="InputBox">
              <input
                name="fullname"
                id="fullname"
                value={formData.fullname}
                onChange={handleChange}
                required
                type="text"
              />
              <span>Full name</span>
            </div>
            <div className="InputBox">
              <input
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                type="text"
              />
              <span>Username</span>
            </div>

            <div className="InputBox">
              <input
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                type="email"
              />
              <span>Email</span>
            </div>

            <div className="InputBox">
              <input
                name="phone_number"
                id="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                required
                type="tel"
              />
              <span>Phone number</span>
            </div>
           

            <div className="my-5">
              <button
                className="btn btn-active outline-none rounded-lg text-white w-full bg-primary normal-case  "
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div className={user.role === 3 ? "bg-white" : "dashboard-content"}>
      {user.role === 3 && <Navbar /> }
        <div class="container  mt-40 mb-10">
          <div className={user.role === 3 ? "ml-44" : "mr-5"}>
            <div class=" bg-white relative shadow-xl rounded-lg w-full ">
              <div class="flex justify-left p-5">
                <img
                  src={user.profile_picture}
                  alt={user.fullname}
                  class="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
                />
              </div>

              <div className="mt-2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <p className="text-center text-ms text-gray-400 font-medium">Name:</p>
  <p className="text-center text-m text-black-400 font-medium">{user.fullname}</p>
  <p className="text-center text-ms text-gray-400 font-medium">Email:</p>
  <p className="text-center text-m text-black-400 font-medium">{user.email}</p>
</div>

              <div className="flex justify-end">
                <button
                  className="bg-primary text-white rounded-3xl p-4 m-3"
                  onClick={handleEditProfile}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { load_user })(Profile);
