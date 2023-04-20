import { useEffect,useState } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import './AddProduct.css';
import axios from "axios";
import { Link } from "react-router-dom";
function AddProduct() {
const [name, setName] = useState("");
const [image, setImage] = useState(null);
const [selectedFile, setSelectedFile] = useState(null);
const [price, setPrice] = useState("");
const [description, setDescription] = useState("");
const [quantity, setQuantity] = useState("");
const [in_stock, setInStock] = useState("");
const [subcategory, setSubCategory] = useState("");
const [categories, setCategories] = useState([]);

useEffect(() => {
  fetch('http://127.0.0.1:8000/homeLift/categories/')
    .then(response => response.json())
    .then(data => setCategories(data));
}, []);



const handleChange = function(e) {
  e.preventDefault();
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    setSelectedFile(file.name);
    setImage(file);
  }
};
const handleVisibilityChange = (event) => {
  if (event.target.id === "Published") {
    setInStock(true);
  } else {
    setInStock(false);
  }
};

// triggers the input when the button is clicked

const handleAddProduct = (event) => {
  event.preventDefault();
  axios.post("http://127.0.0.1:8000/homeLift/products/", {
    name,
    image,
    price,
    description,
    quantity,
    in_stock,
    subcategory,
  }, {
    headers: {
      'content-type': 'multipart/form-data',
     
    }
  })
  .then((response) => {
    console.log("Product added successfully");
    window.alert("Product added successfully")
    // Reset the input values
    setName("");
    setImage("");
    setPrice("");
    setDescription("");
    setQuantity("");
    setInStock("");
    setSubCategory("");
    // Close the modal
  })
  .catch((error) => {
    console.log("Failed to add product");
    console.error(error);
  });
};
  function handleCategoryChange(event) {
    setSubCategory(event.target.value);
  }
 
   
   
  return (
  
<div className="dashboard-content bg-white">
  <DashboardHeader />

  <form onSubmit={handleAddProduct} className="block">
    <div className="flex justify-between  w-full">
      <div className="mt-5 mx-5 p-5 bg-offwhite w-3/5 shadow-md rounded-2xl h-120">
      <label className="font-inter font-bold text-base leading-5 leading-trim-cap text-gray-700 mb-5">Basic informations</label>
        <input
        placeholder="Product name"
        className="bg-fffffb border-2 border-gray-300 outline-none rounded-lg w-full p-3 my-3 h-13"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <br />
        <select  className=" outline-none bg-fffffb border-2 border-gray-300 rounded-lg w-full p-3 my-3 h-13 font-poppins font-normal text-base leading-6 " value={subcategory} onChange={handleCategoryChange}>
          <option value="" className="font-poppins font-normal text-base leading-6 text-gray-400 ">Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <br />
        <textarea  className="textarea textarea-bordered  outline-none bg-fffffb border-2 border-gray-300 rounded-lg w-full p-3 mt-3 "
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
       
        
      </div>
      <div className="mx-5 my-5 p-5 bg-offwhite h-80 shadow-md rounded-2xl">
  <label className=" outline-none font-inter font-bold text-base leading-5 leading-trim-cap text-gray-700 mb-5">Product Image</label>
  <div id="form-file-upload" >
    <input type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
    <label id="label-file-upload" htmlFor="input-file-upload">
      <div>
        <p className="upload-button">Upload your product image.</p>
        {selectedFile && <p className="font-inter font-normal text-xs leading-4 leading-trim-cap text-gray-400">{selectedFile} selected</p>}
        <p className="font-inter font-normal text-xs leading-4 leading-trim-cap text-gray-400">Only PNG, JPG format allowed <br />500x500 pixels are recommended </p>
      </div> 
    </label>
  </div>
</div>
    </div>
    <div className="flex justify-between w-full">
  <div className="mt-5 ml-5 mr-12 p-5 bg-offwhite w-3/5 shadow-md rounded-2xl h-3/5">
    <label className="font-inter font-bold text-base leading-5 leading-trim-cap text-gray-700 ">Stock & Price</label>
    <br />
    <div class="flex my-2">
      <input
        placeholder="Quantity"
        class="bg-fffffb outline-none border-2 border-gray-300 rounded-lg w-1/2 p-3  mx-5 h-13"
        type="number"
        value={quantity}
        onChange={(event) => setQuantity(event.target.value)}
      />
      <input
        placeholder="Price"
        class="bg-fffffb border-2 outline-none border-gray-300 rounded-lg w-1/2 p-3 mx-5 h-13"
        type="number"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
      />
    </div>
  </div>

  <div className="mr-5 ml-12 my-5 p-5 bg-offwhite shadow-md rounded-2xl "  style={{flex: 1}}>
    <label className="font-inter font-bold text-base  outline-none leading-5 leading-trim-cap text-gray-700 ">Visibility</label>
    <br />
    <div class="my-2">
  <div class="flex items-center">
    <input type="radio" name="visibility" id="Published" className="mr-2 outline-none " value={in_stock}onChange={handleVisibilityChange}/>
    <label for="Published" className="font-inter font-semibold text-base leading-5 leading-trim-cap text-gray-600
">Published</label>
  </div>
  <div class="flex items-center">
    <input type="radio" name="visibility" id="Hidden" class="mr-2 outline-none" />
    <label for="Hidden" className="font-inter font-semibold text-base leading-5 leading-trim-cap text-gray-600
">Hidden</label>
  </div>
  <div class="flex items-center">
    <input type="radio" name="visibility" id="Scheduled" class="mr-2 outline-none" />
    <label for="Scheduled" className="font-inter font-semibold text-base leading-5 leading-trim-cap text-gray-600
">Scheduled</label>
  </div>
</div>


    
  </div>
</div>
<div className="flex justify-end w-full">
<Link className="btn bg-greey rounded-full p-3 m-3 border-none" to='/products'>Cancel</Link>
  <button className="bg-teal-500 rounded-full p-3 m-3" type="submit">Add Product</button>

</div>

    
  </form>
</div>


  );
}
  
  export default AddProduct;