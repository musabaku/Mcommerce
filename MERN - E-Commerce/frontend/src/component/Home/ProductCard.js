import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

// import { Rating } from "@material-ui/lab";
const ProductCard = ({ product }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 21,
    value: product.ratings,
    isHalf: true,
  };
  // const options = {
  //   size:"small",
  //   value: product.ratings,
  //   readOnly: true,
  //   precision: 0.5,
  // };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.imageUrl} alt={product.name} />

      <p>{product.name}</p>
      <div>
      <ReactStars {...options} className="rating-size"/> <span className="productCardSpan">{product.numOfReviews} Reviews</span>
      </div>
      <span>{`$${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
