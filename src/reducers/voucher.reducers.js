import { voucherConstants } from "../constants/voucher.constants";

const initState = {
  listVoucher: [],
  voucher: {},
  loading: false,
  message: "",
};

export default (state = initState, action) => {
  switch (action.type) {
    case voucherConstants.GET_VOUCHER_BY_PAGE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case voucherConstants.GET_VOUCHER_BY_PAGE_SUCCESS:
      state = {
        ...state,
        loading: false,
        // message:action.payload.message,
        listVoucher: action.payload.dataResponse,
      };
      break;
    case voucherConstants.GET_VOUCHER_BY_PAGE_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    //
    case voucherConstants.SEARCH_VOUCHER_BY_NAME_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case voucherConstants.SEARCH_VOUCHER_BY_NAME_SUCCESS:
      state = {
        ...state,
        loading: false,
        // message:action.payload.message,
        listVoucher: action.payload.dataResponse,
      };
      break;
    case voucherConstants.SEARCH_VOUCHER_BY_NAME_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    
    //
    case voucherConstants.GET_VOUCHER_BY_ID_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case voucherConstants.GET_VOUCHER_BY_ID_SUCCESS:
      state = {
        ...state,
        loading: false,
        // message:action.payload.message,
        voucher: action.payload.dataResponse,
      };
      break;
    case voucherConstants.GET_VOUCHER_BY_ID_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;

    case voucherConstants.ADD_VOUCHER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case voucherConstants.ADD_VOUCHER_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
        loading: false,
      };
      break;
    case voucherConstants.ADD_VOUCHER_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case voucherConstants.UPDATE_VOUCHER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case voucherConstants.UPDATE_VOUCHER_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case voucherConstants.UPDATE_VOUCHER_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case voucherConstants.DELETE_VOUCHER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case voucherConstants.DELETE_VOUCHER_SUCCESS:
      state = {
        ...state,
        loading: false,
        messages: action.payload.message,
      };
      break;
    case voucherConstants.DELETE_VOUCHER_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
  }
  return state;
};
