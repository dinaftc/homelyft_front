import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineCancel } from "react-icons/md";
function EditProductForm({ product, onClose }) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [quantity, setQuantity] = useState(product.quantity);

  const [id] = useState(product.id);
  const [subcategory] = useState(product.subcategory);

  const [productImages, setProductImages] = useState(product.productImages);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [previewImages, setPreviewImages] = useState([]);

  const handleFileSelect = (e) => {
    const files = e.target.files;
    const selectedFilesArray = Array.from(files);
    setSelectedFiles(selectedFilesArray);

    const previewImagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setPreviewImages(previewImagesArray);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("subcategory", subcategory);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("quantity", quantity);

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/homeLift/products/${id}/`,
        formData
      );

      if (productImages.length < 5) {
        const formData = new FormData();

        selectedFiles.forEach((file) => {
          formData.append("image", file);
        });

        await axios.post(
          `http://127.0.0.1:8000/homeLift/products/${response.data.id}/images-create/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Product edited successfully");
        toast.success("Product edited successfully!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Please delete an image to add another one!", {
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
      console.error(error);
      toast.error("Could not edit product", {
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
  };

  const handleDeleteImage = (ID) => {
    fetch(`http://127.0.0.1:8000/homeLift/products/images/${ID}/`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete image.");
        }
        // remove the deleted image from the state
        setProductImages(productImages.filter((file) => file.id !== ID));
      })
      .catch((error) => {
        console.error(error);
        // display an error message to the user
        alert("Failed to delete image.");
      });
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
              onChange={handleFileSelect}
            />
            <label id="label-file-upload" htmlFor="input-file-upload">
              <div>
                <ul className="upload-button">
                  {selectedFiles.length === 0 ? (
                    
                      <div class="flex flex-wrap">
                        {productImages.map((file) => (
                          <li key={file.name} class="w-1/5 mx-2 mb-4">
                            <img
                              src={file.image}
                              alt=""
                              class="w-full h-full"
                            />
                            <button
                              class="absolute bottom-14 left-10 "
                              onClick={() => handleDeleteImage(file.id)}
                            >
                              <MdOutlineCancel />
                            </button>
                          </li>
                        ))}
                      </div>
                   
                  ) : (
                    <div class="flex flex-wrap">
                      {productImages.map((file) => (
                        <li key={file.name} class="w-1/5 mx-2 mb-4">
                          <img src={file.image} alt="" class="w-full h-full" />
                          <button
                            class="absolute bottom-14 left-10 "
                            onClick={() => handleDeleteImage(file.id)}
                          >
                            <MdOutlineCancel />
                          </button>
                        </li>
                      ))}
                      {previewImages.map((file) => (
                        <li key={file.name} class="w-1/5 mx-2 mb-4 relative">
                          <img
                             src={file}
                            alt=""
                            class="w-full h-full"
                          />
                          <button
                            class="absolute bottom-14 left-10 "
                           
                          >
                            <MdOutlineCancel />
                          </button>
                        </li>
                       
                      ))}
                  </div>
                  )}
                </ul>
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
