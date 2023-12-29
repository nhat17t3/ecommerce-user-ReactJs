import axios from "../helpers/axios";
import { categoryArticleConstants } from "../constants/categoryArticle.constants";
import { toast } from "react-toastify";

export const getListCategoryArticle = () => {
  return async (dispatch) => {
    dispatch({ type: categoryArticleConstants.GET_ALL_CATEGORY_ARTICLE_REQUEST });
    const res = await axios.get(`/api/categorieArticles`);

    if (res.status === 200) {
      const { result, message } = res.data;
      dispatch({
        type: categoryArticleConstants.GET_ALL_CATEGORY_ARTICLE_SUCCESS,
        payload: {
          dataResponse: result,
          message: message,
        },
      });

      // toast("get list categoryArticle success");
    } else {
      const {  message } = res.data;
      dispatch({
        type: categoryArticleConstants.GET_ALL_CATEGORY_ARTICLE_FAILURE,
        payload: {
          message: message,
        },
      });
      // toast("get list categoryArticle error");
    }
  };
};

export const createCategoryArticle = (form) => {
  return async (dispatch) => {
    dispatch({
      type: categoryArticleConstants.ADD_CATEGORY_ARTICLE_REQUEST,
    });
    const res = await axios.post(`/api/categorieArticles`, form);

    if (res.status === 201) {
      const { result, message } = res.data;

      dispatch({
        type: categoryArticleConstants.ADD_CATEGORY_ARTICLE_SUCCESS,
        payload: {
          dataResponse: result,
          message: message,
        },
      });
      toast.success("tạo danh mục bài viết thành công");
      // dispatch(getListCategoryArticle());
    } else {
      const {  message } = res.data;
      dispatch({
        type: categoryArticleConstants.ADD_CATEGORY_ARTICLE_FAILURE,
        payload: {
          message: message,
        },
      });

      toast.error("tạo danh mục bài viết thất bại");
    }
  };
};
export const deleteCategoryArticle = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryArticleConstants.DELETE_CATEGORY_ARTICLE_REQUEST });
    const res = await axios.delete(`/api/categorieArticles/${form.id}`);
    if (res.status === 200) {
      const {  message } = res.data;

      dispatch({
        type: categoryArticleConstants.DELETE_CATEGORY_ARTICLE_SUCCESS,
        payload: {
          message: message,
        },
      });
      toast.success("xóa danh mục bài viết thành công");

      dispatch(getListCategoryArticle());
    } else {
      const { message } = res.data;

      dispatch({
        type: categoryArticleConstants.DELETE_CATEGORY_ARTICLE_FAILURE,
        payload: {
          message: message,
        },
      });
      toast.error("xóa danh mục bài viết thất bại");
    }
  };
};

export const updateCategoryArticle = (form) => {
  return async (dispatch) => {
    // const id = form.get("id");
    dispatch({ type: categoryArticleConstants.UPDATE_CATEGORY_ARTICLE_REQUEST });
    const res = await axios.put(`/api/categorieArticles/${form.id}`, form);

    if (res.status === 200) {
      const { result, message } = res.data;

      dispatch({
        type: categoryArticleConstants.UPDATE_CATEGORY_ARTICLE_SUCCESS,
        payload: {
          dataResponse: result,
          message: message,
        },
      });
      toast.success("cập nhật danh mục bài viết thành công");

      dispatch(getListCategoryArticle());
    } else {
      const { message } = res.data;

      dispatch({
        type: categoryArticleConstants.UPDATE_CATEGORY_ARTICLE_FAILURE,
        payload: {
          message: message,
        },
      });
      toast.error("cập nhật danh mục bài viết thất bại");
    }
  };
};
