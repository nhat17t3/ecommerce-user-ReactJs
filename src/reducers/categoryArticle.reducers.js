import { categoryArticleConstants } from "../constants/categoryArticle.constants";

const initState = {
  listCategoryArticle: [],
  categoryArticle: {},
  loading: false,
  message: "",
};

export default (state = initState, action) => {
  switch (action.type) {
    case categoryArticleConstants.GET_ALL_CATEGORY_ARTICLE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryArticleConstants.GET_ALL_CATEGORY_ARTICLE_SUCCESS:
      state = {
        ...state,
        loading: false,
        message:action.payload.message,
        listCategoryArticle: action.payload.dataResponse,
      };
      break;
    case categoryArticleConstants.GET_ALL_CATEGORY_ARTICLE_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
      
    case categoryArticleConstants.ADD_CATEGORY_ARTICLE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryArticleConstants.ADD_CATEGORY_ARTICLE_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
        categoryArticle: action.payload.dataResponse,
        loading: false,
      };
      break;
    case categoryArticleConstants.ADD_CATEGORY_ARTICLE_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case categoryArticleConstants.UPDATE_CATEGORY_ARTICLE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryArticleConstants.UPDATE_CATEGORY_ARTICLE_SUCCESS:
      state = {
        ...state,
        loading: false,
        categoryArticle: action.payload.dataResponse,
        message: action.payload.message,
      };
      break;
    case categoryArticleConstants.UPDATE_CATEGORY_ARTICLE_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case categoryArticleConstants.DELETE_CATEGORY_ARTICLE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryArticleConstants.DELETE_CATEGORY_ARTICLE_SUCCESS:
      state = {
        ...state,
        loading: false,
        messages: action.payload.message,
      };
      break;
    case categoryArticleConstants.DELETE_CATEGORY_ARTICLE_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
  }
  return state;
};