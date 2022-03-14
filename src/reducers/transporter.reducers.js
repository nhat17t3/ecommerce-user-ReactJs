import { transporterConstants } from "../constants/transporter.constants";

const initState = {
  listTransporter: [],
  transporter: {},
  loading: false,
  message: "",
};

export default (state = initState, action) => {
  switch (action.type) {
    case transporterConstants.GET_ALL_TRANSPORTER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case transporterConstants.GET_ALL_TRANSPORTER_SUCCESS:
      state = {
        ...state,
        loading: false,
        // message:action.payload.message,
        listTransporter: action.payload.dataResponse,
      };
      break;
    case transporterConstants.GET_ALL_TRANSPORTER_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    //
  
    case transporterConstants.GET_TRANSPORTER_BY_ID_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case transporterConstants.GET_TRANSPORTER_BY_ID_SUCCESS:
      state = {
        ...state,
        loading: false,
        // message:action.payload.message,
        transporter: action.payload.dataResponse,
      };
      break;
    case transporterConstants.GET_TRANSPORTER_BY_ID_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;

    case transporterConstants.ADD_TRANSPORTER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case transporterConstants.ADD_TRANSPORTER_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
        loading: false,
      };
      break;
    case transporterConstants.ADD_TRANSPORTER_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case transporterConstants.UPDATE_TRANSPORTER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case transporterConstants.UPDATE_TRANSPORTER_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case transporterConstants.UPDATE_TRANSPORTER_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case transporterConstants.DELETE_TRANSPORTER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case transporterConstants.DELETE_TRANSPORTER_SUCCESS:
      state = {
        ...state,
        loading: false,
        messages: action.payload.message,
      };
      break;
    case transporterConstants.DELETE_TRANSPORTER_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
  }
  return state;
};
