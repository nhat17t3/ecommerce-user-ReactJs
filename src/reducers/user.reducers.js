import { userConstants } from "../constants/user.constants";

const initState = {
  listUser: [],
  user: {},
  loading: false,
  message: "",
  pageNumber: 0,
  pageSize :5,
  totalElements: 0,
  totalPages: 0,
};

export default (state = initState, action) => {
  switch (action.type) {
    case userConstants.GET_USER_BY_PAGE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.GET_USER_BY_PAGE_SUCCESS:
      state = {
        ...state,
        loading: false,
        message:action.payload.message,
        listUser: action.payload.dataResponse,
        pageNumber: action.payload.pageNumber,
        pageSize: action.payload.pageSize,
        totalElements: action.payload.totalElements,
        totalPages: action.payload.totalPages,

      };
      break;
    case userConstants.GET_USER_BY_PAGE_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    //
    // case userConstants.SEARCH_USER_BY_NAME_REQUEST:
    //   state = {
    //     ...state,
    //     loading: true,
    //   };
    //   break;
    // case userConstants.SEARCH_USER_BY_NAME_SUCCESS:
    //   state = {
    //     ...state,
    //     loading: false,
    //     // message:action.payload.message,
    //     listUser: action.payload.dataResponse,

    //   };
    //   break;
    // case userConstants.SEARCH_USER_BY_NAME_FAILURE:
    //   state = {
    //     ...state,
    //     loading: false,
    //     message: action.payload.message,
    //   };
    //   break;
    // //
    // case userConstants.FILTER_USER_BY_BRAND_REQUEST:
    //   state = {
    //     ...state,
    //     loading: true,
    //   };
    //   break;
    // case userConstants.FILTER_USER_BY_BRAND_SUCCESS:
    //   state = {
    //     ...state,
    //     loading: false,
    //     // message:action.payload.message,
    //     listUser: action.payload.dataResponse,
    //   };
    //   break;
    // case userConstants.FILTER_USER_BY_CATEGORY_FAILURE:
    //   state = {
    //     ...state,
    //     loading: false,
    //     message: action.payload.message,
    //   };
    //   break;
    // //
    // case userConstants.FILTER_USER_BY_CATEGORY_REQUEST:
    //   state = {
    //     ...state,
    //     loading: true,
    //   };
    //   break;
    // case userConstants.FILTER_USER_BY_CATEGORY_SUCCESS:
    //   state = {
    //     ...state,
    //     loading: false,
    //     // message:action.payload.message,
    //     listUser: action.payload.dataResponse,
    //   };
    //   break;
    // case userConstants.FILTER_USER_BY_CATEGORY_FAILURE:
    //   state = {
    //     ...state,
    //     loading: false,
    //     message: action.payload.message,
    //   };
    //   break;
    //
    case userConstants.GET_USER_BY_ID_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.GET_USER_BY_ID_SUCCESS:
      state = {
        ...state,
        loading: false,
        message:action.payload.message,
        user: action.payload.dataResponse,
      };
      break;
    case userConstants.GET_USER_BY_ID_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;

    case userConstants.ADD_USER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.ADD_USER_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
        user: action.payload.dataResponse,
        loading: false,
      };
      break;
    case userConstants.ADD_USER_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case userConstants.UPDATE_USER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.UPDATE_USER_SUCCESS:
      state = {
        ...state,
        loading: false,
        user: action.payload.dataResponse,
        message: action.payload.message,
      };
      break;
    case userConstants.UPDATE_USER_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case userConstants.DELETE_USER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.DELETE_USER_SUCCESS:
      state = {
        ...state,
        loading: false,
        messages: action.payload.message,
      };
      break;
    case userConstants.DELETE_USER_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
  }
  return state;
};
