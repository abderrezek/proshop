import { orderActionsTypes } from "./actionsTypes";
import * as orderApi from "../../api/orderApi";
import { logout } from "./userActions";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: orderActionsTypes.ORDER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await orderApi.createOrder(order, userInfo.token);

    dispatch({
      type: orderActionsTypes.ORDER_CREATE_SUCCESS,
      payload: data,
    });
    // dispatch({
    //   type: orderActionsTypes.CART_CLEAR_ITEMS,
    //   payload: data,
    // });
    // localStorage.removeItem("cartItems");
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: orderActionsTypes.ORDER_CREATE_FAIL,
      payload: message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: orderActionsTypes.ORDER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await orderApi.getOrderById(id, userInfo.token);

    dispatch({
      type: orderActionsTypes.ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: orderActionsTypes.ORDER_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: orderActionsTypes.ORDER_PAY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await orderApi.payOrder(id, paymentResult, userInfo.token);

    dispatch({
      type: orderActionsTypes.ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: orderActionsTypes.ORDER_PAY_FAIL,
      payload: message,
    });
  }
};

export const listMyOrders = (page, limit) => async (dispatch, getState) => {
  try {
    dispatch({
      type: orderActionsTypes.ORDER_LIST_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await orderApi.myOrders(page, limit, userInfo.token);

    dispatch({
      type: orderActionsTypes.ORDER_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: orderActionsTypes.ORDER_LIST_MY_FAIL,
      payload: message,
    });
  }
};
