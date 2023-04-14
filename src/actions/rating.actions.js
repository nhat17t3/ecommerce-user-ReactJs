import axios from "../helpers/axios";
import { ratingConstants } from "../constants/rating.constants";
import { toast } from "react-toastify";

export const getListRatingByPage = (limit=10,page=0) => {
  return async (dispatch) => {
    dispatch({ type: ratingConstants.GET_RATING_BY_PAGE_REQUEST });
    const res = await axios.get(`/api/ratings?limit=${limit}&page=${page}&sortBy=createdAt`);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;
      dispatch({
        type: ratingConstants.GET_RATING_BY_PAGE_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      // toast("get list rating by page success");
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: ratingConstants.GET_RATING_BY_PAGE_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      // toast("get list rating by page error");
    }
  };
};

export const getRatingById = (id) => {
  return async (dispatch) => {
    dispatch({ type: ratingConstants.GET_RATING_BY_ID_REQUEST });
    const res = await axios.get(`/api/ratings/${id}`);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;
      dispatch({
        type: ratingConstants.GET_RATING_BY_ID_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      // toast("get rating by id success");
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: ratingConstants.GET_RATING_BY_ID_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      // toast("get rating by id error");
    }
  };
};

export const filterRatingByProduct = (productId,limit,page) => {
  return async (dispatch) => {
    dispatch({ type: ratingConstants.FILTER_RATING_BY_PRODUCT_REQUEST });
    const res = await axios.get(`/api/ratings/product/${productId}?limit=${limit}&page=${page}`);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;
      dispatch({
        type: ratingConstants.FILTER_RATING_BY_PRODUCT_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      // toast("filter rating by product success");
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: ratingConstants.FILTER_RATING_BY_PRODUCT_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      // toast("filter rating by product error");
    }
  };
};


export const createRating = (form) => {
  return async (dispatch) => {
    dispatch({
      type: ratingConstants.ADD_RATING_REQUEST,
    });
    const res = await axios.post(`/api/ratings`, form);

    if (res.status === 201) {
      const { dataResponse, message } = res.data;

      dispatch({
        type: ratingConstants.ADD_RATING_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("tạo đánh giá thành công");
      dispatch(getListRatingByPage());
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: ratingConstants.ADD_RATING_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      toast.error("Đánh giá thất bại");
    }
  };
};
export const deleteRating = (form) => {
  return async (dispatch) => {
    dispatch({ type: ratingConstants.DELETE_RATING_REQUEST });
    const res = await axios.delete(`/api/ratings/${form.id}`);
    if (res.status === 200) {
      const { dataResponse, message } = res.data;

      dispatch({
        type: ratingConstants.DELETE_RATING_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("xóa đánh giá thành công");

      // dispatch(getListRatingByPage());
    } else {
      const { dataResponse, message } = res.data;

      dispatch({
        type: ratingConstants.DELETE_RATING_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.error("xóa đánh giá thất bại");
    }
  };
};

export const updateRating = (id,form) => {
  return async (dispatch) => {
    // const id = form.get("id");
    dispatch({ type: ratingConstants.UPDATE_RATING_REQUEST });
    const res = await axios.put(`/api/ratings/${id}`, form);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;

      dispatch({
        type: ratingConstants.UPDATE_RATING_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("cập nhật đánh giá thành công");

      // dispatch(getListRating());
    } else {
      const { dataResponse, message } = res.data;

      dispatch({
        type: ratingConstants.UPDATE_RATING_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.error("cập nhật đánh giá thất bại");
    }
  };
};
