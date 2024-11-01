import React, { useState } from "react";
import axios from "axios";
import Rating from "@mui/material/Rating";
import { IconButton } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddReview = ({ setIsModalOpen, user, product, update, setUpdate }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [Comment, setComment] = useState("");
  const [fetch, setFetch] = useState(false);
  const handleSubmit = async () => {
    if (Comment !== "") {
      await updateProductComment(product.id, Comment);
    }

    if (rating !== 0) {
      await updateProductRating(product.id, rating);
    }

    // Reset the form values
    setReview("");
    setRating(0);
setFetch(true)
    // Close the modal or perform any other necessary actions
    setIsModalOpen(false);
  };

  async function updateProductRating(id, ratingValue) {
    const url = `http://127.0.0.1:8000/homeLift/products/${id}/rating-create/`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const response = await axios.post(
        url,
        {
          rating: ratingValue,
          active: true,
        },
        config
      );

      console.log(response.data); // Optional: Handle the response data
      setUpdate(true);
      if (response.status === 200) {
       return toast.success('review added', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }); // Optional: Return the response data
      } else {
      return  toast.error('already made a rating', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
     return toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    
   
  }

  async function updateProductComment(id, comment) {
    const url = `http://127.0.0.1:8000/homeLift/products/${id}/comments-create/`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
  
    try {
      const response = await axios.post(url, { text: comment }, config);
    
      console.log(response.data); // Optional: Handle the response data
      setUpdate(true);
      if (response.status === 200) {
        toast.success('review added', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }); // Optional: Return the response data
      } else {
        toast.error('already Have a comment', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    
    return; // Optional: Return any other necessary value
    
  }
  
  

  const handleChange = (event, value) => {
    setRating(value);
  };

  const handleModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-end font-pop items-center h-screen w-screen fixed top-0 left-0 bg-opacity-50 bg-gray-900 z-50">
      <div className="bg-white rounded-lg py-6 px-10 w-1/3 h-screen">
        <div className="flex justify-end">
          <IconButton onClick={handleModal} className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-x"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </IconButton>
        </div>
        <h2 className="text-black text-3xl font-bold mt-10 font-pop">
          Please Write a Review!
        </h2>

        <p className="text-gray-400 font-pop mt-5">
          What did you think of your last purchase? Share your experience with
          others!
        </p>
        <Rating
          name="size-large"
          className="mx-32 mt-5"
          value={rating}
          onChange={handleChange}
          defaultValue={0}
          size="large"
        />
        <p className="text-3xl font-pop font-bold mt-10">Review</p>
        <textarea
          value={Comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={60}
          className="textarea textarea-bordered font-pop outline-none bg-fffffb border-1 border-gray-300 rounded-lg w-full p-3 mt-3"
        />
        <p className="text-sm flex justify-end font-pop">{Comment.length}/60</p>
        <div className="w-full mt-5">
          <div>
            <button
              className="w-full font-pop btn normal-case text-white rounded-full bg-primary border-primary hover:bg-hoverADD hover:border-hoverADD"
              onClick={handleSubmit}
            >
              Submit review
            </button>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
    
  );
};

export default AddReview;
