/* eslint-disable no-unused-vars */
import React, { useState,useEffect } from "react";

import { Link, Navigate } from "react-router-dom";

import { connect } from "react-redux";

import { login} from "../actions/auth";

import { FcGoogle } from "react-icons/fc";

import "./Login.css";
import at from "./at.png";
import eyeoff from "./eye-off.png";
import eye from "./eye.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  

const Login = ({login, isAuthenticated,LOGIN_FAIL}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const [enterEmail, setEnterEmail] = useState(false);
  const handleEmailsent = () => setEnterEmail(!enterEmail);



  const onSubmit = async (event) => {
    event.preventDefault();
   login(email,password);
   if (LOGIN_FAIL){
    toast.warn('Please submit a valid email and password', {
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
 

  if (isAuthenticated) {
    return <Navigate to='/Home' />
}

  return (
    <div className="w-screen h-screen flex justify-center items-center ">
      <form className=" rounded-lg py-4 px-12" onSubmit={e=>onSubmit(e)}>
        <div className="my-2">
          <h1 className="text-3xl font-bold font-pop text-center text-primary ">
            Hello Again!
          </h1>
          <div className="my-1 flex flex-col text-center px-2 mb-7">
            <p className="text-gray-400 font-pop font-normal font-400 ">
              Pour que vous puissiez connecter avec succés
            </p>
            <p className="text-gray-400 font-pop font-normal font-400">
              veuillez saisir vos informations{" "}
            </p>
          </div>
        </div>
        
          <div className="InputBox">
            <input
              onChange={handleEmailChange}
              value={email}
              required
            
            />
            <span>Email</span>
            <img src={at} alt="" />
          </div>
       
          <div className="InputBox ">
            <input
              onChange={handlePasswordChange}
              value={password}
              required
              type={showPassword? 'text' : 'password'}
              minLength={8}
            />
            <span>Password</span>
           
             <img src={showPassword ? eyeoff : eye } alt=""  onClick={handleClickShowPassword}/> 
            
           
          </div>
        
        <div className="flex justify-end my-1">
          <Link to='/Resetpwd'
            className="text-sm font-pop font-normal font-400  text-primary  "
            onClick={handleEmailsent}
          >
            Forgot password?
          </Link>
        </div>
        <div className="my-7">
          <button
            className=" text-lg btn btn-active border-0 rounded-lg text-white w-full bg-primary normal-case font-pop font-normal font-600"
            type="submit"
          >
            Login
          </button>
          <div className="flex flex-row justify-center">
            <div className="my-1 text-center ">
              <p className="text-sm inline-block text-gray-500 font-pop font-normal font-400">
                don't have an account yet?&nbsp;
              </p>

              <Link
                to="Signup"
                className="text-sm inline-block text-primary font-pop font-normal font-400 "
              >
                Sign up
              </Link>
            </div>
          </div>

        { /* <div className="container w-full flex justify-center">
            <div className="flex flex-col w-full  border-opacity-100 ">
              <div className="divider before:bg-secondary  after:bg-secondary">
                or
              </div>
            </div>
          </div>
          <button className="google">
            <FcGoogle size={28} />
            Sign up with Google
  </button> */}
        </div>
      </form>
      
      <ToastContainer />
    </div>
  
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  LOGIN_FAIL:state.auth.LOGIN_FAIL
});

export default connect(mapStateToProps, { login })(Login);