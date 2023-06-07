import DashboardHeader from "../components/DashboardHeader";
import React from "react";
const Inbox = () => {
  return (
    <div className="dashboard-content ">
      <DashboardHeader />

      <div className="dashboard-content-container flex justify-center items-center">
        <div className="flex justify-center items-center">
          <p className="font-pop text-6xl flex justify-center items-center">
            Maintenance
          </p>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
