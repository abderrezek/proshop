import { productActionsTypes } from "./actionsTypes";
import * as productApi from "../../api/productApi";

export const listProducts = (skip = 0, limit = 5) => async (dispatch) => {
  try {
    dispatch({ type: productActionsTypes.PRODUCT_LIST_REQUEST });

    const { data } = await productApi.list(skip, limit);

    dispatch({ type: productActionsTypes.PRODUCT_LIST_SUCCESS, payload: data });
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
