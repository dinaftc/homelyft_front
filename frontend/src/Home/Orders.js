import Rect3 from "./Rectangle1.svg";
import Rect2 from "./Rectangle31.svg";

const Orders = () => {
  return (
    <div className=" p-40 flex flex-col"
    onDoubleClick={(e) => {
        e.preventDefault();
      }}
      style={{ userSelect: "none" }}>
      <div className="font-pop text-4xl font-semibold ">
        <h2>Orders Here !</h2>
      </div>
      <div className="flex justify-between mt-10 border-2 shadow-xl border-gray-300 rounded-xl ">
      <div className="flex flex-row ">
        <div className="rounded-lg   " style={{ width: "300px", height: "300px" }} >
          <img src={Rect3} className="rounded-lg" style={{ width: "100%", height: "100%" , objectFit:"cover", }} />
        </div>
        <div className=" flex flex-col justify-between ml-10 my-5">
            <div>
          <p className="font-pop text-3xl font-bold">PRODUCT TITLE</p>
          <p className="font-pop text-2xl font-normal">Description</p>
          </div>
          <p>Order type: </p>
        </div>
      </div>
      <div className=" pr-20 flex flex-col justify-end my-3" >
        <p className="font-pop text-2xl font-semibold">Price :</p>
        <p className="font pop text-lg font-semibold">Quantity:</p>
      </div>
      </div>
    </div>
  );
};

export default Orders;
