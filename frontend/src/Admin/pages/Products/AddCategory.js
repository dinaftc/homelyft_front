import { Divider } from "@mui/material";
import { useState } from "react";
import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import axios from "axios";
const Modal2 = ({ showModal, setShowModal }) => {
  const [Category, setCategory] = useState('');
  const handleAddCategory = (event) => {
    event.preventDefault();
    const categoryObj = { name: Category };
const categoryJson = JSON.stringify(categoryObj);

    axios
      .post("http://127.0.0.1:8000/homeLift/categories/", categoryJson, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => {
        const id = response.data.id;
        const subcategoryObj = { name: subCategories[0] };
        const subcategoryJson = JSON.stringify(subcategoryObj);
        
        console.log("category  added successfully");
        axios
          .post(
            `http://127.0.0.1:8000/homeLift/categories/${id}/subcategory-create/`,
            subcategoryJson,
            {
              headers: {
                "content-type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log("sub category added succesfully ");
          })
          .catch((error) => {
            console.error("Failed to add subcat", error);
          });
      })
      .catch((error) => {
        console.error("Failed to add category", error);
      });
      setShowModal(!showModal)
  };
  const [subCategories, setSubCategories] = useState([]);
  const handleAddSubCategory = () => {
    const subCategoryInput = document.getElementById("sub-category-input");
    const newSubCategory = subCategoryInput.value.trim();
    const categoryInput = document.getElementById("floating_outlined");
    const Category = categoryInput.value.trim();
    if (!Category) {
      alert("Please fill in the category input.");
      return;
    }

    if (!newSubCategory) {
      alert("Please fill in the sub-category input.");
      return;
    }

    if (subCategories.includes(newSubCategory)) {
      alert("This sub-category already exists.");
      return;
    }

    setSubCategories((prevSubCategories) => [
      ...prevSubCategories,
      newSubCategory,
    ]);
    subCategoryInput.value = "";
  };
  const handleDeleteSubCategory = (subCategoryToDelete) => {
    setSubCategories((prevSubCategories) =>
      prevSubCategories.filter(
        (subCategory) => subCategory !== subCategoryToDelete
      )
    );
  };

 
  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen fixed top-0 left-0 bg-opacity-50 bg-gray-900 z-50   ">
        <div className="bg-white rounded-lg p-5 w-1/3">
          <h2 className="text-black text-2xl font-bold mb-5 font-pop">
            Add category
          </h2>
          <Divider />
          <p className="text-black mt-5 text-sm w-full font-pop ">
            you can add a category here
          </p>
          <div class="relative mt-3 w-full">
            <input
              onChange={(event) => setCategory(event.target.value)}
              type="text"
              value={Category}
              id="floating_outlined"
              class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
              placeholder=" "
            />
            <label
              for="floating_outlined"
              class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Category*
            </label>
          </div>
          <div>
            <p className="text-black text-sm mt-6 font-pop">
              you can add a sub-category here
            </p>
          </div>
          <div className="flex flex-row mt-3 space-x-2 w-full">
            <div className=" relative basis-3/5">
              <input
                type="text"
                id="sub-category-input"
                class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
                placeholder=" "
              />
              <label
                for="sub-category-input"
                class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Sub-Category
              </label>
            </div>
            <div className="basis-2/5">
              <button
                onClick={handleAddSubCategory}
                className="font-pop btn normal-case rounded-full w-full text-sm text-white bg-primary border-primary hover:bg-hoverADD hover:border-hoverADD"
              >
                Add Sub Category
              </button>
            </div>
          </div>
          <div className="mt-3 ">
            <Stack
              direction="row"
              spacing={1}
              className="flex flex-wrap space-y-1 "
            >
              {subCategories.map((subCategory) => (
                <Chip
                  key={subCategory}
                  className="bg-primary hover:bg-primary hover:text-white  "
                  label={subCategory}
                  deleteIcon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
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
                  }
                  onDelete={() => handleDeleteSubCategory(subCategory)}
                />
              ))}
            </Stack>
          </div>
          <div className="flex flex-row  mt-5 justify-end gap-3">
            <div>
              <button
              onClick={() => setShowModal(!showModal)}
                className="font-pop btn btn-outline normal-case bg-gray-300 text-black hover:bg-gray-200 rounded-full border-transparent hover:border-transparent hover:text-black"
              >
                Cancel
              </button>
            </div>
            <div>
              <button
                onClick={handleAddCategory}
                className=" font-pop w-20 btn normal-case text-white rounded-full bg-primary  border-primary hover:bg-hoverADD hover:border-hoverADD "
              >
                Add{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal2;