import { LOGIN_SUCCESS,LOGIN_FAIL,LOAD_SUCCESS,LOAD_FAIL, AUTHENTICATED, NOT_AUTHENTICATED, LOGOUT
,PASSWORD_RESET_SUCCESS,
PASSWORD_RESET_FAIL,
PASSWORD_RESET_CONFIRM_SUCCESS,
PASSWORD_RESET_CONFIRM_FAIL,
SIGNUP_SUCCESS,
SIGNUP_FAIL,
ACTIVATION_SUCCESS,
ACTIVATION_FAIL} from "./types";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

  
export const checkAuthenticated = () => async (dispatch) => {
    const access = localStorage.getItem('access');
    if (access) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      };
      const body = JSON.stringify({ token: localStorage.getItem('access') });
  
      try {
        const res = await axios.post(
          'http://127.0.0.1:8000/auth/jwt/verify/',
          body,
          config
        );
  
        if (res.data.code !== 'token_not_valid') {
          dispatch({ type: AUTHENTICATED });
        } 
         else {
          dispatch({ type: NOT_AUTHENTICATED});
          dispatch (logout())
        }
      } catch (err) {
        dispatch({ type: NOT_AUTHENTICATED });
        dispatch (logout())
      }
    }
  };
  


export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }; 

        try {
            const res = await axios.get('http://127.0.0.1:8000/auth/users/me/', config);
    
            dispatch({
                type: LOAD_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: LOAD_FAIL
            });
        }
    } else {
        dispatch({
            type: LOAD_FAIL
        });
    }
};
  
export  const login = (email,password)=>async dispatch =>{
    const config = {
        headers: {
            "Content-Type": "application/json",
          },}
          const body = JSON.stringify({ email, password });
         try {
            const res= await axios.post('http://127.0.0.1:8000/auth/jwt/create/',body,config);
            dispatch (
                {
                    type:LOGIN_SUCCESS,
                    payload:res.data,
                }
            )
            dispatch (load_user())
         }
         catch(err) {
            dispatch ({
                type:LOGIN_FAIL
               })
               return  toast.error('No existing account', {
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
}
export const signup =(fullname, email,phone_number, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ fullname, email, phone_number, password});

    try {
        const res = await axios.post(`http://127.0.0.1:8000/auth/users/`, body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
        return  toast.success('Account created,check your email!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        })
        return  toast.error('Can not add account', {
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

export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token });

    try {
        await axios.post(`http://127.0.0.1:8000/auth/users/activation/`, body, config);

        dispatch({
            type: ACTIVATION_SUCCESS,
        });
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL
        })
    }
};
export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email });

    try {
        await axios.post(`http://127.0.0.1:8000/auth/users/reset_password/`, body, config);

        dispatch({
            type: PASSWORD_RESET_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAIL
        });
    }
};

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
        await axios.post(`http://127.0.0.1:8000/auth/users/reset_password_confirm/`, body, config);

        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        });
    }
};

export const logout = () => dispatch => {
    dispatch({type:LOGOUT})
    return <Navigate to="/" replace />;
   
}
        
    
