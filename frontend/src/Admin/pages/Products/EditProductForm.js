import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditProductForm({ product, onClose }) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [quantity, setQuantity] = useState(product.quantity);
  const [inStock, setInStock] = useState(product.in_stock);
  const [id] = useState(product.id);
  const [subcategory] = useState(product.subcategory);
  const [image, setImage] = useState(product.image);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file.name);
      setImage(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(`http://127.0.0.1:8000/homeLift/products/${id}/images/`)
      .then((response) => response.json())
      .then((data) => {
        const ID = data.id;

        axios
          .put(
            `http://127.0.0.1:8000/homeLift/homeLift/products/images/${ID}/`,
            image,
            {
              headers: {
                "content-type": "multipart/form-data",
              },
            }
          )

          .then(() => {
            toast.success("Product image Edited !", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          })

          .catch((error) => {
            console.error(error);
            toast.error("Could not Edit Product", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });
      });
  };

  const handleVisibilityChange = (event) => {
    if (event.target.id === "Published") {
      setInStock(true);
    } else {
      setInStock(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between w-full">
        <div
          className="mt-5 mx-5 p-5 bg-offwhite w-3/5  shadow-md rounded-2xl h-120"
          style={{ backgroundColor: "#fffffb" }}
        >
          <label className="font-inter font-bold text-base leading-5 leading-trim-cap text-gray-700 mb-5">
            Basic informations
          </label>
          <input
            placeholder="Product name"
            className="bg-fffffb border-2 border-gray-300 outline-none rounded-lg w-full p-3 my-3 h-13"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <br />
          <textarea
            className="textarea textarea-bordered  outline-none bg-fffffb border-2 border-gray-300 rounded-lg w-full p-3 mt-3 "
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className="mx-5 my-5 p-5 bg-offwhite h- shadow-md rounded-2xl">
          <label className="outline-none font-inter font-bold text-base leading-5 leading-trim-cap text-gray-700 mb-5">
            Product Image
          </label>
          <div id="form-file-upload">
            <input
              type="file"
              id="input-file-upload"
              multiple={true}
              onChange={handleChange}
            />
            <label id="label-file-upload" htmlFor="input-file-upload">
              <div>
                {selectedFile ? (
                  <ul className="upload-button">
                    {selectedFile && (
                      <p className="font-inter font-normal text-xs leading-4 leading-trim-cap text-gray-400">
                        {selectedFile} selected
                      </p>
                    )}
                  </ul>
                ) : (
                  <p className="upload-button"> Upload your product image.</p>
                )}
              </div>
            </label>
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full">
        <div
          className="mt-5 ml-5 mr-12 p-5 bg-offwhite w-3/5 shadow-md rounded-2xl h-3/5"
          style={{ backgroundColor: "#fffffb" }}
        >
          <div class="flex my-2">
            <label className="font-inter font-bold text-base leading-5 leading-trim-cap text-gray-700 ">
              Stock{" "}
            </label>

            <input
              placeholder="Quantity"
              class="bg-fffffb outline-none border-2 border-gray-300 rounded-lg w-1/2 p-3  mx-5 h-13"
              type="number"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
            />
            <label className="font-inter font-bold text-base leading-5 leading-trim-cap text-gray-700 ">
              Price
            </label>

            <input
              placeholder="Price"
              class="bg-fffffb border-2 outline-none border-gray-300 rounded-lg w-1/2 p-3 mx-5 h-13"
              type="number"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
        </div>

        <div
          className="mr-5 ml-12 my-5 p-5 bg-offwhite shadow-md rounded-2xl "
          style={{ flex: 1, backgroundColor: "#fffffb" }}
        >
          <label className="font-inter font-bold text-base  outline-none leading-5 leading-trim-cap text-gray-700 ">
            Visibility
          </label>
          <br />
          <div class="my-2">
            <div class="flex items-center">
              <input
                type="radio"
                name="visibility"
                id="Published"
                className="mr-2 outline-none "
                value={inStock}
                checked={inStock === true}
                onChange={handleVisibilityChange}
              />
              <label
                for="Published"
                className="font-inter font-semibold text-base leading-5 leading-trim-cap text-gray-600
"
              >
                Published
              </label>
            </div>
            <div class="flex items-center">
              <input
                type="radio"
                name="visibility"
                id="Hidden"
                class="mr-2 outline-none"
              />
              <label
                for="Hidden"
                className="font-inter font-semibold text-base leading-5 leading-trim-cap text-gray-600
"
              >
                Hidden
              </label>
            </div>
            <div class="flex items-center">
              <input
                type="radio"
                name="visibility"
                id="Scheduled"
                class="mr-2 outline-none"
              />
              <label
                for="Scheduled"
                className="font-inter font-semibold text-base leading-5 leading-trim-cap text-gray-600
"
              >
                Scheduled
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end w-full">
        <button
          className="btn bg-greey rounded-full p-3 m-3 border-none"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="bg-primary rounded-full p-3 m-3"
          onClick={handleSubmit}
        >
          Edit Product
        </button>
      </div>

      <ToastContainer />
    </div>
  );
}
export default EditProductForm;
