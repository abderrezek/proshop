import { userActionsTypes } from "./actionsTypes";
import * as userApi from "../../api/userApi";

const USER_INFO = "userInfo";

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

    localStorage.setItem(USER_INFO, JSON.stringify(data));
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
  localStorage.removeItem(USER_INFO);
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

    localStorage.setItem(USER_INFO, JSON.stringify(data));
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

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: userActionsTypes.USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await userApi.profile(id, userInfo.token);

    dispatch({
      type: userActionsTypes.USER_DETAILS_SUCCESS,
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
      type: userActionsTypes.USER_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: userActionsTypes.USER_UPDATE_PROFILE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await userApi.updateProfile(user, userInfo.token);

    dispatch({
      type: userActionsTypes.USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: userActionsTypes.USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem(USER_INFO, JSON.stringify(data));
  } catch (err) {
    console.log(err.response);
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: userActionsTypes.USER_UPDATE_PROFILE_FAIL,
      payload: message,
    });
  }
};
