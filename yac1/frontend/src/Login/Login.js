import { IconButton, InputAdornment, TextField } from "@mui/material";
import React,{useState} from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
const Login= () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);


  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/account/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
  const [enterEmail,setEnterEmail]= useState(false);
  const handleEmailsent = () => setEnterEmail(!enterEmail);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form className="bg-white rounded-lg py-4 px-12" onSubmit={handleSubmit} >
        <div className="my-3">
          <h1 className="text-4xl font-bold font-pop  text-center text-primary ">
            Hello Again!
          </h1>
          <div className="my-3 flex flex-col text-center px-2">
            <p className="text-gray-500 font-pop">
              Pour que vous puissent connecter avec succés
            </p>
            <p className="text-gray-500 font-pop">
              veuillez saisir votre informations{" "}
            </p>
            <p className="text-gray-500 font-pop">correctement</p>
          </div>
        </div>
        {!showWelcome && !enterEmail && <div className="my-6 ">
          <TextField
          onChange={handleEmailChange}
            label="Email"
            value={email}
            required
            className=" hover:outline-primary w-full font-pop "
            size="small"
            type={"email"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AlternateEmailIcon/>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              classes: {
                root: 'font-pop',
              },
            }} style={{
              backgroundColor: "#FFFFFB",
              border: "2px ",
              borderRadius: "10px",
              
            }}
          />
        </div>}
       {!showWelcome  && !enterEmail &&  <div className="">
          <TextField
          onChange={handlePasswordChange}
            label="Password"
            value={password}
            required
            className="hover:outline-primary w-full  font-pop"
            size="small"
            type={showPassword ? "text" : "password"}
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
            InputLabelProps={{
              classes: {
                root: 'font-pop',
              },
            }}
            style={{
              backgroundColor: "#FFFFFB",
              border: "2px ",
              borderRadius: "10px",
              
            }}
          />
        </div>}
        <div className="flex justify-end my-0.5">
          <p className=" text-sm text-primary font-pop hover:text-hoveredLog" onClick={handleEmailsent}>
            Forgot password ?
          </p>
        </div>
        <div className="my-7">
          <button className="btn btn-active rounded-lg text-white w-full bg-primary normal-case hover:bg-hoveredLog outline-none "
          type='submit'>
            Login
          </button>
          <div className="flex flex-row justify-center">
            <div className="my-1 text-center ">
              <p className="text-sm inline-block text-gray-500 font-pop">
                don't have an account yet ?{"  "}
              </p>
            
            
              <Link to='Signup' 
              className="inline-block text-sm text-primary font-pop hover:text-hoveredLog">
                Sign up{"   "}
              </Link>
           
           </div>
          </div>
          
<div className="container w-full flex justify-center">
          <div className="flex flex-col w-full border-opacity-200">
          <div className="divider">OR</div>
           
          </div></div>
          <button className="btn btn-outline  w-full normal-case rounded-lg  gap-2 my-2 outline-gray-500  border-gray-500 "
          >
            <FcGoogle/>
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
            <h2 className="text-2xl font-bold mb-4">we've sent an email to {email} </h2>
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

