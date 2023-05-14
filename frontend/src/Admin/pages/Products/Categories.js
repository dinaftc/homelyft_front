import * as React from "react";
import Modal2 from "./AddCategory";
import { useState, useEffect } from "react";
import { Divider, IconButton } from "@mui/material";
import ModalAddSubCategory from "./ModalAddSubCategory";
import axios from "axios";

const Categories = () => {
  const [subCategories, setMySubCategory] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [TotalCategories, setTotalCategories] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showModalSub, setShowModalSub] = useState(false);
  const [TriggerFetch, setTriggerFetch] = useState(false);
  const handleDeleteSubCategory = (categoryId, subCategoryId) => {
    axios
      .delete(
        `http://127.0.0.1:8000/homeLift/categories/subcategory/${subCategoryId}`
      )
      .then((response) => {
        // If the request is successful, update the state by removing the deleted subcategory
        const updatedCategories = Categories.map((category) => {
          if (category.id === categoryId) {
            const updatedSubCategories = category.subCategories.filter(
              (subCategory) => subCategory.id !== subCategoryId
            );
            return { ...category, subCategories: updatedSubCategories };
          }
          return category;
        });
        setCategories(updatedCategories);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/homeLift/categories/")
      .then((response) => response.json())
      .then((data) => {
        const totalCategories = data.length;
        setTotalCategories(totalCategories);
        setCategories(data);
      })
      .catch((error) => console.error(error));
  }, [TriggerFetch]);

  return (
    <div className="dashboard-content-container ">
      <div className="bg-white rounded-lg">
        <div className="flex flex-row bg-white rounded-lg p-5 gap-3">
          <div className="dashboard-content-header">
            <p className="text-black text-2xl mt-1 ">Categories</p>
          </div>
          <div className="">
            <button
              onClick={() => setShowModal(!showModal)}
              className="btn normal-case rounded-full w-full bg-primary text-white border-none hover:border-none"
            >
              Add Category
            </button>
          </div>
        </div>
        {showModal && (
          <Modal2 showModal={showModal} setShowModal={setShowModal} />
        )}

        <div class="w-full overflow-x-auto p-5 ">
          <table class="table-auto">
            <tbody className="text-xl">
              <tr>
                <th class=" align-middle text-lg">Category</th>
                <th class=" align-middle text-center text-lg">Quantity</th>
                <th class=" align-middle text-left text-lg">Sub-Categories</th>
              </tr>
            </tbody>
            <tbody>
              {Categories.map((category) => (
                <React.Fragment key={category.id}>
                  <tr>
                    <td class="  align-middle">{category.name}</td>
                    <td class="  align-middle text-center">
                      {category.quantity}
                    </td>
                    <td class="  align-middle text-left">
                      <div className="flex flex-wrap">
                        {category.subCategories.map((subCategory) => (
                          <ul className="  border-primary mx-1 border pl-2 text-sm rounded-full bg-white font-pop outline-primary text-black hover:text-white hover:bg-primary">
                            <label>{subCategory.name}</label>
                            <IconButton
                              id="deleteSubCategory"
                              onClick={() =>
                                handleDeleteSubCategory(
                                  category.id,
                                  subCategory.id
                                )
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="18px"
                                viewBox="0 0 24 24"
                                width="18px"
                                fill="#f44335"
                              >
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                              </svg>
                            </IconButton>
                          </ul>
                        ))}

                        <div className=" my-1 ml-1 border-primary border  text-sm rounded-full bg-white font-pop outline-primary  hover:bg-gray-200">
                          <IconButton
                            id="addSub"
                            onClick={() => setShowModalSub(!showModalSub)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class="feather feather-plus"
                            >
                              <line x1="12" y1="5" x2="12" y2="19"></line>
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                          </IconButton>
                          {showModalSub && (
                            <ModalAddSubCategory
                              showModalSub={showModalSub}
                              setShowModalSub={setShowModalSub}
                              categoryId={category.id}
                              Categories={Categories}
                              setCategories={setCategories}
                              TriggerFetch={TriggerFetch}
                              setTriggerFetch={setTriggerFetch}
                            />
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Categories;
