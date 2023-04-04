import { useState } from "react";
import axios from "axios";
function EditProductForm({ product, onClose }) {
  const [name, setName] = useState(product.name);

  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [quantity, setQuantity] = useState(product.quantity);
  const [inStock, setInStock] = useState(product.in_stock);
  const [id,setId]=useState(product.id);
  const [subcategory, setCategory] = useState(product.subcategory,);
  const handleSubmit = (event) => {
    event.preventDefault();

    axios.put(`http://127.0.0.1:8000/homeLift/products/${id}/`, {
        name,
        price,
        description,
        quantity,
        in_stock: inStock,
        subcategory,
      }, {
        headers: {
          'content-type': 'multipart/form-data',
        }
      })
      .then(() => {
        console.log("Product updated successfully");
        onClose();
      })
      .catch((error) => {
        console.error(error);
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
    
    <div class="w-90 h-90 flex items-center justify-center bg-gray-100">
    <div class="w-90 h-90 bg-white shadow-lg rounded-lg p-8">
      <form className="block">
        <label className="font-inter font-bold text-base leading-5 leading-trim-cap text-gray-700 mb-5">Basic informations</label>
        <input
          placeholder="Product name"
          className="bg-fffffb border-2 border-gray-300 rounded-lg w-full p-3 my-3 h-13"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <br />
        <br />
        <textarea className="textarea textarea-bordered bg-fffffb border-2 border-gray-300 rounded-lg w-full p-3 mt-3"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <label className="font-inter font-bold text-base leading-5 leading-trim-cap text-gray-700 ">Stock & Price</label>
        <br />
        <input
          placeholder="Quantity"
          class="bg-fffffb border-2 border-gray-300 rounded-lg w-1/2 p-3 mx-5 h-13"
          type="number"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
        />
        <input
          placeholder="Price"
          class="bg-fffffb border-2 border-gray-300 rounded-lg w-1/2 p-3 mx-5 h-13"
          type="number"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
        <label className="font-inter font-bold text-base leading-5 leading-trim-cap text-gray-700 ">Visibility</label>
        <br />
        <input type="radio" name="visibility" id="Published" className="mr-2 " value={inStock} onChange={handleVisibilityChange} />
        <label for="Published" className="font-inter font-semibold text-base leading-5 leading-trim-cap text-gray-600">Published</label>
        <input type="radio" name="visibility" id="Hidden" class="mr-2" />
        <label for="Hidden" className="font-inter font-semibold text-base leading-5 leading-trim-cap text-gray-600">Hidden</label>
        <input type="radio" name="visibility" id="Scheduled" class="mr-2" />
        <label for="Scheduled" className="font-inter font-semibold text-base leading-5 leading-trim-cap text-gray-600">Scheduled</label>
        <div className="flex justify-end w-full">
          <button className="bg-greey rounded-full p-3 m-3">Cancel</button>
          <button className="bg-teal-500 rounded-full p-3 m-3" onClick={handleSubmit}>Edit Product</button>
        </div>
      </form>
    </div>
  </div>
  
  );
}
export default EditProductForm;