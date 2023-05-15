<<<<<<< HEAD
/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import "./AddProduct.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddProduct() {
  const [name, setName] = useState("");
  const [ setSelectedFile] = useState(null);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [subcategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategory, setSubCategory] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/homeLift/categories/")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
  }, []);
  

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
    setImages(true);
  };

  const handleAddProduct = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("quantity", quantity);
    formData.append("category", category);
    formData.append("subcategory", subcategory);

    axios
      .post("http://127.0.0.1:8000/homeLift/products/", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Product added successfully");
        const formData = new FormData();
        selectedFiles.forEach((file) => {
          formData.append("image", file);
          axios
            .post(
              `http://127.0.0.1:8000/homeLift/products/${response.data.id}/images-create/`,
              formData,
              {
                headers: {
                  "content-type": "multipart/form-data",
                },
              }
            )
            .then((response) => {
              console.log("Product images added successfully");
              console.log(response.data);
              toast.success("Product added successfully!", {
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
              console.error("Error adding product images:", error);
            });
        });
        
      })
      .catch((error) => {
        console.log("Failed to add product");
        console.error(error);
      })
      .finally(() => {
        // Reset the input values
        setName("");
        setSelectedFile("");
        setImages(false);
        setPrice("");
        setDescription("");
        setQuantity("");
        
        setSubCategory("");
        setCategory("");
        // Close the modal
      });
  };

  function handleCategoryChange(event) {
    setCategory(event.target.value);
    console.log(category)
    fetch(
      `http://127.0.0.1:8000/homeLift/categories/${category}/subcategory/`
    )
    .then((response) => response.json())
      .then((data) => {
        setSubCategories(data);
      })

  }
  function handlesubCategoryChange(event) {
    setSubCategory(event.target.value);
    console.log(subcategory)
  }

  return (
    <div className="dashboard-content ">
      <DashboardHeader />

      <div className="flex justify-between  w-full">
        <div className="bg-white mt-5 mx-5 p-5  w-3/5 shadow-md rounded-2xl h-120">
          <label className="font-inter font-bold text-base leading-5 leading-trim-cap text-gray-700 mb-5">
            Basic informations
          </label>
          <input
            placeholder="Product name*"
            className="bg-fffffb border-2 border-gray-300 outline-none rounded-lg w-full p-3 my-3 h-13"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <br />
          <select
            className=" outline-none bg-fffffb border-2 border-gray-300 rounded-lg w-full p-3 my-3 h-13 font-poppins font-normal text-base leading-6 "
            value={category}
            onChange={handleCategoryChange}
          >
            <option
              value=""
              className="font-poppins font-normal text-base leading-6 text-gray-400 "
            >
              Category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
            <br />
          </select>
          <select
            className=" outline-none bg-fffffb border-2 border-gray-300 rounded-lg w-full p-3 my-3 h-13 font-poppins font-normal text-base leading-6 "
            value={subcategory}
            onChange={handlesubCategoryChange}
          >
            <option
              value=""
              className="font-poppins font-normal text-base leading-6 text-gray-400 "
            >
              SubCategory
            </option>
            {subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </option>
            ))}
          </select>
          <br />
          <textarea
            className="textarea textarea-bordered  outline-none bg-fffffb border-2 border-gray-300 rounded-lg w-full p-3 mt-3 "
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        
          {!images ? (
            <div className="mx-5 my-5 p-5 bg-white h-80 shadow-md rounded-2xl">
            <label className=" outline-none font-inter font-bold text-base leading-5 leading-trim-cap text-gray-700 mb-5">
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
                  <p className="upload-button">Upload your product image.</p>
                  <p className="font-inter font-normal text-xs leading-4 leading-trim-cap text-gray-400">
                    Only PNG, JPG format allowed <br />
                    500x500 pixels are recommended
                  </p>
                </div>
              </label>
            </div>
            </div>
          ) :<div className="mx-5 my-5 p-5 bg-white h-96 shadow-md rounded-2xl">
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
            {selectedFiles ? (
              <div className="image-preview-container">
                <img
                  className="w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  src={previewImages[0]}
                  alt=""
                />
                <div className="smaller-images-container">
                  {previewImages.slice(1).map((file) => (
                    <li
                      
                      className="w-1/5 mx-2 mb-4 relative list-none"
                    >
                      <img
                        src={file}
                        alt=""
                        className="smaller-image"
                      />
                     
                    </li>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <label id="label-file-upload" htmlFor="input-file-upload">
                  <div className="upload-button">
                    Upload your product image.
                  </div>
                  <p className="font-inter font-normal text-xs leading-4 leading-trim-cap text-gray-400">
                    Only PNG, JPG format allowed <br />
                     500x500 pixels are recommended
                  </p>
                </label>
              </>
            )}</label>
          </div>
        </div>
        }
        
      </div>
      <div className="flex justify-between w-full">
        <div className="my-5 ml-5 mr-12 pt-4 px-5 pb-16 bg-white w-3/5 shadow-md rounded-2xl h-3/5">
          <label className="font-inter font-bold text-base leading-5 leading-trim-cap text-gray-700 ">
            Stock & Price
          </label>
          <br />
          <div class="flex my-2">
            <input
              placeholder="Quantity*"
              class="bg-fffffb outline-none border-2 border-gray-300 rounded-lg w-1/2 p-3  mx-5 h-13"
              type="number"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
            />
            <input
              placeholder="Price*"
              class="bg-fffffb border-2 outline-none border-gray-300 rounded-lg w-1/2 p-3 mx-5 h-13"
              type="number"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
        </div>

        <div
          className="mr-5 ml-12 my-5 p-5 bg-white shadow-md rounded-2xl "
          style={{ flex: 1 }}
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
        <Link
          className="btn bg-greey rounded-full p-3 m-3 border-none"
          to="/products"
        >
          Cancel
        </Link>
        <button
          className="bg-teal-500 rounded-full p-3 m-3"
          type="submit"
          onClick={handleAddProduct}
        >
          Add Product
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddProduct;
=======
/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import "./AddProduct.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddProduct() {
  const [name, setName] = useState("");
  const [ setSelectedFile] = useState(null);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [subcategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategory, setSubCategory] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/homeLift/categories/")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
  }, []);
  

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
    setImages(true);
  };

  const handleAddProduct = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("quantity", quantity);
    formData.append("category", category);
    formData.append("subcategory", subcategory);

    axios
      .post("http://127.0.0.1:8000/homeLift/products/", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Product added successfully");
        const formData = new FormData();
        selectedFiles.forEach((file) => {
          formData.append("image", file);
          axios
            .post(
              `http://127.0.0.1:8000/homeLift/products/${response.data.id}/images-create/`,
              formData,
              {
                headers: {
                  "content-type": "multipart/form-data",
                },
              }
            )
            .then((response) => {
              console.log("Product images added successfully");
              console.log(response.data);
              toast.success("Product added successfully!", {
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
              console.error("Error adding product images:", error);
            });
        });
        
      })
      .catch((error) => {
        console.log("Failed to add product");
        console.error(error);
      })
      .finally(() => {
        // Reset the input values
        setName("");
        setSelectedFile("");
        setImages(false);
        setPrice("");
        setDescription("");
        setQuantity("");
        
        setSubCategory("");
        setCategory("");
        // Close the modal
      });
  };

  function handleCategoryChange(event) {
    setCategory(event.target.value);
    console.log(category)
    fetch(
      `http://127.0.0.1:8000/homeLift/categories/${category}/subcategory/`
    )
    .then((response) => response.json())
      .then((data) => {
        setSubCategories(data);
      })

  }
  function handlesubCategoryChange(event) {
    setSubCategory(event.target.value);
    console.log(subcategory)
  }

  return (
    <div className="dashboard-content ">
      <DashboardHeader />

      <div className="flex justify-between  w-full">
        <div className="bg-white mt-5 mx-5 p-5  w-3/5 shadow-md rounded-2xl h-120">
          <label className="font-inter font-bold text-base leading-5 leading-trim-cap text-gray-700 mb-5">
            Basic informations
          </label>
          <input
            placeholder="Product name*"
            className="bg-fffffb border-2 border-gray-300 outline-none rounded-lg w-full p-3 my-3 h-13"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <br />
          <select
            className=" outline-none bg-fffffb border-2 border-gray-300 rounded-lg w-full p-3 my-3 h-13 font-poppins font-normal text-base leading-6 "
            value={category}
            onChange={handleCategoryChange}
          >
            <option
              value=""
              className="font-poppins font-normal text-base leading-6 text-gray-400 "
            >
              Category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
            <br />
          </select>
          <select
            className=" outline-none bg-fffffb border-2 border-gray-300 rounded-lg w-full p-3 my-3 h-13 font-poppins font-normal text-base leading-6 "
            value={subcategory}
            onChange={handlesubCategoryChange}
          >
            <option
              value=""
              className="font-poppins font-normal text-base leading-6 text-gray-400 "
            >
              SubCategory
            </option>
            {subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </option>
            ))}
          </select>
          <br />
          <textarea
            className="textarea textarea-bordered  outline-none bg-fffffb border-2 border-gray-300 rounded-lg w-full p-3 mt-3 "
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        
          {!images ? (
            <div className="mx-5 my-5 p-5 bg-white h-80 shadow-md rounded-2xl">
            <label className=" outline-none font-inter font-bold text-base leading-5 leading-trim-cap text-gray-700 mb-5">
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
                  <p className="upload-button">Upload your product image.</p>
                  <p className="font-inter font-normal text-xs leading-4 leading-trim-cap text-gray-400">
                    Only PNG, JPG format allowed <br />
                    500x500 pixels are recommended
                  </p>
                </div>
              </label>
            </div>
            </div>
          ) :<div className="mx-5 my-5 p-5 bg-white h-96 shadow-md rounded-2xl">
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
            {selectedFiles ? (
              <div className="image-preview-container">
                <img
                  className="w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  src={previewImages[0]}
                  alt=""
                />
                <div className="smaller-images-container">
                  {previewImages.slice(1).map((file) => (
                    <li
                      
                      className="w-1/5 mx-2 mb-4 relative list-none"
                    >
                      <img
                        src={file}
                        alt=""
                        className="smaller-image"
                      />
                     
                    </li>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <label id="label-file-upload" htmlFor="input-file-upload">
                  <div className="upload-button">
                    Upload your product image.
                  </div>
                  <p className="font-inter font-normal text-xs leading-4 leading-trim-cap text-gray-400">
                    Only PNG, JPG format allowed <br />
                     500x500 pixels are recommended
                  </p>
                </label>
              </>
            )}</label>
          </div>
        </div>
        }
        
      </div>
      <div className="flex justify-between w-full">
        <div className="my-5 ml-5 mr-12 pt-4 px-5 pb-16 bg-white w-3/5 shadow-md rounded-2xl h-3/5">
          <label className="font-inter font-bold text-base leading-5 leading-trim-cap text-gray-700 ">
            Stock & Price
          </label>
          <br />
          <div class="flex my-2">
            <input
              placeholder="Quantity*"
              class="bg-fffffb outline-none border-2 border-gray-300 rounded-lg w-1/2 p-3  mx-5 h-13"
              type="number"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
            />
            <input
              placeholder="Price*"
              class="bg-fffffb border-2 outline-none border-gray-300 rounded-lg w-1/2 p-3 mx-5 h-13"
              type="number"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
        </div>

        <div
          className="mr-5 ml-12 my-5 p-5 bg-white shadow-md rounded-2xl "
          style={{ flex: 1 }}
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
        <Link
          className="btn bg-greey rounded-full p-3 m-3 border-none"
          to="/products"
        >
          Cancel
        </Link>
        <button
          className="bg-teal-500 rounded-full p-3 m-3"
          type="submit"
          onClick={handleAddProduct}
        >
          Add Product
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddProduct;
>>>>>>> 1bda2f42a11c9147e71701bea68ed08fc90b8ebb
