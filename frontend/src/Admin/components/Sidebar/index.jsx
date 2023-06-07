import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../../actions/auth";
import Logo from "./icon/home.svg";
import lift from "./icon/homeic.svg";
import notif from "./icon/notific.svg";
import products from "./icon/productsic.svg";
import inbox from "./icon/inboxic.svg";
import insight from "./icon/insightsic.svg";
import settings from "./icon/settingsic.svg";
import Logout from "./icon/logout.ic.svg";
import liftwhite from "./icon/homew.svg";
import notifwhite from "./icon/bell.svg";
import productswhite from "./icon/shopping-bag.svg";
import inboxwhite from "./icon/message-circle.svg";
import insightwhite from "./icon/bar-chart.svg";
import settingswhite from "./icon/settings.svg";
import logoutwhite from "./icon/logout.svg";
import user from '../../assets/icons/user.png'
import userac from "./icon/user.svg";
import Statistics from "../../pages/Statistics/Statistics";

const Sidebar = ({ isAuthenticated, logout }) => {
  const [selected, setSelected] = useState("Home"); 
  const [isSelected, setIsSelected] = useState(null);

  const handleSelect = (title) => {
    setSelected(title);
    setIsSelected(null);
  };

  const handleIsSelected = (title) => {
    setIsSelected(title);
    setSelected(null);
  };

  const c =
    "flex items-center gap-x-4 p-3 mx-5 bg-primary text-white font-pop rounded-full cursor-pointer";
  const v =
    "flex items-center gap-x-4 p-3 mx-5 hover:bg-hovered hover:text-gray-500 rounded-full cursor-pointer";

  const Menus = [
    { title: "Home", src: lift, activesrc: liftwhite, link: "/Home" },
    {
      title: "Notifications",
      src: notif,
      activesrc: notifwhite,
      link: "/notifications",
    },
    {
      title: "Products",
      src: products,
      activesrc: productswhite,
      link: "/products",
    },
    { title: "Inbox", src: inbox, activesrc: inboxwhite, link: "/Inbox" },
    {
      title: "Clients",
      src: user,
      activesrc: userac,
      link: "/clients",
    },
    { title: "Insights", src: insight, activesrc: insightwhite, link: "/Statistics" },
  ];

  const SecMenus = [
    {
      title: "Settings",
      src: settings,
      activesrc: settingswhite,
      link: "/settings",
    },
    { title: "Logout", src: Logout, activesrc: logoutwhite, link: "/" },
  ];

  const logout_user = () => {
    logout();
  };

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  } else {
    return (
      <div className="h-screen bg-white fixed flex-row shadow-2xl">
        <div className="ml-5 mt-7 mr-7">
          <img
            className="object-center cursor-pointer"
            src={Logo}
            alt="HomeLift admin"
          />
        </div>
        <div>
          <p
            className="font-pop text-gray-500 text-sm pt-10 mb-3 pl-2"
            onDoubleClick={(e) => {
              e.preventDefault();
            }}
            style={{ userSelect: "none" }}
          >
            Menu
          </p>
        </div>
        <div>
          <ul className="text-gray-500 font-pop text-base"  onDoubleClick={(e) => {
              e.preventDefault();
            }}
            style={{ userSelect: "none" }}>
            {Menus.map((menu, index) => (
              <Link

                to={menu.link}
                key={index}
                onClick={() => handleSelect(menu.title)}
                className={selected === menu.title ? c : v}
              >
                <img
                  src={selected === menu.title ? menu.activesrc : menu.src}
                  alt=""
                />
                <span>{menu.title}</span>
              </Link>
            ))}
          </ul>
        </div>
        <div>
          <p
            className="font-pop text-gray-500 text-sm pl-2 mt-3 mb-3"
            onDoubleClick={(e) => {
              e.preventDefault();
            }}
            style={{ userSelect: "none" }}
          >
            Other
          </p>
        </div>
        <div>
          <ul className="font-pop text-base text-gray-500">
            {SecMenus.map((menu, index) => (
              <Link
                to={menu.link}
                key={index}
                onClick={() => handleIsSelected(menu.title)}
                className={isSelected === menu.title ? c : v}
              >
                <img
                  src={isSelected === menu.title ? menu.activesrc : menu.src}
                  alt=""
                />
                {menu.title === "Logout" ? (
                  <span onClick={logout_user}>{menu.title}</span>
                ) : (
                  <span>{menu.title}</span>
                )}
              </Link>
            ))}
          </ul>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Sidebar);
