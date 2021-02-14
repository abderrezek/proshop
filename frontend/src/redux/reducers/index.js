import { combineReducers } from "redux";

import * as product from "./productReducers";
import * as cart from "./cartReducers";

const rootReducer = combineReducers({
  productList: product.productListReducer,
  productDetails: product.productDetailsReducer,
  productDelete: product.productDeleteReducer,
  productCreate: product.productCreateReducer,
  productUpdate: product.productUpdateReducer,
  productReviewCreate: product.productReviewCreateReducer,
  productTopRated: product.productTopRatedReducer,

  cart: cart.cartReducer,
});

export default rootReducer;
