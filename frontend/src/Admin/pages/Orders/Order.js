/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import axios from "axios";
import { calculateRange, sliceData } from "../../utils/table-pagination";
import { Link, Navigate } from "react-router-dom";
import "../styles.css";
import Details from './Orderdetails'

import { connect } from "react-redux";
import { logout } from "../../../actions/auth";

export let products;
export let setProducts;
function Orders({ isAuthenticated, logout }) {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [imagee, setImagee] = useState([]);
  const [TotalOrders, setTotalOrders] = useState(0);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const place = "homeLift/products";
  products = orders;
  setProducts = setOrders;

  const logout_user = () => {
    logout();
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/home/orders")
      .then((response) => response.json())
      .then((data) => {
        const totalOrders = data.length;
        setTotalOrders(totalOrders);
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
 
 
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  } else {
    return (
      <div className="dashboard-content">
        <DashboardHeader place={place} />
       
          <div className="dashboard-content-container">
            <div className="dashboard-content-header">
              <p>Orders</p>
            </div>

            <table>
              <thead>
                <th>fullname</th>
                <th>email</th>
                <th>phone number</th>
                <th>Total</th>
                <th>shipping address</th>
                <th>details</th>
              </thead>

              {orders.length !== 0 ? (
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={index}>
                      <td>
                        <span>{order.customer.fullname}</span>
                      </td>
                      <td>
                        <span>{order.customer.email}</span>
                      </td>
                      <td>
                        <span>{order.customer.phone_number}</span>
                      </td>
                      <td>
                        <span>{order.total_amount}</span>
                      </td>
                      <td>
                     
                        <span>{order.customer.code_postal? order.customer.code_postal :  <p> no shipping addresse yet</p> }</span>
                      </td>
                     
                      <td>
                        <span className="  border-2 border-primary p-1 rounded-full font-normal bg-primary text-white" onClick={()=>setIsModalOpen(true)}>order's details</span>
                        
                      </td>
                      {IsModalOpen && <Details setIsModalOpen={setIsModalOpen} order={order}></Details>}
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
                    className={
                      item === page ? "active-pagination" : "pagination"
                    }
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
              <div className="">
                <span className="empty-table">No data</span>
              </div>
            )}
          </div>
       
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Orders);
