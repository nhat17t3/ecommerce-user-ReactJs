import { favouriteConstants } from "../constants/favourite.constants";

const initState = {
  listFavourite: [],
  favourite: {},
  loading: false,
  message: "",
};

export default (state = initState, action) => {
  switch (action.type) {
    
   
    case favouriteConstants.FILTER_FAVOURITE_BY_USER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case favouriteConstants.FILTER_FAVOURITE_BY_USER_SUCCESS:

     const list = action.payload.dataResponse;
     const newList = list.map((element) =>{
      return element.product
     })
      state = {
        ...state,
        loading: false,
        // message:action.payload.message,
        listFavourite: newList,
      };
      break;
    case favouriteConstants.FILTER_FAVOURITE_BY_USER_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
   
    //
    

    case favouriteConstants.ADD_FAVOURITE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case favouriteConstants.ADD_FAVOURITE_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
        loading: false,
      };
      break;
    case favouriteConstants.ADD_FAVOURITE_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
   
    //
    case favouriteConstants.DELETE_FAVOURITE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case favouriteConstants.DELETE_FAVOURITE_SUCCESS:
      state = {
        ...state,
        loading: false,
        messages: action.payload.message,
      };
      break;
    case favouriteConstants.DELETE_FAVOURITE_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
  }
  return state;
};
