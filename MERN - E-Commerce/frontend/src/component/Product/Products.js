import React, { Fragment, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { clearErrors, getProduct } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductCard from "../Home/ProductCard.js";
import { useParams } from "react-router-dom";
import "./Product.css";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";

const categories = [
  "Footwear",
  "Laptop",
  "SmartPhones",
  "Pants",
  "Shirts",
  "Camera",
];

const priceRanges = [
  { label: "0-500", value: [0, 500] },
  { label: "500-1000", value: [500, 1000] },
  { label: "1000-1500", value: [1000, 1500] },
  { label: "1500-2000", value: [1500, 2000] },
  { label: "2000-2500", value: [2000, 2500] },
];



const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 2500]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRange, setSelectedRange] = useState("");
  // const [ratings, setRatings] = useState(0);
  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const { keyword } = useParams();
  const dispatch = useDispatch();

  const {
    loading,
    products,
    productsCount,
    resultPerPage,
    filteredProductCount,
    error,
  } = useSelector((state) => state.products);

  const handlePriceDropdownChange = (selectedValue) => {
    const selectedPriceRange = priceRanges.find(
      (range) => range.label === selectedValue
    );
    setSelectedRange(selectedValue);
    setPrice(selectedPriceRange ? selectedPriceRange.value : [0, 2500]);
  };

 

  const handleAllProducts = () => {
    setSelectedCategory("");
    dispatch(getProduct(keyword, currentPage, price, ""));
    window.location.reload();
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getProduct(keyword, currentPage, price, selectedCategory));
  }, [keyword, dispatch, currentPage, price, selectedCategory]);

  let count = filteredProductCount;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Products - Ecommerce" />

          <div className="productsHeading">
            <h2>Products</h2>
            <div className="flexing">

            <button className="all-Products" onClick={handleAllProducts}>
                <Link
                  to={"/products"}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  All Products
                </Link>
              </button>
              <span className="price-dropdown">
                <h3>Price Range</h3>
                <select
                  value={selectedRange}
                  onChange={(e) => handlePriceDropdownChange(e.target.value)}
                >
                  <option value="">Select Range</option>
                  {priceRanges.map((range) => (
                    <option key={range.label} value={range.label}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </span>
            </div>

              </div>
          
          <div className="categoryBox">
            {categories.map((category) => (
              <span
                className={`category-link ${
                  category === selectedCategory ? "active" : ""
                }`}
                key={category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </span>
            ))}
          </div>

          <div className="whole-box">
            <div className="filterBox">
              {/* Removed the Slider component */}
             
             
             
            </div>

            <div className="products">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </div>

          <div className="paginationBox">
            {resultPerPage < count && (
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
