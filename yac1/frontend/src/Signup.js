/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./Login/Login.css";
import { Link } from "react-router-dom";
import at from "./Login/at.png";
import eyeoff from "./Login/eye-off.png";
import eye from './Login/eye.png'
import hash from "./Login/hash.png";
import user from "./Login/user.png";
import { FcGoogle } from "react-icons/fc";

function Signup() {
  const [email, setEmail] = useState("");
  const [phone_number, setphone_number] = useState("");
  const [fullname, setfullname] = useState("");
  const [password, setPassword] = useState("");

  const [showWelcome, setShowWelcome] = useState(false);
  const [theresponse, setTheresponse] = useState("");

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handlePhoneChange = (event) => setphone_number(event.target.value);
  const handleUserChange = (event) => setfullname(event.target.value);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/account/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullname, email, phone_number, password }),
      });
      const data = await response.json(); // parse the response as JSON
      console.log(data);
      setShowWelcome(true);
      setTheresponse(data.response);
      // handle the sign-up result
    } catch (error) {
      console.error(error);
    }
  };

  const [showPassword, setShowPassword] = React.useState(true);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form className="bg-white rounded-lg py-4 px-12" onSubmit={handleSubmit}>
        <div className="my-2">
          <h1 className="text-3xl font-bold font-pop  text-center text-primary ">
            Sign up
          </h1>
          <div className="my-1 flex flex-col text-center mb-7">
            <p className="text-gray-400 font-pop font-normal font-400">
              Create an account and enjoy your shopping 
            </p>
          </div>
        </div>
        {!showWelcome && (
          <div className="InputBox">
            <input
              onChange={handleUserChange}
              value={fullname}
              required
              type='text'/>
           <span>Full name</span>
            <img src={user} alt="" />
          </div>
        )}
        {!showWelcome && (
          <div className="InputBox">
            <input
              onChange={handleEmailChange}
              value={email}
              required
              type='email'
             
            />
            <span>Email</span>
            <img src={at} alt="" />
          </div>
        )}
        {!showWelcome && (
          <div className="InputBox">
            <input
              onChange={handlePhoneChange}
              value={phone_number}
              required
              type='tel'
             
            />
            <span>Phone number</span>
            <img src={hash} alt="" />
          </div>
        )}

{!showWelcome  && (
          <div className="InputBox ">
            <input
              onChange={handlePasswordChange}
              value={password}
              required
             
              type={showPassword? 'text' : 'password'}
            />
            <span>Password</span>
            <button onClick={handleClickShowPassword}>
            {showPassword ?  <img src={eyeoff} alt="" /> : <img src={eye} alt="" />} </button>
           
          </div>
        )}

        <div className="my-7">
          <button
            className="btn btn-active rounded-lg text-white w-full bg-primary normal-case hover:bg-hoveredLog outline-none "
            type="submit"
          >
            Sign up
          </button>
          <div className="flex flex-row justify-center">
            <div className="my-1 text-center ">
              <p className="text-sm inline-block text-gray-500 font-pop">
                already have an account ?{"  "}
              </p>

              <Link
                to="/"
                className="inline-block text-sm text-primary font-pop hover:text-hoveredLog"
              >
                Login{"   "}
              </Link>
            </div>
          </div>

          <div className="container w-full flex justify-center">
            <div className="flex flex-col w-full border-opacity-200">
              <div className="divider">or</div>
            </div>
          </div>
          <button className="google ">
            <FcGoogle size={28} />
            Sign up with Google
          </button>
        </div>
      </form>
      {showWelcome && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">{theresponse}</h2>
            <button
              className="btn btn-outline w-full my-2 rounded-full bg-white text-black "
              onClick={() => setShowWelcome(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;
