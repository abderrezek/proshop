import * as productState from "./productState";
import * as cartState from "./cartState";
import * as userState from "./userState";

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : {};

const rootState = {
  productList: productState.listProduct,
  productCreate: productState.createProduct,
  productDelete: productState.deleteProduct,
  productDetails: productState.detailsProduct,
  productUpdate: productState.updateProduct,
  productReviewCreate: productState.reviewProduct,
  productTopRated: productState.ratedProduct,

  cart: {
    ...cartState.cart,
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },

  userLogin: { ...userState.login, userInfo: userInfoFromStorage },
};

export default rootState;
