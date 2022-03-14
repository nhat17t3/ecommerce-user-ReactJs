import { brandConstants } from "../constants/brand.constants";

const initState = {
  listBrand: [],
  loading: false,
  message: "",
};

export default (state = initState, action) => {
  switch (action.type) {
    case brandConstants.GET_ALL_BRAND_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case brandConstants.GET_ALL_BRAND_SUCCESS:
      state = {
        ...state,
        loading: false,
        // message:action.payload.message,
        listBrand: action.payload.dataResponse,
      };
      break;
    case brandConstants.GET_ALL_BRAND_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
      
    case brandConstants.ADD_BRAND_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case brandConstants.ADD_BRAND_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
        loading: false,
      };
      break;
    case brandConstants.ADD_BRAND_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case brandConstants.UPDATE_BRAND_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case brandConstants.UPDATE_BRAND_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case brandConstants.UPDATE_BRAND_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case brandConstants.DELETE_BRAND_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case brandConstants.DELETE_BRAND_SUCCESS:
      state = {
        ...state,
        loading: false,
        messages: action.payload.message,
      };
      break;
    case brandConstants.DELETE_BRAND_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
  }
  return state;
};