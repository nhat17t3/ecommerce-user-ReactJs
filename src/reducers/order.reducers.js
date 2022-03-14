import { orderConstants } from "../constants/order.constants";

const initState = {
  listOrder: [],
  order: {},
  loading: false,
  message: "",
};

export default (state = initState, action) => {
  switch (action.type) {
    case orderConstants.GET_ORDER_BY_PAGE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case orderConstants.GET_ORDER_BY_PAGE_SUCCESS:
      state = {
        ...state,
        loading: false,
        // message:action.payload.message,
        listOrder: action.payload.dataResponse,
      };
      break;
    case orderConstants.GET_ORDER_BY_PAGE_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    //
    case orderConstants.SEARCH_ORDER_BY_NAME_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case orderConstants.SEARCH_ORDER_BY_NAME_SUCCESS:
      state = {
        ...state,
        loading: false,
        // message:action.payload.message,
        listOrder: action.payload.dataResponse,
      };
      break;
    case orderConstants.SEARCH_ORDER_BY_NAME_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    //
    case orderConstants.FILTER_ORDER_BY_STATUS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case orderConstants.FILTER_ORDER_BY_STATUS_SUCCESS:
      state = {
        ...state,
        loading: false,
        // message:action.payload.message,
        listOrder: action.payload.dataResponse,
      };
      break;
    case orderConstants.FILTER_ORDER_BY_STATUS_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    //
    case orderConstants.FILTER_ORDER_BY_USER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case orderConstants.FILTER_ORDER_BY_USER_SUCCESS:
      state = {
        ...state,
        loading: false,
        // message:action.payload.message,
        listOrder: action.payload.dataResponse,
      };
      break;
    case orderConstants.FILTER_ORDER_BY_USER_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    //
    case orderConstants.GET_ORDER_BY_ID_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case orderConstants.GET_ORDER_BY_ID_SUCCESS:
      state = {
        ...state,
        loading: false,
        // message:action.payload.message,
        order: action.payload.dataResponse,
      };
      break;
    case orderConstants.GET_ORDER_BY_ID_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;

    case orderConstants.ADD_ORDER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case orderConstants.ADD_ORDER_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
        loading: false,
      };
      break;
    case orderConstants.ADD_ORDER_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case orderConstants.UPDATE_ORDER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case orderConstants.UPDATE_ORDER_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case orderConstants.UPDATE_ORDER_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case orderConstants.DELETE_ORDER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case orderConstants.DELETE_ORDER_SUCCESS:
      state = {
        ...state,
        loading: false,
        messages: action.payload.message,
      };
      break;
    case orderConstants.DELETE_ORDER_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
  }
  return state;
};
