import { productActionsTypes } from "./actionsTypes";
import * as productApi from "../../api/productApi";

export const listProducts = (skip = 0, limit = 5) => async (dispatch) => {
  try {
    dispatch({ type: productActionsTypes.PRODUCT_LIST_REQUEST });

    const { data } = await productApi.list(skip, limit);

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
