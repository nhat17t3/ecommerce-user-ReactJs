import { ratingConstants } from "../constants/rating.constants";

const initState = {
  listRating: [],
  rating: {},
  loading: false,
  message: "",
};

export default (state = initState, action) => {
  switch (action.type) {
    case ratingConstants.GET_RATING_BY_PAGE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case ratingConstants.GET_RATING_BY_PAGE_SUCCESS:
      state = {
        ...state,
        loading: false,
        // message:action.payload.message,
        listRating: action.payload.dataResponse,
      };
      break;
    case ratingConstants.GET_RATING_BY_PAGE_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    //
    
    case ratingConstants.FILTER_RATING_BY_PRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case ratingConstants.FILTER_RATING_BY_PRODUCT_SUCCESS:
      state = {
        ...state,
        loading: false,
        // message:action.payload.message,
        listRating: action.payload.dataResponse,
      };
      break;
    case ratingConstants.FILTER_RATING_BY_PRODUCT_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
  
    //
    case ratingConstants.GET_RATING_BY_ID_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case ratingConstants.GET_RATING_BY_ID_SUCCESS:
      state = {
        ...state,
        loading: false,
        // message:action.payload.message,
        rating: action.payload.dataResponse,
      };
      break;
    case ratingConstants.GET_RATING_BY_ID_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;

    case ratingConstants.ADD_RATING_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case ratingConstants.ADD_RATING_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
        loading: false,
      };
      break;
    case ratingConstants.ADD_RATING_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case ratingConstants.UPDATE_RATING_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case ratingConstants.UPDATE_RATING_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case ratingConstants.UPDATE_RATING_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case ratingConstants.DELETE_RATING_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case ratingConstants.DELETE_RATING_SUCCESS:
      state = {
        ...state,
        loading: false,
        messages: action.payload.message,
      };
      break;
    case ratingConstants.DELETE_RATING_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
  }
  return state;
};
