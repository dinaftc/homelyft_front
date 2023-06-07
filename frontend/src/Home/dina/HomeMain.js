import homePic from "../home.svg";
import Rect from "../Rectangle1.svg";
import Rect2 from "../Rectangle2.svg";
import Rect32 from "../Rectangle32.svg";
import Rect33 from "../Rectangle33.svg";
import Rect31 from "../Rectangle31.svg";
import Lottie from "lottie-react";
import instagram from "../instagram.json";
import facebook from "../facebook.json";
import twitter from "../twitter.json";
import { useState, useEffect } from "react";

import { Element, animateScroll as scroll, scroller } from "react-scroll";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "../Navbar";
const HomeMain = ({ user, isAuthenticated }) => {
  useEffect(() => {
    // Optional: Configure the scroll behavior
    scroll.scrollToTop({
      duration: 500,
      smooth: true,
    });
  }, []);
  const positionStyles2 = {
    // Center the animation using translate
    width: "60px",
    height: "60px",
  };
  return (
    <div>
      {((user && user.role === 3) || !isAuthenticated) && (
        <div className="bg-white">
         <Navbar />  
          <div
            className="w-full "
            onDoubleClick={(e) => {
              e.preventDefault();
            }}
            style={{ userSelect: "none" }}
          >
            <Element name="section1" className=" relative">
              <img src={homePic} className="w-full h-auto" />
              <div className="absolute inset-0 flex justify-start ml-10 mt-20 flex-col animate-fadeIn animate-translateY ">
                <div className="font-pop text-white text-7xl font-bold">
                  <h1>Make Your Interior</h1>
                  <h1>More Modern</h1>
                </div>
                <div className="text-white font-pop text-2xl font-normal">
                  <p className="mt-8">
                    Turn your room with HomeLift into a lot
                  </p>
                  <p className="mt-1">More modern one</p>
                </div>
              </div>
            </Element>
            <Element className="">
              <div>
                {" "}
                <img src={Rect} />
              </div>

              <div className=" text-5xl font-pop font-bold  flex justify-center items-center animate-fadeIn animate-translateY">
                <p>
                  We provide the best <br />{" "}
                  <span className="ml-5"> interior collection </span>{" "}
                  <span></span>{" "}
                </p>
              </div>
              <div className="">
                <div className="flex justify-center mt-5 text-gray-400 font-pop animate-fadeIn1 animate-translateY1">
                  <p>
                    <span className="ml-3">
                      We will always offer and provide the best collections
                    </span>{" "}
                    <br /> for furniture and interiors needs at home and
                    anywhere <br />{" "}
                    <span className="flex justify-center">
                      at affordable prices{" "}
                    </span>
                  </p>
                </div>
                <div className="flex justify-end ">
                  <img src={Rect2} />
                </div>
              </div>
            </Element>
            <div>
              <div className="flex flex-row  mt-5 py-10 px-5 mx-10 justify-between  ">
                <div className="   relative  ">
                  <img src={Rect32} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-gray-900 bg-opacity-75">
                    <p className=" text-white text-xl font-pop ">
                    Check our Categories!
                    </p>

                    <Link
                      to="/Home"
                      className="  mt-10 font-pop  text-base btn normal-case text-white rounded-full bg-primary  border-primary  "
                    >
                      {" "}
                      Shop now{" "}
                    </Link>
                  </div>
                </div>

                <div className="relative">
                  <img src={Rect31} className="w-full h-auto" />
                  <div className="absolute inset-0 flex justify-center items-center flex-col space-y-2 ">
                    <p className="  text-5xl font-pop text-white font-semibold  ">
                      Up to 50% off.
                    </p>
                    <p className=" space-y-2 text-white font-pop text-6xl ">
                      <span className="ml-5">Perfect</span> <br />{" "}
                      <span className="ml-3">time to</span> <br />
                      <span>pony up.</span>{" "}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <img src={Rect33} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-gray-900 bg-opacity-75">
                    <p className=" text-white text-xl font-pop ">
                      Check our Products!
                    </p>
                    <Link
                      to="/Home"
                      className="  mt-10 font-pop  text-base btn normal-case text-white rounded-full bg-primary  border-primary  "
                    >
                      {" "}
                      Shop now{" "}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="bg-gray-200 py-12 px-10 space-x-24 flex flex-row"
              onDoubleClick={(e) => {
                e.preventDefault();
              }}
              style={{ userSelect: "none" }}
            >
              <div>
                <p className="text-black font-pop text-xl font-semibold ">
                  Join HomeLift family
                </p>
                <p className="text-gray-500 font-pop text-sm mt-3">
                  Get exclusive offers, inspiration, and lots <br />
                  more to help bring your ideas to life. <br /> All for free.
                </p>
                <button className="  mt-3 font-pop  text-xs btn normal-case text-white rounded-full bg-primary  border-primary  ">
                  Join or login{" "}
                </button>
                <p className="text-black font-pop text-xl font-semibold mt-5">
                  Contact Us !
                </p>
                <p className="text-gray-500 font-pop mt-2 text-sm">
                  0552883989 | 0791031112
                </p>
                <p className="text-gray-500 font-pop  text-sm">
                  contact@homelift.com
                </p>
              </div>
              <div>
                <p className="text-black font-pop text-xl font-semibold ">
                  About
                </p>
                <div className="text-gray-500 font-pop  text-sm mt-3 space-y-2">
                  <p>About Us </p>
                  <p>Design process</p>
                  <p>Stores</p>
                  <p>Open Studios</p>
                  <p>HomeLift</p>
                  <p>Foundation</p>
                </div>
              </div>
              <div>
                <p className="text-black font-pop text-xl font-semibold ">
                  Services
                </p>
                <div className="text-gray-500 font-pop  text-sm mt-3 space-y-2">
                  <p>Delivery </p>
                  <p>Click and collect</p>
                  <p>Assembly</p>
                  <p>Planners</p>
                  <p>Finance</p>
                  <p>Planning services</p>
                  <p>Kitchen services</p>
                </div>
              </div>
              <div>
                <p className="font-pop text-black text-xl font-semibold">
                  In case you want to follow us ! Here's our social media{" "}
                </p>
                <div className="flex flex-row justify-center cursor-pointer ">
                  <Link
                    to="https://www.facebook.com/yassine.gzn/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Lottie
                      animationData={facebook}
                      style={{ width: 150, height: 150 }}
                    />
                  </Link>
                  <Link
                    to="https://www.instagram.com/yvcine.guezz/ "
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Lottie
                      animationData={instagram}
                      style={{ width: 150, height: 150 }}
                    />
                  </Link>
                  <Link
                    to="https://twitter.com/TGuezzen "
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Lottie
                      animationData={twitter}
                      style={{ width: 150, height: 150 }}
                    />
                  </Link>
                </div>
                <p className="font-pop text-gray-500 text-sm flex justify-center mt-10 ">
                  <span className="text-primary font-bold mr-1" >HomeLift </span>  | All Rights Reserved
                </p>
              </div>
           
            </div>
          </div>
        </div>
      )}{" "}
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps)(HomeMain);
