import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import Navbar from './Navbar';
function Home({ isAuthenticated, logout }) {
 
  const logout_user = () => {
    
    logout();
  };

  if (!isAuthenticated) {
    return <Navbar></Navbar>
  }

}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Home);
