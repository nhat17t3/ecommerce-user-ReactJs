import axios from "../helpers/axios";
import { articleConstants } from "../constants/article.constants";
import { toast } from "react-toastify";

export const getListArticleByPage = (formData) => {
  return async (dispatch) => {
    dispatch({ type: articleConstants.GET_ARTICLE_BY_PAGE_REQUEST });
    console.log("formData", formData)
    const res = await axios.post(`/api/articles/list`,formData);

    if (res.status === 200) {
      const { result, message } = res.data;
      dispatch({
        type: articleConstants.GET_ARTICLE_BY_PAGE_SUCCESS,
        payload: {
          dataResponse: result.content,
          message: message,
          pageNumber: result.pageNumber,
          pageSize :result.pageSize,
          totalElements: result.totalElements,
          totalPages: result.totalPages,
        },
      });

      // toast("get list article by page success");
    } else {
      const { message } = res.data;
      dispatch({
        type: articleConstants.GET_ARTICLE_BY_PAGE_FAILURE,
        payload: {
          message: message,
        },
      });
      // toast("get list article by page error");
    }
  };
};

export const getArticleById = (id) => {
  return async (dispatch) => {
    dispatch({ type: articleConstants.GET_ARTICLE_BY_ID_REQUEST });
    const res = await axios.get(`/api/articles/${id}`);

    if (res.status === 200) {
      const { result, message } = res.data;
      dispatch({
        type: articleConstants.GET_ARTICLE_BY_ID_SUCCESS,
        payload: {
          dataResponse: result,
          message: message,
        },
      });

      // toast("get article by id success");
    } else {
      const { message } = res.data;
      dispatch({
        type: articleConstants.GET_ARTICLE_BY_ID_FAILURE,
        payload: {
          message: message,
        },
      });
      // toast("get article by id error");
    }
  };
};


export const createArticle = (form) => {
  return async (dispatch) => {
    dispatch({
      type: articleConstants.ADD_ARTICLE_REQUEST,
    });
    const res = await axios.post(`/api/articles`, form);

    if (res.status === 201) {
      const { result, message } = res.data;

      dispatch({
        type: articleConstants.ADD_ARTICLE_SUCCESS,
        payload: {
          dataResponse: result,
          message: message,
        },
      });
      toast.success("tạo bài viết thành công");
      // dispatch(getListArticle());
    } else {
      const {  message } = res.data;
      dispatch({
        type: articleConstants.ADD_ARTICLE_FAILURE,
        payload: {
          message: message,
        },
      });

      toast.error("tạo bài viết thất bại");
    }
  };
};
export const deleteArticle = (form) => {
  return async (dispatch) => {
    dispatch({ type: articleConstants.DELETE_ARTICLE_REQUEST });
    const res = await axios.delete(`/api/articles/${form.id}`);
    if (res.status === 200) {
      const { message } = res.data;

      dispatch({
        type: articleConstants.DELETE_ARTICLE_SUCCESS,
        payload: {
          message: message,
        },
      });
      toast.success("xóa bài viết thành công");

      // dispatch(getListArticleByPage());
    } else {
      const {  message } = res.data;

      dispatch({
        type: articleConstants.DELETE_ARTICLE_FAILURE,
        payload: {
          message: message,
        },
      });
      toast.error("xóa bài viết thất bại");
    }
  };
};

export const updateArticle = (id,form) => {
  return async (dispatch) => {
    // const id = form.get("id");
    dispatch({ type: articleConstants.UPDATE_ARTICLE_REQUEST });
    const res = await axios.put(`/api/articles/${id}`, form);

    if (res.status === 200) {
      const { result, message } = res.data;

      dispatch({
        type: articleConstants.UPDATE_ARTICLE_SUCCESS,
        payload: {
          dataResponse: result,
          message: message,
        },
      });
      toast.success("cập nhật bài viết thành công");

      // dispatch(getListArticle());
    } else {
      const {  message } = res.data;

      dispatch({
        type: articleConstants.UPDATE_ARTICLE_FAILURE,
        payload: {
          message: message,
        },
      });
      toast.error("cập nhật bài viết thất bại");
    }
  };
};
