import axios from "../helpers/axios";
import { userConstants } from "../constants/user.constants";
import { toast } from "react-toastify";

export const getListUserByPage = (formData) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.GET_USER_BY_PAGE_REQUEST });
    console.log("formData", formData)
    const res = await axios.post(`/api/users/list`,formData);

    if (res.status === 200) {
      const { result, message } = res.data;
      dispatch({
        type: userConstants.GET_USER_BY_PAGE_SUCCESS,
        payload: {
          dataResponse: result.content,
          message: message,
          pageNumber: result.pageNumber,
          pageSize :result.pageSize,
          totalElements: result.totalElements,
          totalPages: result.totalPages,
        },
      });

      // toast("get list user by page success");
    } else {
      const { message } = res.data;
      dispatch({
        type: userConstants.GET_USER_BY_PAGE_FAILURE,
        payload: {
          message: message,
        },
      });
      // toast("get list user by page error");
    }
  };
};

export const getUserById = (id) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.GET_USER_BY_ID_REQUEST });
    const res = await axios.get(`/api/users/${id}`);

    if (res.status === 200) {
      const { result, message } = res.data;
      dispatch({
        type: userConstants.GET_USER_BY_ID_SUCCESS,
        payload: {
          dataResponse: result,
          message: message,
        },
      });

      // toast("get user by id success");
    } else {
      const { message } = res.data;
      dispatch({
        type: userConstants.GET_USER_BY_ID_FAILURE,
        payload: {
          message: message,
        },
      });
      // toast("get user by id error");
    }
  };
};


export const createUser = (form) => {
  return async (dispatch) => {
    dispatch({
      type: userConstants.ADD_USER_REQUEST,
    });
    const res = await axios.post(`/api/users`, form);

    if (res.status === 201) {
      const { result, message } = res.data;

      dispatch({
        type: userConstants.ADD_USER_SUCCESS,
        payload: {
          dataResponse: result,
          message: message,
        },
      });
      toast.success("tạo khách hàng thành công");
      // dispatch(getListUser());
    } else {
      const {  message } = res.data;
      dispatch({
        type: userConstants.ADD_USER_FAILURE,
        payload: {
          message: message,
        },
      });

      toast.error("tạo khách hàng thất bại");
    }
  };
};
export const deleteUser = (form) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.DELETE_USER_REQUEST });
    const res = await axios.delete(`/api/users/${form.id}`);
    if (res.status === 200) {
      const { message } = res.data;

      dispatch({
        type: userConstants.DELETE_USER_SUCCESS,
        payload: {
          message: message,
        },
      });
      toast.success("xóa khách hàng thành công");

      // dispatch(getListUserByPage());
    } else {
      const {  message } = res.data;

      dispatch({
        type: userConstants.DELETE_USER_FAILURE,
        payload: {
          message: message,
        },
      });
      toast.error("xóa khách hàng thất bại");
    }
  };
};

export const updateUser = (id,form) => {
  return async (dispatch) => {
    // const id = form.get("id");
    dispatch({ type: userConstants.UPDATE_USER_REQUEST });
    const res = await axios.put(`/api/users/${id}`, form);

    if (res.status === 200) {
      const { result, message } = res.data;

      dispatch({
        type: userConstants.UPDATE_USER_SUCCESS,
        payload: {
          dataResponse: result,
          message: message,
        },
      });
      toast.success("cập nhật khách hàng thành công");

      // dispatch(getListUser());
    } else {
      const {  message } = res.data;

      dispatch({
        type: userConstants.UPDATE_USER_FAILURE,
        payload: {
          message: message,
        },
      });
      toast.error("cập nhật khách hàng thất bại");
    }
  };
};
