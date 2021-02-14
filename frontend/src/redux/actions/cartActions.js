import { cartActionsTypes, productActionsTypes } from "./actionsTypes";
import * as productApi from "../../api/productApi";

const cartItems = "cartItems";

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

    localStorage.setItem(cartItems, JSON.stringify(getState().cart.cartItems));
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
  // try {
  dispatch({ type: cartActionsTypes.CART_REMOVE_ITEM, payload: id });

  localStorage.setItem(cartItems, JSON.stringify(getState().cart.cartItems));
  // } catch (err) {
  //   dispatch({
  //     type: productActionsTypes.PRODUCT_DETAILS_FAIL,
  //     payload:
  //       err.response && err.response.data.message
  //         ? err.response.data.message
  //         : err.message,
  //   });
  // }
};
