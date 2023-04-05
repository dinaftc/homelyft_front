import React, { Fragment, useState } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";

function Home({ logout, isAuthenticated }) {
  const [redirect, setRedirect] = useState(false);

  const logout_user = () => {
    logout();
    setRedirect(true);
  };

  return (
    <div>
      {redirect ? <Navigate to="/" /> : <Fragment></Fragment>}
      <li className="btn flex justify-center items-center" onClick={logout_user}>
       Logout
         
      </li>

     
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Home);
