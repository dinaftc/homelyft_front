import * as React from "react";

import Rating from "@mui/material/Rating";

import { Icon, IconButton } from "@mui/material";
import { useState } from "react";
const AddReview = ({setIsModalOpen}) => {
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
          Please Write a Review !{" "}
        </h2>

        <p className=" text-gray-400 font-pop mt-5"
        onDoubleClick={(e) => {
            e.preventDefault();
          }}
          style={{ userSelect: "none" }}>
          What did you think of your last purchase ? Share your experience with
          others !{" "}
        </p>
        <Rating
          name="size-large"
          className="space-x-3 px-32   mt-5  "
          defaultValue={0}
          size="large"
        />
        <p className="text-3xl font-pop font-bold mt-10"
        onDoubleClick={(e) => {
            e.preventDefault();
          }}
          style={{ userSelect: "none" }}>Review</p>
        <textarea
          value={review}
          onChange={handleChange}
          maxLength={60}
          className="textarea textarea-bordered font-pop  outline-none bg-fffffb border-1 border-gray-300 rounded-lg w-full p-3 mt-3 "
        />
        <p className="text-sm flex justify-end font-pop"onDoubleClick={(e) => {
                e.preventDefault();
              }}
              style={{ userSelect: "none" }}>{review.length}/60</p>
        <div className="w-full mt-5">
          <div>
            <button className=" w-full font-pop  btn normal-case text-white rounded-full bg-primary  border-primary hover:bg-hoverADD hover:border-hoverADD ">
              Submit review{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
