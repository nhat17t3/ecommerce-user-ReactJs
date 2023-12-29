import { articleConstants } from "../constants/article.constants";

const initState = {
  listArticle: [],
  article: {},
  loading: false,
  message: "",
  pageNumber: 0,
  pageSize :5,
  totalElements: 0,
  totalPages: 0,
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
        message:action.payload.message,
        listArticle: action.payload.dataResponse,
        pageNumber: action.payload.pageNumber,
        pageSize: action.payload.pageSize,
        totalElements: action.payload.totalElements,
        totalPages: action.payload.totalPages,

      };
      break;
    case articleConstants.GET_ARTICLE_BY_PAGE_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
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
        message:action.payload.message,
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
        article: action.payload.dataResponse,
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
        article: action.payload.dataResponse,
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
