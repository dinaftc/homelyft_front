import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import { Navigate } from 'react-router-dom';
import DashboardHeader from './../Admin/components/DashboardHeader/index';
import { calculateRange, sliceData } from "../Admin/utils/table-pagination";
import { useEffect ,useState} from 'react';
function Home({ isAuthenticated, logout }) {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [TotalOrders,setTotalOrders]=useState(0);
  const [imagee, setImagee] = useState([]);
  const place='homeLift/products'
const [triggerFetch, setTriggerFetch] = useState(false);
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

  const logout_user = () => {
    
    logout();
  };

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
else{
  return (
    <div className='dashboard-content'>
     <DashboardHeader place={place}></DashboardHeader>
     {orders.length !== 0 ? (
           <div>
           {orders.map((order) => (
             <div className="card w-96 glass" key={order.id}>
               <figure>
                 <img src={order.image} alt={order.name} />
               </figure>
               <div className="card-body">
                 <h2 className="card-title">{order.name}</h2>
                 <p>Description:{order.description}</p>
                 <p>Category :{order.category_name}
                 SubCategory: {order.subcategory_name} </p>
                 <div className="card-actions justify-end">
                   <button className="btn btn-primary">Ajouter au panier</button>
                 </div>
               </div>
             </div>
           ))}
         </div>
         
          ) : (
            <div className="dashboard-content-container">
              <span className="empty-table">Fetching</span>
            </div>
          )}
    </div>
  );
}}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Home);
