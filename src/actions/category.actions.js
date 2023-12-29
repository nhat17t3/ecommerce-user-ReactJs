import axios from "../helpers/axios";
import { categoryConstants } from "../constants/category.constants";
import { toast } from "react-toastify";

export const getListCategory = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.GET_ALL_CATEGORY_REQUEST });
    const res = await axios.get(`/api/categories`);

    if (res.status === 200) {
      const { result, message } = res.data;
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
        payload: {
          dataResponse: result,
          message: message,
        },
      });

      // toast("get list category success");
    } else {
      const {  message } = res.data;
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORY_FAILURE,
        payload: {
          message: message,
        },
      });
      // toast("get list category error");
    }
  };
};

export const createCategory = (form) => {
  return async (dispatch) => {
    dispatch({
      type: categoryConstants.ADD_CATEGORY_REQUEST,
    });
    const res = await axios.post(`/api/categories`, form);

    if (res.status === 201) {
      const { result, message } = res.data;

      dispatch({
        type: categoryConstants.ADD_CATEGORY_SUCCESS,
        payload: {
          dataResponse: result,
          message: message,
        },
      });
      toast.success("tạo danh mục sản phẩm thành công");
      // dispatch(getListCategory());
    } else {
      const {  message } = res.data;
      dispatch({
        type: categoryConstants.ADD_CATEGORY_FAILURE,
        payload: {
          message: message,
        },
      });

      toast.error("tạo danh mục sản phẩm thất bại");
    }
  };
};
export const deleteCategory = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.DELETE_CATEGORY_REQUEST });
    const res = await axios.delete(`/api/categories/${form.id}`);
    if (res.status === 200) {
      const {  message } = res.data;

      dispatch({
        type: categoryConstants.DELETE_CATEGORY_SUCCESS,
        payload: {
          message: message,
        },
      });
      toast.success("xóa danh mục sản phẩm thành công");

      dispatch(getListCategory());
    } else {
      const { message } = res.data;

      dispatch({
        type: categoryConstants.DELETE_CATEGORY_FAILURE,
        payload: {
          message: message,
        },
      });
      toast.error("xóa danh mục sản phẩm thất bại");
    }
  };
};

export const updateCategory = (form) => {
  return async (dispatch) => {
    // const id = form.get("id");
    dispatch({ type: categoryConstants.UPDATE_CATEGORY_REQUEST });
    const res = await axios.put(`/api/categories/${form.id}`, form);

    if (res.status === 200) {
      const { result, message } = res.data;

      dispatch({
        type: categoryConstants.UPDATE_CATEGORY_SUCCESS,
        payload: {
          dataResponse: result,
          message: message,
        },
      });
      toast.success("cập nhật danh mục sản phẩm thành công");

      dispatch(getListCategory());
    } else {
      const { message } = res.data;

      dispatch({
        type: categoryConstants.UPDATE_CATEGORY_FAILURE,
        payload: {
          message: message,
        },
      });
      toast.error("cập nhật danh mục sản phẩm thất bại");
    }
  };
};
