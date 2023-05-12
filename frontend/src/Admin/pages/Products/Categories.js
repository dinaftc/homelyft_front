import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal2 from "./AddCategory";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import add from "../../assets/icons/plus.png";
import { Icon, IconButton } from "@mui/material";

const Category = () => {
  const [subCategories, setMySubCategory] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [TotalCategories, setTotalCategories] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const handleDelete = () => {
    console.info("You clicked the delete icon.");
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
  }, []);

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

        {/* <TableContainer component={Paper} className="font-pop">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>

                  <TableCell>Sub-Category</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Categories.map((category) => (
                  <React.Fragment key={category.id}>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {category.name}
                      </TableCell>

                      <TableCell align="right">
                        <Stack
                          direction="row"
                          spacing={1}
                          className="flex flex-wrap space-y-1 "
                        >
                          {category.subCategories.map((subCategory) => (
                            <Chip
                              key={subCategory.id}
                              className="bg-white hover:bg-primary hover:text-white text-black font-pop   "
                              label={subCategory.name}
                              onDelete={handleDelete}
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
                            />
                          ))}
                         <img src={add}/>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer> */}
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
                      <div>
                        <ul className=" border-primary border p-2 text-sm rounded-full bg-white font-pop outline-primary text-black hover:text-white hover:bg-primary">
                          {category.subCategories.map((subCategory) => (
                            <>
                              <label>{subCategory.name}</label>
                              <IconButton />
                            </>
                          ))}
                        </ul>
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

export default Category;