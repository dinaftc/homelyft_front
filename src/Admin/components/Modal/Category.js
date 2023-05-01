import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal2 from "./Modal2";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useState } from "react";

const Category = () => {
  const [subCategories, setMySubCategory] = useState([]);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="font-pop rounded-3xl  h-screen">
      <div className="bg-white rounded-lg">
        <div className="flex flex-row bg-white rounded-lg p-5 gap-3">
          <h1 className="text-black text-2xl mt-1">Categories</h1>
          <div className="">
            <button
              onClick={() => setShowModal(true)}
              className="btn normal-case rounded-full w-full bg-primary hover:bg-hoverADD text-white border-none hover:border-none"
            >
              Add Category
            </button>
          </div>
        </div>
        {showModal && <Modal2 />}
        <div className="mt-5">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Sub-Category</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    category
                  </TableCell>
                  <TableCell align="right">quantity</TableCell>
                  <TableCell align="right">
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
                        />
                      ))}
                    </Stack>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Category;
