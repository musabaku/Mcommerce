import React, { Fragment, useEffect, useState } from "react";
// import { CgMouse } from "react-icons/cg";
import "./Home.css";
import MetaData from "../layout/MetaData";
import { getProduct, clearErrors } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductCard from "./ProductCard.js";
import { Link } from "react-router-dom";
import logom from "../../images/logom.JPG";

import shopping from "../../images/shopping.JPG";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
// import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import InfoShort from "./InfoShort.jsx";
import AboutShort from "./AboutShort"

const Home = () => {
  // const { keyword } = useParams();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const navigate = useNavigate();

  const [word, setword] = useState("");
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (word.trim()) {
      navigate(`/products/${word}`);
    } else {
      navigate(`/products`);
    }
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Ecommerce"} />
          <div className="top-header">
            <img src={logom} alt="Logo" className="header-logo" />
            <div className="box1">
              <form className="search1" onSubmit={onSubmitHandler}>
                <input
                  type="text"
                  placeholder="Search For Products"
                  onChange={(e) => setword(e.target.value)}
                />
                <input type="submit" placeholder="Search" />
              </form>
            </div>
            

            <div className="box2">
            <span className="social-icon">
      <FaFacebookF />
    </span>
    <span className="social-icon">
      <FaInstagram />
    </span>
    <span className="social-icon">
      <FaYoutube />
    </span>
    <span className="social-icon">
      <FaLinkedin />
    </span>
            </div>
          </div>
          <div className="main-box">
            <div className="header-text1">
              <h1>Welcome to Our Mcommerce Store</h1>
              <p>Discover a World of Amazing Products</p>
              <a href="/products" className="explore-button">
                Explore Now
              </a>
            </div>

            <div className="header-image1">
              <img src={shopping} alt="Logo" />
            </div>
          </div>
          <div className="yellow-color">
          
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div >
          <div className="product-btn">
             <Link to={"/products"} ><button className="product-btn1">View More</button></Link>
          </div>
          </div>

          <InfoShort />
          <AboutShort/>

        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;

