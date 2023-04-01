/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import DashboardHeader from '../../components/DashboardHeader';

import all_orders from '../../constants/orders';
import {calculateRange, sliceData} from '../../utils/table-pagination';

import '../styles.css';
import seemore from '../../assets/icons/seemore.png';
import add from '../../assets/icons/plus.png';

function Orders () {
    const [search, setSearch] = useState('');
    const [orders, setOrders] = useState(all_orders);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([]);

    useEffect(() => {
        
        setPagination(calculateRange(all_orders, 5));
        setOrders(sliceData(all_orders, page, 5));
    });

    // Search
    

    // Change Page 
    const __handleChangePage = (new_page) => {
        setPage(new_page);
        setOrders(sliceData(all_orders, new_page, 5));
    }

    return(
        <div className='dashboard-content'>
            <DashboardHeader
                 />

            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <p>Products</p>
                    <button className='add'> <img src={add} alt="" />Add product</button>
                     <span className='filter-p'>Filter by:</span>
                    <select  className='filter' name='Filter By'>
                    <option value="all categories">All categories</option>
                    </select>
                    
                </div>

                <table>
                    <thead>
                        <th><input type="checkbox" /></th>
                        <th>IMAGE</th>
                        <th>CATEGORY NAME</th>
                        <th>PRODUCT NAME</th>
                        <th>QUANTITY</th>
                        <th>PRICE (DA)</th>
                        <th>STATUSES</th>
                        <th>ACTIONS</th>
                    </thead>

                    {orders.length !== 0 ?
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index}>
                                    <td><input type="checkbox" name="" id="" /></td>
                            
                                    
                                    <td>
                                        <div>
                                            <img 
                                                src={order.avatar}
                                                className='dashboard-content-avatar'
                                                alt={order.first_name + ' ' +order.last_name} />
                                           
                                        </div>
                                    </td>
                                    <td><span>{order.first_name}</span></td>
                                    <td><span>{order.product}</span></td>
                                    <td><span>{order.Quantity}</span></td>
                                    <td><span>{order.Price}</span></td>
                                    <td><button className='status'>{order.status}</button></td>
                                    <td><p>{'  '}<img src={seemore} alt="" /></p></td>
                                </tr>
                            ))}
                        </tbody>
                    : null}
                  
                </table>
                

                {orders.length !== 0 ?
                    <div className='dashboard-content-footer'>
                        <div className='dashboard-content-footer-left'>
                    <p>
                      Showing 1 to 5 of 6 entries
                    </p>
                    </div>
                    <button
                        onClick={() => __handleChangePage(page - 1)}
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                    {pagination.map((item, index) => (
                        <span 
                            key={index} 
                            className={item === page ? 'active-pagination' : 'pagination'}
                            onClick={() => __handleChangePage(item)}
                        >
                            {item}
                        </span>
                    ))}
                    <button
                        onClick={() => __handleChangePage(page + 1)}
                        disabled={page === 2}
                    >
                        Next
                    </button>
                </div>
                
                : 
                    <div className='dashboard-content-footer'>
                        <span className='empty-table'>No data</span>
                    </div>
                }
                
            </div>
        </div>
    )
}

export default Orders;