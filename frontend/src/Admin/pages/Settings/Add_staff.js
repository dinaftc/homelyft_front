/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import { Link,Navigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import at from "../../../Login/at.png";
import eyeoff from "../../../Login/eye-off.png";
import eye from '../../../Login/eye.png'
import hash from "../../../Login/hash.png";
import user from "../../../Login/user.png";



function Add_staff() {
  const [email, setEmail] = useState("");
  const [phone_number, setphone_number] = useState("");
  const [full_name, setfullname] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handlePhoneChange = (event) => setphone_number(event.target.value);
  const handleUserChange = (event) => setfullname(event.target.value);


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullname: full_name,
        email: email,
        phone_number: phone_number,
        password: password
      })
    };
  
    try {
      const response = await fetch('http://127.0.0.1:8000/account/staff-list/add/', requestOptions);
      if (!response.ok) {
        throw new Error('Failed to add staff');
      }
      toast.success('Staff Added Successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    } catch (error) {
      console.error(error);
      toast.error('Failed', {
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
  
 


  return (
    <div className="w-full h-full flex justify-center items-center">
      <form className="bg-white rounded-lg py-4 px-12" onSubmit={handleSubmit}>
        <div className="my-2">
          <h1 className="text-3xl font-bold font-pop  text-center text-primary ">
           Add Staff
          </h1>
         
        </div>
 
          <div className="InputBox">
            <input
              onChange={handleUserChange}
              value={full_name}
              required
              type='text'/>
           <span>Full name*</span>
            <img src={user} alt="" />
          </div>
    
       
          <div className="InputBox">
            <input
              onChange={handleEmailChange}
              value={email}
              required
              type='email'
             
            />
            <span>Email*</span>
            <img src={at} alt="" />
          </div>
      
          <div className="InputBox">
            <input
              onChange={handlePhoneChange}
              value={phone_number}
              required
              type='tel'
             
            />
            <span>Phone number
              8
            </span>
            <img src={hash} alt="" />
          </div>
       
          <div className="InputBox ">
            <input
              onChange={handlePasswordChange}
              value={password}
              required
              type={showPassword? 'text' : 'password'}
              minLength={8}
            />
            <span>Password*</span>
           
             <img src={showPassword ? eyeoff : eye } alt=""  onClick={handleClickShowPassword}/> 
            
           
          </div>

        <div className="my-7">
          <button
            className="btn btn-active outline-none rounded-lg text-white w-full bg-primary normal-case  "
            type="submit"
          >
           Add new staff
          </button>
       
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Add_staff;
