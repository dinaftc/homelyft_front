import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { verify } from "../actions/auth";

const Activate = ({ verify, match }) => {
  const [verified, setVerified] = useState(false);
  const routeParams = useParams();
  const verify_account = (e) => {
    const uid = routeParams.uid;
    const token = routeParams.token;

    verify(uid, token);
    setVerified(true);
  };

  if (verified) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div
        className="bg-white rounded-lg py-4 px-12"
       
      >
        <h1>Verify your Account:</h1>
        <button
          onClick={verify_account}
          type="button"
          className="btn btn-active rounded-lg text-white w-full bg-primary normal-case hover:bg-hoveredLog outline-none"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default connect(null, { verify })(Activate);
