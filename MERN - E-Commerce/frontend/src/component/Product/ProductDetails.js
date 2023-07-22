import React, { Fragment, useEffect, useState } from "react";
import "./ProductDetails.css";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard.js";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../actions/cartActions";
import { NEW_REVIEW_RESET } from "../../component/constant/productConstant";
// import { Rating } from "@material-ui/lab";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Button,
// } from "@material-ui/core";
const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Function to toggle the custom review modal
  const toggleReviewModal = () => {
    setShowReviewModal((prevState) => !prevState);
  };

  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );
  const { isAuthenticated } = useSelector(
    (state) => state.user
  );
  const { reviewError, success } = useSelector((state) => state.newReview);

  const [quantity, setQuantity] = useState(1);
  // const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      console.log("rip");
      toast.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, reviewError, error, success]);

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const decreaseQuantity = () => {
    if (quantity <= 1) {
      return;
    }
    const qty = quantity - 1;
    setQuantity(qty);
  };
  const increaseQuantity = () => {
    if (quantity >= product.Stock) {
      return;
    }
    const qty = quantity + 1;

    setQuantity(qty);
  };

  const addingCart = () => {
    dispatch(addItemsToCart(id, quantity));
    toast.success("Products added to cart successfully!!");
  };

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 21,
    // value: product.ratings,
    isHalf: true,
  };
  // const options = {
  //   value: product.ratings,
  //   readOnly: true,
  //   precision: 0.5,
  // };
  // const options = {
  //   value: parseFloat(product.ratings), // Convert to a number using parseFloat
  //   readOnly: true,
  //   precision: 0.5,
  //   name: "product-rating", // Add a unique name prop for the product rating

  // };
  // const submitReviewToggle = () => {
  //   open ? setOpen(false) : setOpen(true);
  // };

  const reviewSubmitHandler = () => {
    if (!isAuthenticated) {
      // Check if the user is not authenticated
      toast.error("Please log in to submit a review.");
      // setOpen(false);
      setShowReviewModal(false);

      return;
    }
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    // setOpen(false);
    window.location.reload();

  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} - Ecommerce`} />
          
          <div className="ProductDetails">
            
            <div className="abcd">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="ProductImages"
              />
            </div>

            <div>
            <div className="detailsBlock-1">
                <h2>{product.name}</h2>
              </div>
              <div className="detailsBlock-4">
                Description: <p>{product.description}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} value={product.rating} />
                <span className="review-span">
                  ({product.numOfReviews}Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                
                <h1>Price: ${product.price}</h1>

                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input value={quantity} type="number" readOnly />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button onClick={addingCart}>Add To Cart</button>
                </div>

                <p>
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutStock" : "InStock"}
                  </b>
                </p>
              </div>
            
              <button onClick={toggleReviewModal} className="submitReview"  >
                Add Review
              </button>
            </div>
          </div>

          <h2 className="reviewsHeading">Comments</h2>

          
           {showReviewModal && (
              <div className="customModal">
                <div className="customModalContent">
                  <h2>Submit Comment</h2>
                  <div className="ratingContainer">
                    <ReactStars onChange={(e) => setRating(e.target.value)} {...options} />
                    <span className="review-span">
                      ({product.numOfReviews} Reviews)
                    </span>
                  </div>
                  <textarea
                    className="submitDialogTextArea"
                    cols="30"
                    rows="5"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your comment here..."
                  ></textarea>
                  <div className="modalButtons">
                    <button
                      onClick={toggleReviewModal}
                      className="cancelButton"
                    >
                      Cancel
                    </button>
                    <button onClick={reviewSubmitHandler} className="submitButton">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            )}

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews.map((review) => (
                <ReviewCard key={review._id} review={review}  />
              ))}
            </div>
          ) : (
            <div className="noReviews">
              <p>No Reviews Yet</p>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
