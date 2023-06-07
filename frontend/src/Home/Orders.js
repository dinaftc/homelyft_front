
import { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Navbar from "./Navbar";
const Orders = ({ user }) => {
  const [exist, setExist] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/home/${user.id}/MyOrders/`
        );
        setOrders(response.data);
        setExist(true);
       
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);
  return (
    <div className="bg-white">
      <Navbar setProducts={setOrders} />
      <div className="mb-5">
        <div
          className=" p-40 flex flex-col"
          onDoubleClick={(e) => {
            e.preventDefault();
          }}
          style={{ userSelect: "none" }}
        >
          <div className="font-pop text-4xl font-semibold ">
            <h2>Orders Here !</h2>
          </div>
   
  {orders.length > 0 ? (
  <div>
    {orders.map((order) => (
      // Display individual order item
      <div
        key={order.id}
        className="flex justify-between mt-10 border-2 shadow-xl border-gray-300 rounded-xl"
      >
        <div className="flex flex-row">
          <div
            className="rounded-lg"
            style={{ width: "300px", height: "300px" }}
          >
            <img
              src={order.imageSrc}
              className="rounded-lg"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              alt="Product"
            />
          </div>
          <div className="flex flex-col justify-between ml-10 my-5">
            <div>
              <p className="font-pop text-3xl font-bold">{order.title}</p>
              <p className="font-pop text-2xl font-normal">
                {order.description}
              </p>
            </div>
            <p>Order type: {order.orderType}</p>
          </div>
        </div>
        <div className="pr-20 flex flex-col justify-end my-3">
          <p className="font-pop text-2xl font-semibold">
            Price: {order.price}
          </p>
          <p className="font-pop text-lg font-semibold">
            Quantity: {order.quantity}
          </p>
        </div>
      </div>
    ))}
  </div>
    
) : (
  <div className="text-secondary text-xl">No Orders found</div>
)} 


        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps)(Orders);
