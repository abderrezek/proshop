import * as productState from "./productState";
import * as cartState from "./cartState";
import * as userState from "./userState";

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
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

  userLogin: { ...userState.login, userInfo: userInfoFromStorage },
};

export default rootState;
