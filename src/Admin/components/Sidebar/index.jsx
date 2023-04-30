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
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from 'react-redux';
import { logout } from '../../../actions/auth';

const Sidebar = ({ isAuthenticated, logout }) => {

  const logout_user = () => {
    logout();
  };

  const [selected, setSelected] = useState(true);
  const [isSelected, setIsSelected] = useState(true);
  const handleSelect = (index) => {
    setSelected(index);
    setIsSelected(null);
  };
  const handleIsSelected = (index) => {
    setIsSelected(index);
    setSelected(null);
  };
  const c =
    "flex items-center gap-x-4 p-3 mx-5 bg-primary text-white font-pop rounded-full cursor-pointer   ";
  const v =
    "flex items-center gap-x-4 p-3 mx-5 hover:bg-hovered    hover:text-gray-500  rounded-full cursor-pointer   ";

  const Menus = [
    { title: "Home", src: lift, activesrc: liftwhite, Link:'/Home' },
    { title: "Notifications", src: notif, activesrc: notifwhite , Link:'/Home'},
    { title: "Products", src: products, activesrc: productswhite , Link:'/products'},
    { title: "Inbox", src: inbox, activesrc: inboxwhite , Link:'/Home' },
    { title: "Clients", src: inbox, activesrc: inboxwhite , Link:'/Home' },
    { title: "Insights", src: insight, activesrc: insightwhite , Link:'/Home'},
  ];
  const SecMenus = [
    { title: "Settings", src: settings, activesrc: settingswhite },
    { title: "Logout", src: Logout, activesrc: logoutwhite },
  ];
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <div className={"  h-screen bg-white flex-row  shadow-2xl"}>
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
              activeCla
              key={index}
              onClick={() => handleSelect(index)}
              className={selected === index ? c : v}
            >
              
              <img src={selected === index ? menu.activesrc : menu.src} alt="" />{" "}
              <span>{menu.title}</span>
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
              onClick={() => handleIsSelected(index)}
              className={isSelected === index ? c : v + isSelected}
            >
              <img src={isSelected === index ? menu.activesrc : menu.src} alt=""/>{" "}
              <span onClick={logout_user}>{menu.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Sidebar);