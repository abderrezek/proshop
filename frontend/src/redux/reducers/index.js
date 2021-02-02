import { combineReducers } from "redux";

import * as product from "./productReducers";

const rootReducer = combineReducers({
  // Product Reducers
  productList: product.productListReducer,
  productCreate: product.productCreateReducer,
  productDelete: product.productDeleteReducer,
  productDetails: product.productDetailsReducer,
  productUpdate: product.productUpdateReducer,
  productReviewCreate: product.productReviewCreateReducer,
  productTopRated: product.productTopRatedReducer,
});

export default rootReducer;
