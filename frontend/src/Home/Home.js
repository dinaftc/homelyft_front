import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import { Navigate } from 'react-router-dom';

function Home({ isAuthenticated, logout }) {


  const logout_user = () => {
    
    logout();
  };

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
else{
  return (
    <div>
      <li className="btn flex justify-center items-center" onClick={logout_user}>
        Logout
      </li>
    </div>
  );
}}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Home);
