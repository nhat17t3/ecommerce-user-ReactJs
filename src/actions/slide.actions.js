import axios from "../helpers/axios";
import { slideConstants } from "../constants/slide.constants";
import { toast } from "react-toastify";

export const getListSlide = () => {
  return async (dispatch) => {
    dispatch({ type: slideConstants.GET_ALL_SLIDE_REQUEST });
    const res = await axios.get(`/api/slides`);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;
      dispatch({
        type: slideConstants.GET_ALL_SLIDE_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      // toast("get list slide success");
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: slideConstants.GET_ALL_SLIDE_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      // toast("get list slide error");
    }
  };
};

export const getSlideById = (id) => {
  return async (dispatch) => {
    dispatch({ type: slideConstants.GET_SLIDE_BY_ID_REQUEST });
    const res = await axios.get(`/api/slides/${id}`);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;
      dispatch({
        type: slideConstants.GET_SLIDE_BY_ID_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      // toast("get slide by id success");
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: slideConstants.GET_SLIDE_BY_ID_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      // toast("get slide by id error");
    }
  };
};

export const createSlide = (form) => {
  return async (dispatch) => {
    dispatch({
      type: slideConstants.ADD_SLIDE_REQUEST,
    });
    const res = await axios.post(`/api/slides`, form);

    if (res.status === 201) {
      const { dataResponse, message } = res.data;

      dispatch({
        type: slideConstants.ADD_SLIDE_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("tạo slide thành công");
      // dispatch(getListSlide());
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: slideConstants.ADD_SLIDE_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      toast.error("tạo slide thất bại");
    }
  };
};
export const deleteSlide = (form) => {
  return async (dispatch) => {
    dispatch({ type: slideConstants.DELETE_SLIDE_REQUEST });
    const res = await axios.delete(`/api/slides/${form.id}`);
    if (res.status === 200) {
      const { dataResponse, message } = res.data;

      dispatch({
        type: slideConstants.DELETE_SLIDE_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("xóa slide thành công");

      dispatch(getListSlide());
    } else {
      const { dataResponse, message } = res.data;

      dispatch({
        type: slideConstants.DELETE_SLIDE_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.error("xóa slide thất bại");
    }
  };
};

export const updateSlide = (id,form) => {
  return async (dispatch) => {
    // const id = form.get("id");
    dispatch({ type: slideConstants.UPDATE_SLIDE_REQUEST });
    const res = await axios.put(`/api/slides/${id}`, form);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;

      dispatch({
        type: slideConstants.UPDATE_SLIDE_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("cập nhật slide thành công");

      // dispatch(getListSlide());
    } else {
      const { dataResponse, message } = res.data;

      dispatch({
        type: slideConstants.UPDATE_SLIDE_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.error("cập nhật slide thất bại");
    }
  };
};
