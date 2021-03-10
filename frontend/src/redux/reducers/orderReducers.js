import { orderActionsTypes } from "../actions/actionsTypes";
import { orderState } from "./initialeState";

export const orderCreateReducer = (state = orderState.create, action) => {
  switch (action.type) {
    case orderActionsTypes.ORDER_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderActionsTypes.ORDER_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        order: action.payload,
      };
    case orderActionsTypes.ORDER_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case orderActionsTypes.ORDER_CREATE_RESET:
      return orderState.create;
    default:
      return state;
  }
};

export const orderDetailsReducer = (state = orderState.details, action) => {
  switch (action.type) {
    case orderActionsTypes.ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderActionsTypes.ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    case orderActionsTypes.ORDER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderPayReducer = (state = orderState.pay, action) => {
  switch (action.type) {
    case orderActionsTypes.ORDER_PAY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderActionsTypes.ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case orderActionsTypes.ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case orderActionsTypes.ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case orderActionsTypes.ORDER_DELIVER_REQUEST:
      return {
        loading: true,
      };
    case orderActionsTypes.ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case orderActionsTypes.ORDER_DELIVER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case orderActionsTypes.ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};

export const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case orderActionsTypes.ORDER_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case orderActionsTypes.ORDER_LIST_MY_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case orderActionsTypes.ORDER_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case orderActionsTypes.ORDER_LIST_MY_RESET:
      return { orders: [] };
    default:
      return state;
  }
};

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case orderActionsTypes.ORDER_LIST_REQUEST:
      return {
        loading: true,
      };
    case orderActionsTypes.ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case orderActionsTypes.ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
