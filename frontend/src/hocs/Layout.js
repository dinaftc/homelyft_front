
import React, { useEffect,useState } from 'react';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../actions/auth';
import Sidebar from '../Admin/components/Sidebar';
import './Admin/App.css';
import axios from 'axios';



const Layout = ({isAuthenticated, checkAuthenticated, load_user, children }) => {
  const [user, setUser] = useState({});
    useEffect(() => {
        checkAuthenticated();
        load_user();
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
    },[checkAuthenticated, load_user]);
    return ( <div>
    {(isAuthenticated && ((user.role==1)||(user.role==2))) ? (
        <div className='dashboard-container'>
          
          <Sidebar />
          
          <div className='dashboard-body'>{children}</div>
        </div>
      ) : (
        <div className='dashboard-body'>{children}</div>
      )}
   </div> )
};
const mapStateToProps = state =>({
    isAuthenticated :state.auth.isAuthenticated
});

export default connect(mapStateToProps, {checkAuthenticated, load_user})(Layout);