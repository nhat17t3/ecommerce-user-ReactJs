import { paymentConstants } from "../constants/payment.constants";

const initState = {
  listPayment: [],
  loading: false,
  message: "",
};

export default (state = initState, action) => {
  switch (action.type) {
    case paymentConstants.GET_ALL_PAYMENT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case paymentConstants.GET_ALL_PAYMENT_SUCCESS:
      state = {
        ...state,
        loading: false,
        // message:action.payload.message,
        listPayment: action.payload.dataResponse,
      };
      break;
    case paymentConstants.GET_ALL_PAYMENT_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
      
    case paymentConstants.ADD_PAYMENT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case paymentConstants.ADD_PAYMENT_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
        loading: false,
      };
      break;
    case paymentConstants.ADD_PAYMENT_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case paymentConstants.UPDATE_PAYMENT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case paymentConstants.UPDATE_PAYMENT_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case paymentConstants.UPDATE_PAYMENT_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case paymentConstants.DELETE_PAYMENT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case paymentConstants.DELETE_PAYMENT_SUCCESS:
      state = {
        ...state,
        loading: false,
        messages: action.payload.message,
      };
      break;
    case paymentConstants.DELETE_PAYMENT_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
  }
  return state;
};