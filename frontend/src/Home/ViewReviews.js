import { Divider, IconButton, Icon } from "@mui/material";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import AddReview from "./AddReview";
import { useEffect } from "react";
import axios from "axios";
const ViewReviews = ({ onClose,user,product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [update, setUpdate] = useState(false);
    const [ratings, setRatings] = useState([]);
  
    
    const [data, setData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const [ratingsResponse, commentsResponse] = await Promise.all([
            axios.get(`http://127.0.0.1:8000/homeLift/products/${product.id}/rating/`),
            axios.get(`http://127.0.0.1:8000/homeLift/products/${product.id}/comments/`),
          ]);
    
          const ratings = ratingsResponse.data;
          const comments = commentsResponse.data;
    
          const combinedData = ratings.map((rating) => {
            const comment = comments.find((c) => c.rating_id === rating.id);
            return { rating, comment };
          });
    
          setData(combinedData);
        } catch (error) {
          console.log(error);
        }
      };
    
      fetchData();
    }, [product.id,update]);
  return (
    <div className="flex justify-end font-pop items-center h-screen w-screen fixed top-0 left-0 bg-opacity-50 bg-gray-900 z-50">
      <div className="bg-white rounded-lg py-6 px-8 w-1/3 h-screen">
        <div className="flex justify-end">
          <IconButton onClick={onClose} className="">
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
        <h2
          className="text-black text-2xl font-bold mt-5 font-pop"
          onDoubleClick={(e) => {
            e.preventDefault();
          }}
          style={{ userSelect: "none" }}
        >
          {" "}
          Reviews{" "}
        </h2>

        <p
          className=" font-pop  text-3xl mt-3 font-bold text-black"
          onDoubleClick={(e) => {
            e.preventDefault();
          }}
          style={{ userSelect: "none" }}
        >
          3.0
        </p>
        <p
          className="text-sm mb-1 text-gray-400 font-pop"
          onDoubleClick={(e) => {
            e.preventDefault();
          }}
          style={{ userSelect: "none" }}
        >
          {" "}
          <span>
            <Rating
              name="size-large"
              className=" cursor-not-allowed mt-2  "
              readOnly
              defaultValue={0}
              size="small"
            />
          </span>{" "}
          (100)
        </p>
        <p
          className="text-lg font-pop text-gray-400 mt-10"
          onDoubleClick={(e) => {
            e.preventDefault();
          }}
          style={{ userSelect: "none" }}
        >
          Please log in to leave a review !{" "}
        </p>

        <div className="w-full mt-5">
          <div>
            <button
              onClick={() => setIsModalOpen(true)}
              className=" w-full font-pop text-lg btn normal-case text-white rounded-full bg-primary  border-primary hover:bg-hoverADD hover:border-hoverADD "
            >
              Write a review{" "}
            </button>
          </div>
          <p
            className="text-2xl font-pop text-black font-bold mt-5"
            onDoubleClick={(e) => {
              e.preventDefault();
            }}
            style={{ userSelect: "none" }}
          >
            Here's some reviews !
          </p>
          
         
            
          <div>
      {data.map((item) => (
        <div
          key={data.id}
          className="mt-2 rounded-lg p-3 border-2 border-gray-200 shadow-lg"
          onDoubleClick={(e) => {
            e.preventDefault();
          }}
          style={{ userSelect: "none" }}
        >
          <div>
            <p className="font-pop font-bold text-lg">{item.rating.rating_user}</p>
            <p className="font-pop font-bold text-lg">{item.comment.comment}</p>
            <Rating
          name="size-large"
          className="space-x-3 px-32 mt-5"
          value={item.rating.rating}
         
          defaultValue={0}
          size="large"
        />  <Divider />
          </div>
        </div>
      ))}
    </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <AddReview  setIsModalOpen={setIsModalOpen} user={user} product={product} setUpdate={setUpdate} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewReviews;
