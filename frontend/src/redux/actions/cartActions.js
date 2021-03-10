import { cartActionsTypes, productActionsTypes } from "./actionsTypes";
import * as productApi from "../../api/productApi";

const CART_ITEMS = "cartItems";
const SHIPPING_ADDRESS = "shippingAddress";
const PAYMENT_METHOD = "paymentMethod";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    dispatch({ type: productActionsTypes.PRODUCT_DETAILS_REQUEST });

    const { data } = await productApi.detail(id);

    dispatch({
      type: cartActionsTypes.CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });

    localStorage.setItem(CART_ITEMS, JSON.stringify(getState().cart.cartItems));
  } catch (err) {
    dispatch({
      type: productActionsTypes.PRODUCT_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: cartActionsTypes.CART_REMOVE_ITEM, payload: id });

  localStorage.setItem(CART_ITEMS, JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({
    type: cartActionsTypes.CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem(SHIPPING_ADDRESS, JSON.stringify(data));
};

export const savePaymentMethod = (data) => async (dispatch) => {
  dispatch({
    type: cartActionsTypes.CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem(PAYMENT_METHOD, JSON.stringify(data));
};
