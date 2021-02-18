import { userActionsTypes } from "./actionsTypes";
import * as userApi from "../../api/userApi";

const userInfo = "userInfo";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: userActionsTypes.USER_LOGIN_REQUEST,
    });

    const { data } = await userApi.login(email, password);

    dispatch({
      type: userActionsTypes.USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem(userInfo, JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: userActionsTypes.USER_LOGIN_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem(userInfo);
  localStorage.removeItem("cartItems");
  dispatch({ type: userActionsTypes.USER_LOGOUT });
  dispatch({ type: userActionsTypes.USER_DETAILS_RESET });
  dispatch({ type: userActionsTypes.USER_LIST_RESET });
  document.location.href = "/login";
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: userActionsTypes.USER_REGISTER_REQUEST,
    });

    const { data } = await userApi.register(name, email, password);

    dispatch({
      type: userActionsTypes.USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: userActionsTypes.USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem(userInfo, JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: userActionsTypes.USER_REGISTER_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
