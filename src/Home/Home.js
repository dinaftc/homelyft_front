import React, { Fragment, useState } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import Sidebar from "../Admin/components/Sidebar";
function Home({ logout, isAuthenticated }) {
  const [redirect, setRedirect] = useState(false);

  const logout_user = () => {
    logout();
    setRedirect(true);
  };

  return (
    <div>

      <li className=" flex justify-center items-center">
       home
         
      </li>

      {redirect ? <Navigate to="/" /> : <Fragment></Fragment>}
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Home);
