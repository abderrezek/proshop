import { userActionsTypes } from "../actions/actionsTypes";
import { userState } from "../reducers/initialeState";

export const userLoginReducer = (state = userState.login, action) => {
  switch (action.type) {
    case userActionsTypes.USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case userActionsTypes.USER_LOGIN_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload };
    case userActionsTypes.USER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    case userActionsTypes.USER_LOGOUT:
      return userState.login;
    default:
      return state;
  }
};

export const userRegisterReducer = (state = userState.register, action) => {
  switch (action.type) {
    case userActionsTypes.USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case userActionsTypes.USER_REGISTER_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload };
    case userActionsTypes.USER_REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload };
    case userActionsTypes.USER_LOGOUT:
      return userState.register;
    default:
      return state;
  }
};

export const userDetailsReducer = (state = userState.userDetails, action) => {
  switch (action.type) {
    case userActionsTypes.USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case userActionsTypes.USER_DETAILS_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case userActionsTypes.USER_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case userActionsTypes.USER_DETAILS_RESET:
      return userState.userDetails;
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (
  state = userState.userUpdate,
  action
) => {
  switch (action.type) {
    case userActionsTypes.USER_UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true };
    case userActionsTypes.USER_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        userInfo: action.payload,
      };
    case userActionsTypes.USER_UPDATE_PROFILE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case userActionsTypes.USER_UPDATE_PROFILE_RESET:
      return userState.userUpdate;
    default:
      return state;
  }
};

export const userListReducer = (state = userState.userList, action) => {
  switch (action.type) {
    case userActionsTypes.USER_LIST_REQUEST:
      return { ...state, loading: true };
    case userActionsTypes.USER_LIST_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case userActionsTypes.USER_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case userActionsTypes.USER_LIST_RESET:
      return userState.userList;
    default:
      return state;
  }
};

export const userDeleteReducer = (state = userState.userDelete, action) => {
  switch (action.type) {
    case userActionsTypes.USER_DELETE_REQUEST:
      return { ...state, loading: true };
    case userActionsTypes.USER_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload,
      };
    case userActionsTypes.USER_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = userState.userUpdate, action) => {
  switch (action.type) {
    case userActionsTypes.USER_UPDATE_REQUEST:
      return { ...state, loading: true };
    case userActionsTypes.USER_UPDATE_SUCCESS:
      return { ...state, loading: false, success: true, user: action.payload };
    case userActionsTypes.USER_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case userActionsTypes.USER_UPDATE_RESET:
      return userState.userUpdate;
    default:
      return state;
  }
};
