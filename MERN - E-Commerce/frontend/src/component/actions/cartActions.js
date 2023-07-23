import { ADD_TO_CART,REMOVE_CART_ITEMS } from "../constant/cartConstant";
import axios from "axios";
import axiosInstance from "../axiosInstance"

export const addItemsToCart = (id, quantity) => async (dispatch,getState) => {
  // const { data } = await axios.get(`/api/v1/product/${id}`);
  const { data } = await axiosInstance.get(`/product/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.imageUrl,
      stock: data.product.Stock,
      quantity,
    },
  });

  localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
};
export const removeCartItems = (id) => async (dispatch,getState) => {
  dispatch({
    type: REMOVE_CART_ITEMS,
    payload: id,
  });

  localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
};
