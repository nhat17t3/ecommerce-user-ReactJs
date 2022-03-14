import { slideConstants } from "../constants/slide.constants";

const initState = {
  listSlide: [],
  slide: {},
  loading: false,
  message: "",
};

export default (state = initState, action) => {
  switch (action.type) {
    case slideConstants.GET_ALL_SLIDE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case slideConstants.GET_ALL_SLIDE_SUCCESS:
      state = {
        ...state,
        loading: false,
        // message:action.payload.message,
        listSlide: action.payload.dataResponse,
      };
      break;
    case slideConstants.GET_ALL_SLIDE_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    
    //
   
    //
    case slideConstants.GET_SLIDE_BY_ID_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case slideConstants.GET_SLIDE_BY_ID_SUCCESS:
      state = {
        ...state,
        loading: false,
        // message:action.payload.message,
        slide: action.payload.dataResponse,
      };
      break;
    case slideConstants.GET_SLIDE_BY_ID_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
// 
    case slideConstants.ADD_SLIDE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case slideConstants.ADD_SLIDE_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
        loading: false,
      };
      break;
    case slideConstants.ADD_SLIDE_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case slideConstants.UPDATE_SLIDE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case slideConstants.UPDATE_SLIDE_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case slideConstants.UPDATE_SLIDE_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case slideConstants.DELETE_SLIDE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case slideConstants.DELETE_SLIDE_SUCCESS:
      state = {
        ...state,
        loading: false,
        messages: action.payload.message,
      };
      break;
    case slideConstants.DELETE_SLIDE_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
  }
  return state;
};
