// import React, { Fragment, useEffect } from "react";
// import { DataGrid } from "@material-ui/data-grid";
// import "./ProductList.css";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   clearErrors,
//   getAdminProduct,
//   deleteProduct,
// } from "../actions/productActions";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// // import { Button } from "@material-ui/core";
// import MetaData from "../layout/MetaData";
// // import EditIcon from "@material-ui/icons/Edit";
// // import DeleteIcon from "@material-ui/icons/Delete";
// import SideBar from "./Sidebar";
// import { DELETE_PRODUCT_RESET } from "../constant/productConstant";
// import { useNavigate } from 'react-router-dom'
// import { FaEye, FaTrash } from 'react-icons/fa';

// const ProductList = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate()


//   const { error, products } = useSelector((state) => state.products);

//   const { error: deleteError, isDeleted } = useSelector(
//     (state) => state.product
//   );

//   const deleteProductHandler = (id) => {
//     dispatch(deleteProduct(id));
//   };

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(clearErrors());
//     }

//     if (deleteError) {
//       toast.error(deleteError);
//       dispatch(clearErrors());
//     }

//     if (isDeleted) {
//       toast.success("Product Deleted Successfully");
//       navigate("/admin/dashboard");
//       dispatch({ type: DELETE_PRODUCT_RESET });
//     }

//     dispatch(getAdminProduct());
//   }, [dispatch, error, deleteError, isDeleted,navigate]);

//   const columns = [
//     { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

//     {
//       field: "name",
//       headerName: "Name",
//       minWidth: 350,
//       flex: 1,
//     },
//     {
//       field: "stock",
//       headerName: "Stock",
//       type: "number",
//       minWidth: 150,
//       flex: 0.3,
//     },

//     {
//       field: "price",
//       headerName: "Price",
//       type: "number",
//       minWidth: 270,
//       flex: 0.5,
//     },

//     {
//       field: "actions",
//       flex: 0.3,
//       headerName: "Actions",
//       minWidth: 150,
//       type: "number",
//       sortable: false,
//       renderCell: (params) => {
//         return (
//           <Fragment>
//             <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
//             <FaEye /> 
//             </Link>

//             <button
//               onClick={() =>
//                 deleteProductHandler(params.getValue(params.id, "id"))
//               }
//             >
//               <FaTrash />
//             </button>
//           </Fragment>
//         );
//       },
//     },
//   ];

//   const rows = [];

//   products &&
//     products.forEach((item) => {
//       rows.push({
//         id: item._id,
//         stock: item.Stock,
//         price: item.price,
//         name: item.name,
//       });
//     });

//   return (
//     <Fragment>
//       <MetaData title={`ALL PRODUCTS - Admin`} />

//       <div className="dashboard">
//         <SideBar />
//         <div className="productListContainer">
//           <h1 id="productListHeading">ALL PRODUCTS</h1>

//           <DataGrid
//             rows={rows}
//             columns={columns}
//             pageSize={10}
//             disableSelectionOnClick
//             className="productListTable"
//             autoHeight
//           />
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default ProductList;

import React, { Fragment, useEffect } from "react";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../actions/productActions";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../constant/productConstant";
import { useNavigate } from "react-router-dom";
import { FaEye, FaTrash } from "react-icons/fa";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Product Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, error, deleteError, isDeleted, navigate]);

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <div className="productListTable">
            <table>
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Name</th>
                  <th>Stock</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((item) => (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>{item.name}</td>
                      <td>{item.Stock}</td>
                      <td>{item.price}</td>
                      <td>
                        <Link to={`/admin/product/${item._id}`}>
                          <FaEye />
                        </Link>
                        <button onClick={() => deleteProductHandler(item._id)}>
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
