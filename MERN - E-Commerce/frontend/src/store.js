import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  combineReducers,
  applyMiddleware,
  legacy_createStore as createStore,
} from "redux";
import {
  productDetailsReducer,
  productsReducer,
  productReviewsReducer,
  newReviewReducer,
  reviewReducer,
  newProductReducer,
  productReducer,

} from "./component/reducers/productReducer";
import { profileReducer, userReducer } from "./component/reducers/userReducer";
import { cartReducer } from "./component/reducers/cartReducer";
const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  cart: cartReducer,
  newReview: newReviewReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
  newProduct: newProductReducer,
  product: productReducer,

});

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

// loading: false,
// error: null,
// products: [], // make sure this is initialized as an empty array
// productsCount: 0,
