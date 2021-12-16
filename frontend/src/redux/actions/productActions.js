import { productActionsTypes } from "./actionsTypes";
import * as productApi from "../../api/productApi";
import { logout } from "./userActions";

export const listProducts = (page, limit) => async (dispatch) => {
  try {
    dispatch({ type: productActionsTypes.PRODUCT_LIST_REQUEST });

    const { data } = await productApi.list(page, limit);

    dispatch({
      type: productActionsTypes.PRODUCT_LIST_SUCCESS,
      payload: {
        products: data,
        pages: 0,
        page: 0,
      },
    });
  } catch (err) {
    dispatch({
      type: productActionsTypes.PRODUCT_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const detailsProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: productActionsTypes.PRODUCT_DETAILS_REQUEST });

    const { data } = await productApi.detail(id);

    dispatch({
      type: productActionsTypes.PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
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

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: productActionsTypes.PRODUCT_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await productApi.deleteProduct(id, userInfo.token);

    dispatch({
      type: productActionsTypes.PRODUCT_DELETE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: productActionsTypes.PRODUCT_DELETE_FAIL,
      payload: message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({ type: productActionsTypes.PRODUCT_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await productApi.createProduct(userInfo.token);

    dispatch({
      type: productActionsTypes.PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: productActionsTypes.PRODUCT_CREATE_FAIL,
      payload: message,
    });
  }
};
