import { orderConstants } from "../constants/order.constants";

const initState = {
  listOrder: [],
  order: {},
  loading: false,
  message: "",
  pageNumber: 0,
  pageSize :5,
  totalElements: 0,
  totalPages: 0,
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
        message:action.payload.message,
        listOrder: action.payload.dataResponse,
        pageNumber: action.payload.pageNumber,
        pageSize: action.payload.pageSize,
        totalElements: action.payload.totalElements,
        totalPages: action.payload.totalPages,

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
    // case orderConstants.SEARCH_ORDER_BY_NAME_REQUEST:
    //   state = {
    //     ...state,
    //     loading: true,
    //   };
    //   break;
    // case orderConstants.SEARCH_ORDER_BY_NAME_SUCCESS:
    //   state = {
    //     ...state,
    //     loading: false,
    //     // message:action.payload.message,
    //     listOrder: action.payload.dataResponse,

    //   };
    //   break;
    // case orderConstants.SEARCH_ORDER_BY_NAME_FAILURE:
    //   state = {
    //     ...state,
    //     loading: false,
    //     message: action.payload.message,
    //   };
    //   break;
    // //
    // case orderConstants.FILTER_ORDER_BY_BRAND_REQUEST:
    //   state = {
    //     ...state,
    //     loading: true,
    //   };
    //   break;
    // case orderConstants.FILTER_ORDER_BY_BRAND_SUCCESS:
    //   state = {
    //     ...state,
    //     loading: false,
    //     // message:action.payload.message,
    //     listOrder: action.payload.dataResponse,
    //   };
    //   break;
    // case orderConstants.FILTER_ORDER_BY_CATEGORY_FAILURE:
    //   state = {
    //     ...state,
    //     loading: false,
    //     message: action.payload.message,
    //   };
    //   break;
    // //
    // case orderConstants.FILTER_ORDER_BY_CATEGORY_REQUEST:
    //   state = {
    //     ...state,
    //     loading: true,
    //   };
    //   break;
    // case orderConstants.FILTER_ORDER_BY_CATEGORY_SUCCESS:
    //   state = {
    //     ...state,
    //     loading: false,
    //     // message:action.payload.message,
    //     listOrder: action.payload.dataResponse,
    //   };
    //   break;
    // case orderConstants.FILTER_ORDER_BY_CATEGORY_FAILURE:
    //   state = {
    //     ...state,
    //     loading: false,
    //     message: action.payload.message,
    //   };
    //   break;
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
        message:action.payload.message,
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
        order: action.payload.dataResponse,
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
      case orderConstants.CREATE_TRACKING_ORDER_REQUEST:
        state = {
          ...state,
          loading: true,
        };
        break;
      case orderConstants.CREATE_TRACKING_ORDER_SUCCESS:
        state = {
          ...state,
          loading: false,
          messages: action.payload.message,
        };
        break;
      case orderConstants.CREATE_TRACKING_ORDER_FAILURE:
        state = {
          ...state,
          loading: false,
          message: action.payload.message,
        };
        break;
        case orderConstants.GET_ALL_STATUS_TRACKING_ORDER_REQUEST:
          state = {
            ...state,
            loading: true,
          };
          break;
        case orderConstants.GET_ALL_STATUS_TRACKING_ORDER_SUCCESS:
          state = {
            ...state,
            loading: false,
            messages: action.payload.message,
          };
          break;
        case orderConstants.GET_ALL_STATUS_TRACKING_ORDER_FAILURE:
          state = {
            ...state,
            loading: false,
            message: action.payload.message,
          };
          break;
  }
  return state;
};
