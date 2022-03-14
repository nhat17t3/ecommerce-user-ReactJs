import { articleConstants } from "../constants/article.constants";

const initState = {
  listArticle: [],
  article: {},
  loading: false,
  message: "",
};

export default (state = initState, action) => {
  switch (action.type) {
    case articleConstants.GET_ARTICLE_BY_PAGE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case articleConstants.GET_ARTICLE_BY_PAGE_SUCCESS:
      state = {
        ...state,
        loading: false,
        // message:action.payload.message,
        listArticle: action.payload.dataResponse,
      };
      break;
    case articleConstants.GET_ARTICLE_BY_PAGE_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    //
    case articleConstants.SEARCH_ARTICLE_BY_NAME_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case articleConstants.SEARCH_ARTICLE_BY_NAME_SUCCESS:
      state = {
        ...state,
        loading: false,
        // message:action.payload.message,
        listArticle: action.payload.dataResponse,
      };
      break;
    case articleConstants.SEARCH_ARTICLE_BY_NAME_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    
    //
    case articleConstants.FILTER_ARTICLE_BY_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case articleConstants.FILTER_ARTICLE_BY_CATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        // message:action.payload.message,
        listArticle: action.payload.dataResponse,
      };
      break;
    case articleConstants.FILTER_ARTICLE_BY_CATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    //
    case articleConstants.GET_ARTICLE_BY_ID_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case articleConstants.GET_ARTICLE_BY_ID_SUCCESS:
      state = {
        ...state,
        loading: false,
        // message:action.payload.message,
        article: action.payload.dataResponse,
      };
      break;
    case articleConstants.GET_ARTICLE_BY_ID_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;

    case articleConstants.ADD_ARTICLE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case articleConstants.ADD_ARTICLE_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
        loading: false,
      };
      break;
    case articleConstants.ADD_ARTICLE_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case articleConstants.UPDATE_ARTICLE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case articleConstants.UPDATE_ARTICLE_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case articleConstants.UPDATE_ARTICLE_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case articleConstants.DELETE_ARTICLE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case articleConstants.DELETE_ARTICLE_SUCCESS:
      state = {
        ...state,
        loading: false,
        messages: action.payload.message,
      };
      break;
    case articleConstants.DELETE_ARTICLE_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
  }
  return state;
};
