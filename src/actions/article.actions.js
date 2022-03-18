import axios from "../helpers/axios";
import { articleConstants } from "../constants/article.constants";
import { toast } from "react-toastify";

export const getListArticleByPage = (limit=10,page=0,categoryArticleId=0) => {
  return async (dispatch) => {
    dispatch({ type: articleConstants.GET_ARTICLE_BY_PAGE_REQUEST });
    const res = await axios.get(`/api/articles?limit=${limit}&page=${page}&categoryArticleId=${categoryArticleId}`);

    if (res.status === 200) {
      const { dataResponse, message,count } = res.data;
      dispatch({
        type: articleConstants.GET_ARTICLE_BY_PAGE_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
          count: count
        },
      });

      toast("get list article by page success");
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: articleConstants.GET_ARTICLE_BY_PAGE_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast("get list article by page error");
    }
  };
};

export const getArticleById = (id) => {
  return async (dispatch) => {
    dispatch({ type: articleConstants.GET_ARTICLE_BY_ID_REQUEST });
    const res = await axios.get(`/api/articles/${id}`);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;
      dispatch({
        type: articleConstants.GET_ARTICLE_BY_ID_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      toast("get article by id success");
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: articleConstants.GET_ARTICLE_BY_ID_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast("get article by id error");
    }
  };
};

export const searchListArticleByName = (key,limit,page) => {
  return async (dispatch) => {
    dispatch({ type: articleConstants.SEARCH_ARTICLE_BY_NAME_REQUEST });
    const res = await axios.get(`/api/articles/search?q=${key}&limit=${limit}&page=${page}`);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;
      dispatch({
        type: articleConstants.SEARCH_ARTICLE_BY_NAME_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      toast("search list article by name success");
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: articleConstants.SEARCH_ARTICLE_BY_NAME_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast("search list article by name error");
    }
  };
};


// export const filterArticleByBrand = (brandId,limit,page) => {
//   return async (dispatch) => {
//     dispatch({ type: articleConstants.FILTER_ARTICLE_BY_BRAND_REQUEST });
//     const res = await axios.get(`/api/articles/brand/${brandId}?limit=${limit}&page=${page}`);

//     if (res.status === 200) {
//       const { dataResponse, message } = res.data;
//       dispatch({
//         type: articleConstants.FILTER_ARTICLE_BY_BRAND_SUCCESS,
//         payload: {
//           dataResponse: dataResponse,
//           message: message,
//         },
//       });

//       toast("filter article by brand success");
//     } else {
//       const { dataResponse, message } = res.data;
//       dispatch({
//         type: articleConstants.FILTER_ARTICLE_BY_CATEGORY_FAILURE,
//         payload: {
//           dataResponse: dataResponse,
//           message: message,
//         },
//       });
//       toast("filter article by brand error");
//     }
//   };
// };


// export const filterArticleByCategory = (cateId,limit,page) => {
//   return async (dispatch) => {
//     dispatch({ type: articleConstants.FILTER_ARTICLE_BY_CATEGORY_REQUEST });
//     const res = await axios.get(`/api/articles/category/${cateId}?limit=${limit}&page=${page}`);

//     if (res.status === 200) {
//       const { dataResponse, message } = res.data;
//       dispatch({
//         type: articleConstants.FILTER_ARTICLE_BY_CATEGORY_SUCCESS,
//         payload: {
//           dataResponse: dataResponse,
//           message: message,
//         },
//       });

//       toast("filter article by category success");
//     } else {
//       const { dataResponse, message } = res.data;
//       dispatch({
//         type: articleConstants.FILTER_ARTICLE_BY_CATEGORY_FAILURE,
//         payload: {
//           dataResponse: dataResponse,
//           message: message,
//         },
//       });
//       toast("filter article by category error");
//     }
//   };
// };


export const createArticle = (form) => {
  return async (dispatch) => {
    dispatch({
      type: articleConstants.ADD_ARTICLE_REQUEST,
    });
    const res = await axios.post(`/api/articles`, form);

    if (res.status === 201) {
      const { dataResponse, message } = res.data;

      dispatch({
        type: articleConstants.ADD_ARTICLE_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("tạo bài viết thành công");
      // dispatch(getListArticle());
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: articleConstants.ADD_ARTICLE_FAILURE,
        payload: {
          dataResponse: dataResponse,
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
      const { dataResponse, message } = res.data;

      dispatch({
        type: articleConstants.DELETE_ARTICLE_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("xóa bài viết thành công");

      // dispatch(getListArticleByPage());
    } else {
      const { dataResponse, message } = res.data;

      dispatch({
        type: articleConstants.DELETE_ARTICLE_FAILURE,
        payload: {
          dataResponse: dataResponse,
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
      const { dataResponse, message } = res.data;

      dispatch({
        type: articleConstants.UPDATE_ARTICLE_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("cập nhật bài viết thành công");

      // dispatch(getListArticle());
    } else {
      const { dataResponse, message } = res.data;

      dispatch({
        type: articleConstants.UPDATE_ARTICLE_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.error("cập nhật bài viết thất bại");
    }
  };
};
