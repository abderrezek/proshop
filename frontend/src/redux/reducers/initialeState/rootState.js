import * as productState from "./productState";
import * as cartState from "./cartState";

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const rootState = {
  productList: productState.listProduct,
  productCreate: productState.createProduct,
  productDelete: productState.deleteProduct,
  productDetails: productState.detailsProduct,
  productUpdate: productState.updateProduct,
  productReviewCreate: productState.reviewProduct,
  productTopRated: productState.ratedProduct,

  cart: { ...cartState.cart, cartItems: cartItemsFromStorage },
};

export default rootState;
