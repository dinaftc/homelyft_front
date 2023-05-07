import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import Navbar from './Navbar';
import axios from "axios";
function Home({ isAuthenticated, logout }) {
  const [user, setUser] = useState({});
  const [products,setProducts]=useState([]);
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
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  useEffect(() => {
    fetch("http://127.0.0.1:8000/homeLift/products/")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleCard=(id)=>{

  }
  

 
  const logout_user = () => {
    
    logout();
  };

  if (!isAuthenticated ||( isAuthenticated && (user.role=3))) {
    return(
      <div>
        <Navbar></Navbar>
        <div className="card-container bg-white" style={{ display: 'flex' }}>
            {products.map((product, index) => (
              <div className="card card-compact w-96 bg-base-100 shadow-xl m-5">
              <figure><img src={product.image} alt={product.name} /></figure>
              <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p>{product.description}</p>
                <p>Price :{product.price} DA</p>
                <div className="card-actions justify-end">
                  <button className="btn bg-primary border-none outline-none" onClick={handleCard(product.id)}>Add to cart</button>
                </div>
              </div>
            </div>
            ))}
          </div>
      </div>
    ) 
  }
  <style jsx>{`
  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
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

}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Home);
