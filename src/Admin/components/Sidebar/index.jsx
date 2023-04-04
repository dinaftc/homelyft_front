import Logo from "./icon/home.svg";
import lift from "./icon/homeic.svg";
import notif from "./icon/notific.svg";
import products from "./icon/productsic.svg";
import inbox from "./icon/inboxic.svg";
import insight from "./icon/insightsic.svg";
import settings from "./icon/settingsic.svg";
import Logout from "./icon/logout.ic.svg";
import { Link } from "react-router-dom";
import { logout } from '../../../actions/auth';
import React, { Fragment, useState } from 'react';
import {  Navigate } from 'react-router-dom';

const Sidebar = () => {
  const [redirect, setRedirect] = useState(false);

  const logout_user = () => {
    logout();
    setRedirect(true);
};

  const Menus = [
    { title: "Home", src: lift,Link:'/Home' },
    { title: "Notifications", src: notif ,Link:'/notif'},
    { title: "Products", src: products ,Link:'/products'},
    { title: "Inbox", src: inbox ,Link:'/Inbox'},
    { title: "Insights", src: insight ,Link:'/'},
  ];
  const SecMenus = [
    { title: "Settings", src: settings },
    { title: "Logout", src: Logout,  onClick: () => {
      logout_user() }, },
  ];
  return (
    <div className=" shadow-md h-screen bg-white flex-row border border-gray-300 ">
      <div className="ml-5 mt-7 mr-7  ">
        <img
          className="object-center cursor-pointer"
          src={Logo}
          alt="HomeLift admin"
        />
      </div>
      <div>
        <p className="  font-pop text-gray-500 text-sm pt-10 mb-3 pl-2">Menu</p>
      </div>
      <div>
        <ul className="text-gray-500 font-pop text-base   ">
          {Menus.map((menu, index) => (
            <Link to={menu.Link}
              key={index}
              className="flex items-center gap-x-4 p-3 mx-5 hover:bg-hovered active:text-white active:bg-actif   hover:text-gray-500  rounded-full cursor-pointer   "
            >
              {" "}
              <img src={menu.src} alt="" /> <span>{menu.title}</span>
            </Link>
          ))}
        </ul>
      </div>
      <div>
        <p className="font-pop text-gray-500 text-sm  pl-2 mt-3 mb-3">Other</p>
      </div>
      <div>
        <ul className="font-pop text-base text-gray-500">
          {SecMenus.map((menu, index) => (
            <li 
              key={index}
              className="flex items-center gap-x-4 p-3 mx-5 hover:bg-hovered active:text-white active:bg-actif hover:text-gray-500 rounded-full cursor-pointer"
            >
              <img src={menu.src} /> <span>{menu.title}</span>
            </li>
          ))}
        </ul>
      </div>
      {redirect ? <Navigate to='/' /> : <Fragment></Fragment>}
    
    </div>
  );
};

export default Sidebar;