import { feedbackConstants } from "../constants/feedback.constants";

const initState = {
  listFeedback: [],
  feedback: {},
  loading: false,
  message: "",
};

export default (state = initState, action) => {
  switch (action.type) {
    case feedbackConstants.GET_FEEDBACK_BY_PAGE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case feedbackConstants.GET_FEEDBACK_BY_PAGE_SUCCESS:
      state = {
        ...state,
        loading: false,
        // message:action.payload.message,
        listFeedback: action.payload.dataResponse,
      };
      break;
    case feedbackConstants.GET_FEEDBACK_BY_PAGE_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    //
   
    case feedbackConstants.FILTER_FEEDBACK_IS_READ_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case feedbackConstants.FILTER_FEEDBACK_IS_READ_SUCCESS:
      state = {
        ...state,
        loading: false,
        // message:action.payload.message,
        listFeedback: action.payload.dataResponse,
      };
      break;
    case feedbackConstants.FILTER_FEEDBACK_IS_READ_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    //
   
    //
    case feedbackConstants.GET_FEEDBACK_BY_ID_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case feedbackConstants.GET_FEEDBACK_BY_ID_SUCCESS:
      state = {
        ...state,
        loading: false,
        // message:action.payload.message,
        feedback: action.payload.dataResponse,
      };
      break;
    case feedbackConstants.GET_FEEDBACK_BY_ID_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;

    case feedbackConstants.ADD_FEEDBACK_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case feedbackConstants.ADD_FEEDBACK_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
        loading: false,
      };
      break;
    case feedbackConstants.ADD_FEEDBACK_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case feedbackConstants.UPDATE_FEEDBACK_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case feedbackConstants.UPDATE_FEEDBACK_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case feedbackConstants.UPDATE_FEEDBACK_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case feedbackConstants.DELETE_FEEDBACK_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case feedbackConstants.DELETE_FEEDBACK_SUCCESS:
      state = {
        ...state,
        loading: false,
        messages: action.payload.message,
      };
      break;
    case feedbackConstants.DELETE_FEEDBACK_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
  }
  return state;
};
