/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import axios from "axios";
import { calculateRange, sliceData } from "../../utils/table-pagination";
import { Link, Navigate } from "react-router-dom";
import "../styles.css";
import seemore from "../../assets/icons/seemore.png";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import { logout } from '../../../actions/auth';

function Clients({ isAuthenticated, logout }) {

  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [imagee, setImagee] = useState([]);
const [TotalOrders,setTotalOrders]=useState(0);
const [triggerFetch, setTriggerFetch] = useState(false);
const place='account/customer-list'
  

 

  useEffect(() => {
    fetch("http://127.0.0.1:8000/account/customer-list/")
      .then((response) => response.json())
      .then((data) => {
        const totalOrders = data.length;
        setTotalOrders(totalOrders)
        const totalPages = Math.ceil(totalOrders / pageSize);
        setTotalPages(totalPages);
        const slicedOrders = sliceData(data, page, pageSize);
        setOrders(slicedOrders);
        const urls = data.map((item) => item.image);
        setImagee(urls);
      })
      .catch((error) => console.error(error));
  }, [page, pageSize, triggerFetch]);

  const pagination = [];
  for (let i = 1; i <= totalPages; i++) {
    pagination.push(i);
  }

  // Change Page
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  
  const handleDesactivate = (id,current) => {
    axios
      .patch(`http://127.0.0.1:8000/account/customer-list/${id}/`, {
        blocked: !current,
      })
      .then(function (response) {
        console.log(" successfully");
        fetch("http://127.0.0.1:8000/account/staff-list/")
          .then((response) => response.json())
          .then((data) => {
            setOrders(data);
          });
          toast.success('operation done Successfully', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  
   

  

 


  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
else{

  return (
    
    <div className="dashboard-content">
      
      <DashboardHeader place={place}/>

      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <p>Clients</p>
       </div>    

        <table>
          <thead>
            <th>
              <input
                type="checkbox"
                className="border-2 border-gray-400 rounded-md mt-1 checked:bg-primary"
              />
            </th>
            <th>IMAGE</th>
            <th>FULLNAME</th>
            <th>USERNAME</th>
            <th>EMAIL</th>
            <th>PHONE NUMBER</th>
            <th>shipping address</th>
            <th>STATUSES</th>
            <th>more</th>
          </thead>

          {orders.length !== 0 ? (
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      className="border-2 border-gray-400 rounded-md"
                    />
                  </td>

                  <td>
                    <div className="dashboard-content-avatar">
                      
                        <img src={order.profile_picture} alt={order.fullname} />
                      
                    </div>
                  </td>
                  <td>
                    <span>{order.fullname}</span>
                  </td>
                  <td>
                    <span>{order.username}</span>
                  </td>
                  <td>
                    <span>{order.email}</span>
                  </td>
                  <td>
                    <span>{order.phone_number}</span>
                  </td>
                  <td>
                  <span>{order.shipping_address}</span>
                  </td>
                  <td>
                    {!order.blocked ? (
                      <button className="status" onClick={() => handleDesactivate(order.id,order.blocked)}> Enable</button>
                    ) : (
                      <button className="status-desabled" onClick={() => handleDesactivate(order.id,order.blocked)}> desable</button>
                    )}
                  </td>
                  <td>
                    <div className="dropdown dropdown-bottom dropdown-end">
                      <label tabIndex={0}>
                        <img src={seemore} alt="" />
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu p-3 shadow bg-offwhite rounded-box flex flex-wrap items-center"
                      >
                        <li className="m-1">
                          <button
                            className="py-1 px-2 bg-primary text-white rounded"
                           
                          >
                            Edit
                          </button>
                        </li>
                        <li className="m-1">
                          <button
                            className="py-1 px-2 bg-red-500  text-white rounded"
                            
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>

        {orders.length !== 0 ? (
          <div className="dashboard-content-footer">
            <div className="dashboard-content-footer-left">
              <p>
                Showing {1 + (page - 1) * pageSize} to{" "}
                {Math.min(page * pageSize, Object.keys(orders).length)} of{" "}
                {TotalOrders} entries
              </p>
            </div>
            <button
              onClick={() => handleChangePage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            {pagination.map((item, index) => (
              <span
                key={index}
                className={item === page ? "active-pagination" : "pagination"}
                onClick={() => handleChangePage(item)}
              >
                {item}
              </span>
            ))}
            <button
              onClick={() => handleChangePage(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        ) : (
          <div className="dashboard-content-footer">
            <span className="empty-table">No data</span>
          </div>
        )}
        
      </div>
      <ToastContainer />
    </div>
  );}
}


const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Clients);