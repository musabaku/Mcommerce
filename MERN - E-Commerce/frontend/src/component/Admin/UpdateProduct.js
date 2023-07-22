// import React, { Fragment, useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   clearErrors,
//   updateProduct,
//   getProductDetails,
// } from "../actions/productActions";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Button } from "@material-ui/core";
// import MetaData from "../layout/MetaData";
// import AccountTreeIcon from "@material-ui/icons/AccountTree";
// import DescriptionIcon from "@material-ui/icons/Description";
// import StorageIcon from "@material-ui/icons/Storage";
// import SpellcheckIcon from "@material-ui/icons/Spellcheck";
// import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
// import SideBar from "./Sidebar";
// import { UPDATE_PRODUCT_RESET } from "../constant/productConstant";
// import { useNavigate,useParams } from 'react-router-dom'


// const UpdateProduct = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate()
//   const { id } = useParams();

//   const { error, product } = useSelector((state) => state.productDetails);

//   const {
//     loading,
//     error: updateError,
//     isUpdated,
//   } = useSelector((state) => state.product);

//   const [name, setName] = useState("");
//   const [price, setPrice] = useState(0);
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [Stock, setStock] = useState(0);
// //   const [images, setImages] = useState([]);
// //   const [oldImages, setOldImages] = useState([]);
// //   const [imagesPreview, setImagesPreview] = useState([]);
// const [imageUrl, setImageUrl] = useState("");

//   const categories = [
//     "Footwear",
//     "Laptop",
//     "SmartPhones",
//     "Pants",
//     "Shirts",
//     "Camera",
//   ];

//   const productId = id;

//   useEffect(() => {
//     if (product && product._id !== productId) {
//       dispatch(getProductDetails(productId));
//     } else {
//       setName(product.name);
//       setDescription(product.description);
//       setPrice(product.price);
//       setCategory(product.category);
//       setStock(product.Stock);
//     //   setOldImages(product.images);
//     setImageUrl(product.imageUrl);
//     }
//     if (error) {
//       toast.error(error);
//       dispatch(clearErrors());
//     }

//     if (updateError) {
//       toast.error(updateError);
//       dispatch(clearErrors());
//     }

//     if (isUpdated) {
//       toast.success("Product Updated Successfully");
//       navigate("/admin/products");
//       dispatch({ type: UPDATE_PRODUCT_RESET });
//     }
//   }, [
//     dispatch,
//     error,
//     navigate,
//     isUpdated,
//     productId,
//     product,
//     updateError,

//   ]);

//   const updateProductSubmitHandler = (e) => {
//     e.preventDefault();

//     const myForm = new FormData();

//     myForm.set("name", name);
//     myForm.set("price", price);
//     myForm.set("description", description);
//     myForm.set("category", category);
//     myForm.set("Stock", Stock);
//      myForm.set("imageUrl", imageUrl); 
//     // images.forEach((image) => {
//     //   myForm.append("images", image);
//     // });
//     dispatch(updateProduct(productId, myForm));
//   };

// //   const updateProductImagesChange = (e) => {
// //     const files = Array.from(e.target.files);

// //     setImages([]);
// //     setImagesPreview([]);
// //     setOldImages([]);

// //     files.forEach((file) => {
// //       const reader = new FileReader();

// //       reader.onload = () => {
// //         if (reader.readyState === 2) {
// //           setImagesPreview((old) => [...old, reader.result]);
// //           setImages((old) => [...old, reader.result]);
// //         }
// //       };

// //       reader.readAsDataURL(file);
// //     });
// //   };

//   return (
//     <Fragment>
//       <MetaData title="Update Product" />
//       <div className="dashboard">
//         <SideBar />
//         <div className="newProductContainer">
//           <form
//             className="createProductForm"
//             encType="multipart/form-data"
//             onSubmit={updateProductSubmitHandler}
//           >
//             <h1>Update Product</h1>

//             <div>
//               <SpellcheckIcon />
//               <input
//                 type="text"
//                 placeholder="Product Name"
//                 required
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>
//             <div>
//               <AttachMoneyIcon />
//               <input
//                 type="number"
//                 placeholder="Price"
//                 required
//                 onChange={(e) => setPrice(e.target.value)}
//                 value={price}
//               />
//             </div>

//             <div>
//               <DescriptionIcon />

//               <textarea
//                 placeholder="Product Description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 cols="30"
//                 rows="1"
//               ></textarea>
//             </div>

//             <div>
//               <AccountTreeIcon />
//               <select
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//               >
//                 <option value="">Choose Category</option>
//                 {categories.map((cate) => (
//                   <option key={cate} value={cate}>
//                     {cate}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <StorageIcon />
//               <input
//                 type="number"
//                 placeholder="Stock"
//                 required
//                 onChange={(e) => setStock(e.target.value)}
//                 value={Stock}
//               />
//             </div>

//             {/* <div id="createProductFormFile">
//               <input
//                 type="file"
//                 name="avatar"
//                 accept="image/*"
//                 onChange={updateProductImagesChange}
//                 multiple
//               />
//             </div>

//             <div id="createProductFormImage">
//               {oldImages &&
//                 oldImages.map((image, index) => (
//                   <img key={index} src={image.url} alt="Old Product Preview" />
//                 ))}
//             </div>

//             <div id="createProductFormImage">
//               {imagesPreview.map((image, index) => (
//                 <img key={index} src={image} alt="Product Preview" />
//               ))}
//             </div> */}
//  <div className="image-url">
//     <label>Image URL</label>
//     <input
//       type="text"
//       placeholder="Enter image URL from IMBB platform"
//       value={imageUrl}
//       onChange={(e) => setImageUrl(e.target.value)}
//     />
//   </div>
//             <Button
//               id="createProductBtn"
//               type="submit"
//               disabled={loading ? true : false}
//             >
//               Update
//             </Button>
//           </form>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default UpdateProduct;

import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../actions/productActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import { FiImage, FiDollarSign, FiFileText, FiLayers, FiBook, FiPlusCircle, FiStar } from "react-icons/fi";
import SideBar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../constant/productConstant";
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  const categories = [
    "Footwear",
    "Laptop",
    "SmartPhones",
    "Pants",
    "Shirts",
    "Camera",
  ];

  const productId = id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);
      setImageUrl(product.imageUrl);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    error,
    navigate,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);
    myForm.set("imageUrl", imageUrl);
    dispatch(updateProduct(productId, myForm));
  };

  return (
    <Fragment>
      <MetaData title="Update Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Product</h1>

            <div>
              <FiFileText />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <FiDollarSign />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>

            <div>
              <FiBook />
              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <FiLayers />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <FiStorage />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
                value={Stock}
              />
            </div>

            <div className="image-url">
              <label>Image URL</label>
              <input
                type="text"
                placeholder="Enter image URL from IMBB platform"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
