import { productConstants } from "../constants/product.constants";

const initState = {
  listProduct: [],
  product: {},
  loading: false,
  message: "",
};

export default (state = initState, action) => {
  switch (action.type) {
    case productConstants.GET_PRODUCT_BY_PAGE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.GET_PRODUCT_BY_PAGE_SUCCESS:
      state = {
        ...state,
        loading: false,
        // message:action.payload.message,
        listProduct: action.payload.dataResponse,
      };
      break;
    case productConstants.GET_PRODUCT_BY_PAGE_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    //
    case productConstants.SEARCH_PRODUCT_BY_NAME_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.SEARCH_PRODUCT_BY_NAME_SUCCESS:
      state = {
        ...state,
        loading: false,
        // message:action.payload.message,
        listProduct: action.payload.dataResponse,
      };
      break;
    case productConstants.SEARCH_PRODUCT_BY_NAME_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    //
    case productConstants.FILTER_PRODUCT_BY_BRAND_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.FILTER_PRODUCT_BY_BRAND_SUCCESS:
      state = {
        ...state,
        loading: false,
        // message:action.payload.message,
        listProduct: action.payload.dataResponse,
      };
      break;
    case productConstants.FILTER_PRODUCT_BY_CATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    //
    case productConstants.FILTER_PRODUCT_BY_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.FILTER_PRODUCT_BY_CATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        // message:action.payload.message,
        listProduct: action.payload.dataResponse,
      };
      break;
    case productConstants.FILTER_PRODUCT_BY_CATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    //
    case productConstants.GET_PRODUCT_BY_ID_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.GET_PRODUCT_BY_ID_SUCCESS:
      state = {
        ...state,
        loading: false,
        // message:action.payload.message,
        product: action.payload.dataResponse,
      };
      break;
    case productConstants.GET_PRODUCT_BY_ID_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;

    case productConstants.ADD_PRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.ADD_PRODUCT_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
        loading: false,
      };
      break;
    case productConstants.ADD_PRODUCT_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case productConstants.UPDATE_PRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.UPDATE_PRODUCT_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case productConstants.UPDATE_PRODUCT_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case productConstants.DELETE_PRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.DELETE_PRODUCT_SUCCESS:
      state = {
        ...state,
        loading: false,
        messages: action.payload.message,
      };
      break;
    case productConstants.DELETE_PRODUCT_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
  }
  return state;
};
