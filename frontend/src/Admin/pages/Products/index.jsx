/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import axios from "axios";
import { calculateRange, sliceData } from "../../utils/table-pagination";
import { Link, Navigate } from "react-router-dom";
import "../styles.css";
import seemore from "../../assets/icons/seemore.png";
import add from "../../assets/icons/plus.png";
import EditProductForm from "./EditProductForm";
import Sidebar from "../../components/Sidebar";
import { connect } from 'react-redux';
import { logout } from '../../../actions/auth';
import Categories from './Categories'

export let products;
export let setProducts;
function Orders({ isAuthenticated, logout }) {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [imagee, setImagee] = useState([]);
const [TotalOrders,setTotalOrders]=useState(0);
const [triggerFetch, setTriggerFetch] = useState(false);
const place='homeLift/products'
  products = orders;
  setProducts = setOrders;

  const logout_user = () => {
    
    logout();
  };



  useEffect(() => {
    fetch("http://127.0.0.1:8000/homeLift/products/")
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
  const handleDelete = (ID) => {
    axios
      .delete(`http://127.0.0.1:8000/homeLift/products/${ID}`)
      .then(function (response) {
        console.log("Product deleted successfully");
        fetch("http://127.0.0.1:8000/homeLift/products/")
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
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleClickEdit = (product) => {
    setShowEditForm(true);
    setSelectedProduct(product);
  };

  const [priceExact, setPriceExact] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
 const [archived,setArchived]=useState(false);
  const handleFilter = () => {
    let url = `http://127.0.0.1:8000/homeLift/products/?`;

    if (priceExact !== "") {
      url += `price_exact=${priceExact}&`;
    } else {
      url += `price_exact=&`;
    }

    if (minPrice !== "") {
      url += `min_price=${minPrice}&`;
    } else {
      url += `min_price=&`;
    }

    if (maxPrice !== "") {
      url += `max_price=${maxPrice}&`;
    } else {
      url += `max_price=`;
    }
   if (archived) {
      url = `http://127.0.0.1:8000/homeLift/products/?archived=True`;
    } else {
      url += ``;
    }

    axios
      .get(url)
      .then((response) => {
        // handle the response data here
        console.log(response.data);
        setOrders(response.data);
      })
      .catch((error) => {
        // handle errors here
        console.log(error);
      });
  };



  function handleArchive(id,current) {
    axios.patch(`http://127.0.0.1:8000/homeLift/products/${id}/`, {
      archived: !current,
    })
      .then((response) => {
        // Handle successful response
        console.log(response.data);
        setTriggerFetch(!triggerFetch);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  }


  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
else{

  return (
    
    <div className="dashboard-content">
      
      <DashboardHeader place={place} />
{!showEditForm &&
      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <p>Products</p>
          <Link className="add" to="/products/Add_product">
            <img src={add} alt="" />
            Add product
          </Link>
          <span className="filter-p">Filter by:</span>
          <div className="dropdown dropdown-bottom dropdown-end bg-offwhite">
            <label tabIndex={0}>All Categories</label>
            <ul
  tabIndex={0}
  className="dropdown-content menu p-3 shadow color-white-500 bg-white opacity-100 rounded-box flex flex-wrap items-center"
>
              <li className="m-1 ">
                <input
                  type="text"
                  value={priceExact}
                  onChange={(e) => setPriceExact(e.target.value)}
                  placeholder="Price"
                  className="py-1 px-2 border border-gray-300 rounded "
                />
              </li>
              <li className="m-1 bg-offwhite">
                <input
                  type="text"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="Min Price"
                  className="py-1 px-2 border border-gray-300 rounded focus:bg-offwhite"
                />
              </li>
              <li className="m-1 bg-offwhite">
                <input
                  type="text"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Max Price"
                  className="py-1 px-2 border border-gray-300 rounded focus:bg-offwhite"
                />
              </li>
              <li className="m-1 bg-offwhite">
              <label>
        <input
          type="checkbox"
          checked={archived}
          onChange={(event)=>setArchived(event.target.checked)}
        />
        Archived 
      </label>
              </li>
              <li>
                <button
                  onClick={handleFilter}
                  className="py-1 px-2 bg-primary text-white rounded"
                >
                  Filter
                </button>
              </li>
            </ul>
          </div>
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
            <th>CATEGORY NAME</th>
            <th>PRODUCT NAME</th>
            <th>QUANTITY</th>
            <th>PRICE (DA)</th>
            <th>STATUSES</th>
            <th>ACTIONS</th>
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
                      {imagee[index] && (
                        <img src={imagee[index]} alt={order.name} />
                      )}
                    </div>
                  </td>
                  <td>
                    <span>{order.category_name}</span>
                  </td>
                  <td>
                    <span>{order.name}</span>
                  </td>
                  <td>
                    <span>{order.quantity}</span>
                  </td>
                  <td>
                    <span>{order.price}</span>
                  </td>
                  <td>
                    {!order.archived ? (
                      <button className="status" onClick={() => handleArchive(order.id,order.archived)}> Enable</button>
                    ) : (
                      <button className="status-desabled" onClick={() => handleArchive(order.id,order.archived)}> desable</button>
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
                            onClick={() => handleClickEdit(order)}
                          >
                            Edit
                          </button>
                        </li>
                        <li className="m-1">
                          <button
                            className="py-1 px-2 bg-red-500  text-white rounded"
                            onClick={() => handleDelete(order.id)}
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
        
      </div> }
      
      {showEditForm && (
          <EditProductForm
            product={selectedProduct}
            onClose={() => setShowEditForm(false)}
          />
        )}
        <Categories></Categories>
    </div>
   
  );}
}


const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Orders);
