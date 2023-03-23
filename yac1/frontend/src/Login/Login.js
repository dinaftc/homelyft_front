/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import "./Login.css";
import at from "./at.png";
import eyeoff from "./eye-off.png";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/account/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();
    console.log(result);

    // handle the authentication result

    setShowWelcome(true);
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [enterEmail, setEnterEmail] = useState(false);
  const handleEmailsent = () => setEnterEmail(!enterEmail);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form className="bg-white rounded-lg py-4 px-12" onSubmit={handleSubmit}>
        <div className="my-2">
          <h1 className="text-3xl font-bold font-pop text-center text-primary ">
            Hello Again!
          </h1>
          <div className="my-1 flex flex-col text-center px-2 mb-7">
            <p className="text-gray-400 font-pop font-normal font-400 ">
              Pour que vous puissent connecter avec succés
            </p>
            <p className="text-gray-400 font-pop font-normal font-400">
              veuillez saisir vos informations{" "}
            </p>
          </div>
        </div>
        {!showWelcome && !enterEmail && (
          <div className="containeremail">
            <input
              onChange={handleEmailChange}
              value={email}
              required
              className="email"
              placeholder="Email"
            />
            <img src={at} alt="" />
          </div>
        )}
        {!showWelcome && !enterEmail && (
          <div className="containerpassword ">
            <input
              onChange={handlePasswordChange}
              value={password}
              required
              className="password"
              placeholder={showPassword ? "text" : "Password"}
            />
            <img src={eyeoff} alt="" />
          </div>
        )}
        <div className="flex justify-end my-1">
          <p
            className="text-sm font-pop font-normal font-400  text-primary  "
            onClick={handleEmailsent}
          >
            Forgot password?
          </p>
        </div>
        <div className="my-7">
          <button
            className="btn btn-active border-0 rounded-lg text-white w-full bg-primary normal-case font-pop font-normal font-600"
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

          <div className="container w-full flex justify-center">
            <div className="flex flex-col w-full  border-opacity-100 ">
              <div className="divider before:bg-secondary  after:bg-secondary">
                or
              </div>
            </div>
          </div>
          <button className="google ">
            <FcGoogle />
            Sign up with Google
          </button>
        </div>
      </form>
      {showWelcome && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center bg-white">
          <div className="bg-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Welcome, {email}!</h2>
            <button
              className="btn btn-outline w-full my-2 rounded-full bg-white text-black "
              onClick={() => setShowWelcome(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {enterEmail && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center bg-white">
          <div className="bg-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              we've sent an email to {email}{" "}
            </h2>
            <button
              className="btn btn-outline w-full my-2 rounded-full bg-white text-black "
              onClick={() => setEnterEmail(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
