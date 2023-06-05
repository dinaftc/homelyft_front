import * as React from "react";

import Rating from "@mui/material/Rating";

import { Icon, IconButton } from "@mui/material";
import { useState } from "react";


const AddReview = ({setIsModalOpen,order}) => {
  const [review, setReview] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    if (value.length <= 100) {
      setReview(value);
    }
  };
  const handleModal =()=>{
    setIsModalOpen(false);
  }
  return (
    <div className="flex justify-end font-pop items-center h-screen w-screen fixed top-0 left-0 bg-opacity-50 bg-gray-900 z-50">
      <div className="bg-white rounded-lg py-6 px-10 w-1/3 h-screen">
        <div className="flex justify-end">
        <IconButton onClick={handleModal}  className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-x"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </IconButton>
        </div>
        <h2 className="text-black text-3xl font-bold mt-10 font-pop"
        onDoubleClick={(e) => {
            e.preventDefault();
          }}
          style={{ userSelect: "none" }}>
          Items
        </h2>

           {order.items.map((item, index) => (
      <div className="hero h-1/3" key={item.id}>
        <div className="hero-content flex-col lg:flex-row">
          <div className="flex flex-col justify-between">
            <h1 className="text-2xl font-bold">{item.product_name}</h1>
            <div className="flex flex-col justify-between">
            <p className=" text-xl  py-2  mr-2">
              {item.unit_price} dzd per unit
            </p>
            <p className=" text-xl  py-2  mr-2">
             Quantity : {item.Quantity}  
            </p>
            <p className=" text-xl  py-2  mr-2">
            Total =  {item.items_price} dzd
            </p>
            </div>
           
          </div>
        </div>
      </div>
    ))}
        
        <div className="w-full mt-5">
          <div>
            <button className=" w-1/5 justify-end text-center font-pop  btn normal-case text-white rounded-full bg-red-200  border-red-200  ">
             delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;