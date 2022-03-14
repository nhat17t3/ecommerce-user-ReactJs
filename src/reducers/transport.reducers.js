import { transportConstants } from "../constants/transport.constants";

const initState = {
  listTransport: [],
  transport: {},
  loading: false,
  message: "",
};

export default (state = initState, action) => {
  switch (action.type) {
    case transportConstants.GET_TRANSPORT_BY_PAGE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case transportConstants.GET_TRANSPORT_BY_PAGE_SUCCESS:
      state = {
        ...state,
        loading: false,
        // message:action.payload.message,
        listTransport: action.payload.dataResponse,
      };
      break;
    case transportConstants.GET_TRANSPORT_BY_PAGE_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    //
    case transportConstants.SEARCH_TRANSPORT_BY_CODE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case transportConstants.SEARCH_TRANSPORT_BY_CODE_SUCCESS:
      state = {
        ...state,
        loading: false,
        // message:action.payload.message,
        listTransport: action.payload.dataResponse,
      };
      break;
    case transportConstants.SEARCH_TRANSPORT_BY_CODE_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    
    
    //
    case transportConstants.GET_TRANSPORT_BY_ID_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case transportConstants.GET_TRANSPORT_BY_ID_SUCCESS:
      state = {
        ...state,
        loading: false,
        // message:action.payload.message,
        transport: action.payload.dataResponse,
      };
      break;
    case transportConstants.GET_TRANSPORT_BY_ID_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;

    case transportConstants.ADD_TRANSPORT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case transportConstants.ADD_TRANSPORT_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
        loading: false,
      };
      break;
    case transportConstants.ADD_TRANSPORT_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case transportConstants.UPDATE_TRANSPORT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case transportConstants.UPDATE_TRANSPORT_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case transportConstants.UPDATE_TRANSPORT_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case transportConstants.DELETE_TRANSPORT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case transportConstants.DELETE_TRANSPORT_SUCCESS:
      state = {
        ...state,
        loading: false,
        messages: action.payload.message,
      };
      break;
    case transportConstants.DELETE_TRANSPORT_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
  }
  return state;
};
