/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import add from "../../assets/icons/plus.png";
import { Link } from "react-router-dom";
import search from "../../assets/icons/search.png";
import axios from "axios";
import Profile from "../Profile/Profile";
import DashboardHeader from "./../../components/DashboardHeader/index";
export default function Settings() {
  const [staff, setStaff] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState({});
  const place = "account/staff-list";
  const handleSearch = () => {
    const filteredStaff = staff.filter((item) =>
      item.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setStaff(filteredStaff);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/auth/users/me/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        setUser(response.data);
        fetch("http://127.0.0.1:8000/account/staff-list/")
          .then((response) => response.json())
          .then((data) => {
            setStaff(data);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/account/staff-list/${id}/`)
      .then(function (response) {
        console.log("Staff deleted successfully");
        fetch("http://127.0.0.1:8000/account/staff-list/")
          .then((response) => response.json())
          .then((data) => {
            setStaff(data);
          });
        toast.success("Deleted Successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleDesactivate = (id, current) => {
    axios
      .patch(`http://127.0.0.1:8000/account/staff-list/${id}/`, {
        blocked: !current,
      })
      .then(function (response) {
        console.log("Staff desacivated successfully");
        fetch("http://127.0.0.1:8000/account/staff-list/")
          .then((response) => response.json())
          .then((data) => {
            setStaff(data);
          });
        toast.success("desactivated Successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      {user.role !== 3 && (
        <div className="w-full">
          <div className="dashboard-content">
            <DashboardHeader place={place}></DashboardHeader>
          </div>
          <Profile />
          <div className="dash ml-7 my-5">
            <div className="dashboard-content-header">
            <p
              className="font-pop  text-lg md:text-xl font-medium text-gray-800 leading-normal
"
            >
              Staff
            </p>
            <div className="relative">
              <input
                type="text"
                className="p-5 pl-14 bg-transparent outline-none"
                value={searchTerm}
                placeholder="Search"
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <img
                src={search}
                alt=""
                className="absolute inset-y-0 left-0 p-5"
                onClick={handleSearch}
              />
            </div>
            <span className="filter-p">
              <Link className="add" to="/Add_staff">
                <img src={add} alt="" />
                Add
              </Link>
            </span>
          </div>
          </div>
          <div className="card-container ">
            {staff.map((member, index) => (
              <div className="mx-7 my-4 card bg-base-100 shadow-xl" key={index}>
                <figure className="">
                  <img src={member.profile_picture} alt="Shoes" />
                </figure>
                <div className="card-body flex justify-between">
                  <div>
                    <label htmlFor="" className="text-secondary">
                      FullName
                    </label>
                    <p className="card-title">{member.fullname}</p>
                    <label htmlFor="" className="text-secondary">
                      Email
                    </label>
                    <p className="card-title">{member.email}</p>
                  </div>
                  <div className="dropdown dropdown-top ml-auto">
                    <label
                      tabIndex={0}
                      className="btn bg-primary  rounded-full text-white outline-none border-none m-1"
                    >
                      Manage
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <button>Contact</button>
                      <button
                        onClick={() =>
                          handleDesactivate(member.id, member.blocked)
                        }
                      >
                        {member.blocked ? "Acivate" : "Desactivate"}
                      </button>
                      <button onClick={() => handleDelete(member.id)}>
                        Delete
                      </button>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {user.role === 3 && (
        <div>
          <Profile />
          <p>Only admins can access this page.</p>
        </div>
      )}
      <style jsx>{`
        .card-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          margin-left:13.5rem;
        }

        .card {
          flex: 1 0 20%;
          height: 400px;
        }
        .card-body {
          padding: 0.5rem;

          display: flex;
          justify-content: space-between;
        }

        .card-title {
          margin-top: 0.2rem;
          font-size: 1rem;
        }
      `}</style>
      <ToastContainer />
    </>
  );
}
