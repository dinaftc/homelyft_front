import axios from "axios";
import { useState } from "react";

const ModalAddSubCategory = ({
  showModalSub,
  setShowModalSub,
  categoryId,
  Categories,
  setCategories,
}) => {
  const [subCategoryName, setSubCategoryName] = useState("");

  const addSubCategory = () => {
    const subcategoryObj = { name: subCategoryName };
    const subcategoryJson = JSON.stringify(subcategoryObj);
    axios
      .post(
        `http://127.0.0.1:8000/homeLift/categories/${categoryId}/subcategory-create/`,
        subcategoryJson,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then((response) => {
        // Update state to show the new subcategory
        const updatedCategories = Categories.map((category) => {
          if (category.id === categoryId) {
            return {
              ...category,
              subCategories: [...category.subCategories, response.data],
            };
          } else {
            return category;
          }
        });
        setCategories(updatedCategories);
        setShowModalSub(false);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen fixed top-0 left-0 bg-opacity-50 bg-gray-900 z-50">
      <div className=" flex flex-col bg-white rounded-lg p-5 w-1/3">
        <div className="">
          <p className="font-pop text-black text-2xl ">
            Add another Sub-Category
          </p>
        </div>
        <div class="relative mt-3 w-full">
          <input
            type="text"
            id="sub-category-input"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 border border-gray-400 bg-transparent rounded-lg border-1  appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
            placeholder=" "
            value={subCategoryName}
            onChange={(e) => setSubCategoryName(e.target.value)}
          />
          <label
            for="sub-category-input"
            class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            Sub-Category
          </label>
        </div>
        <div className="flex flex-row  mt-5 justify-end gap-3">
          <div>
            <button
              onClick={() => setShowModalSub(false)}
              className="font-pop btn btn-outline normal-case bg-gray-300 text-black hover:bg-gray-200 rounded-full border-transparent hover:border-transparent hover:text-black"
            >
              Cancel
            </button>
          </div>
          <div>
            <button
              onClick={addSubCategory}
              className=" font-pop w-20 btn normal-case text-white rounded-full bg-primary  border-primary hover:bg-primary hover:border-primary"
            >
              Add{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddSubCategory;


