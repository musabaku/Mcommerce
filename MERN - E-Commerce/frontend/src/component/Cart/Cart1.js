import "./cart.css";
import CartItemCard from "./CartItemCard.js";
import { addItemsToCart, removeCartItems } from "../actions/cartActions";
import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from 'react-router-dom'
const Cart1 = () => {

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newqty = quantity + 1;
    if (quantity >= stock) {
      return;
    }
    dispatch(addItemsToCart(id, newqty));
  };
  const decreaseQuantity = (id, quantity) => {
    const newqty = quantity - 1;
    if (quantity <= 1) {
      return;
    }
    dispatch(addItemsToCart(id, newqty));
  };
  const deleteItemsCart = (id) => {
    dispatch(removeCartItems(id));
  };

  const completeOrder=()=>{
toast.success("Order Completed Succesfully!!!")
// navigate("/home/thanks")
  }
  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <h2>Empty Cart</h2>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>
          </div>
          {cartItems &&
            cartItems.map((item) => (
              <div className="cartContainer" key={item.product}>
                <CartItemCard item={item} deleteItemsCart={deleteItemsCart} />
                <div className="cartInput">
                  <button
                    onClick={() =>
                      decreaseQuantity(item.product, item.quantity)
                    }
                  >
                    -
                  </button>
                  <input value={item.quantity} readOnly type="number" />
                  <button
                    onClick={() =>
                      increaseQuantity(item.product, item.quantity, item.Stock)
                    }
                  >
                    +
                  </button>
                </div>
                  <div>
                    <p className="cartSubtotal">{`${item.price}*${item.quantity}`}</p>
                  </div>
              </div>
            ))}

          <div className="cartGrossTotal">
            <div></div>
            <div className="cartGrossTotalBox">
              <p>Gross Total</p>
              <p>{`$${cartItems.reduce(
                (acc, item) => acc + item.quantity * item.price,
                0
              )}`}</p>
            </div>
            <div></div>
            <div className="checkOutBtn">
              <button onClick={completeOrder}>Complete Order</button>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart1;
