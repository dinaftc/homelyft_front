import React, { useState } from 'react';
import {  IconButton, InputAdornment, TextField } from "@mui/material";
import { Link } from 'react-router-dom';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { FcGoogle } from 'react-icons/fc';
import PersonIcon from '@mui/icons-material/Person';

function SignUp() {
  const [email, setEmail] = useState('');
  const [phone_number,setphone_number] = useState('');
  const [fullname,setfullname]=useState('');
  const [password, setPassword] = useState('');

  const [showWelcome, setShowWelcome] = useState(false);
  const [theresponse,setTheresponse] = useState('');
  
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handlePhoneChange = (event) => setphone_number(event.target.value);
  const handleUserChange = (event) => setfullname(event.target.value);
  const handleSubmit = async (event) => {
    event.preventDefault();
   
    try {
      const response = await fetch('http://127.0.0.1:8000/account/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fullname, email, phone_number, password})
      });
      const data = await response.json(); // parse the response as JSON
      console.log(data);
      setShowWelcome(true);
      setTheresponse (data.response);
      // handle the sign-up result
    } catch (error) {
      console.error(error);
    }
  };
  
  const [showPassword, setShowPassword] = React.useState(true);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

 
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form className="bg-white border rounded-lg p-7 shadow-black hover:">
        <h2 className="text-4xl font-bold font-sans p-8 text-primary">
          Sign Up for HomeLyft
        </h2>
        <p>Create an account and start enjoying your shopping</p>
         
        
        {!showWelcome && <div className="my-2 ">
          <TextField
          onChange={handleUserChange}
            label="Full name"
            value={fullname}
            required
            className="hover:outline-primary w-full font-pop "
            size="small"
            type={"username"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PersonIcon/>
                </InputAdornment>
              ),
            }}
          />
        </div>}
        {!showWelcome && <div className="my-2 ">
          <TextField
          onChange={handleEmailChange}
            label="Email"
            value={email}
            required
            className="hover:outline-primary w-full font-pop "
            size="small"
            type={"email"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AlternateEmailIcon/>
                </InputAdornment>
              ),
            }}
          />
        </div>}
        {!showWelcome && <div className="my-2 ">
        <TextField
  onChange={handlePhoneChange}
  label="Phone Number"
  value={phone_number}
  required
  className="hover:outline-primary w-full font-pop"
  size="small"
  type={"tel"}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        
        <LocalPhoneIcon/>
      </InputAdornment>
    ),
  }}
/>
        </div>}
      
       {!showWelcome && <div className="my-2">
          <TextField
          onChange={handlePasswordChange}
            label="Password"
            value={password}
            required
            className="hover:outline-primary w-full  font-pop"
            size="small"
            type={!showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? (
                      <VisibilityOffIcon/> ): (<RemoveRedEyeIcon/>)}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>}
       
                   
      
        
           

        <button
          className="btn btn-active rounded-lg text-white w-full bg-primary normal-case hover:bg-hoveredLog outline-none"
          onClick={handleSubmit}
        >
          Sign Up
        </button>
        <div className="flex flex-row justify-center">
            <div className="my-1 text-center ">
              <p className="text-sm text-gray-500 font-pop">
                already have an account ?
              </p>
            </div>
            <div className="my-1 mx-1">
              <Link to='/' className="text-sm text-primary font-pop hover:text-hoveredLog">
                Login
              </Link>
            </div>
            </div>
            <div className="container w-full flex justify-center">
          <div className="flex flex-col w-full border-opacity-200">
          <div className="divider">OR</div>
           
          
          <button className="btn btn-outline text-black w-full normal-case rounded-lg  gap-2 my-2 outline-gray-500  hover:bg-hovered   ">
            <FcGoogle/>
            Sign up with Google
          </button>
        </div>
        </div>
      </form>
      {showWelcome && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">{theresponse }</h2>
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

export default SignUp;
