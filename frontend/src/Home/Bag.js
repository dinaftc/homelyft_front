import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import Navbar from './Navbar';
import { Navigate } from 'react-router-dom';
function Home({ isAuthenticated, logout }) {
 
  const logout_user = () => {
    
    logout();
  };

  if (!isAuthenticated) {
    return <Navigate to='/' replace ></Navigate>
  }
  else {
    return (
      
        <div>
  <Navbar></Navbar>

  dina dina dina 
        </div>
    )
  }

}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Home);