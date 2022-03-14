import axios from "../helpers/axios";
import { userConstants } from "../constants/user.constants";
import { toast } from "react-toastify";

export const getListUserByPage = (limit=10,page=0) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.GET_USER_BY_PAGE_REQUEST });
    const res = await axios.get(`/api/users?limit=${limit}&page=${page}&sortBy=createdAt`);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;
      dispatch({
        type: userConstants.GET_USER_BY_PAGE_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      toast("get list user by page success");
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: userConstants.GET_USER_BY_PAGE_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast("get list user by page error");
    }
  };
};

export const getUserById = (id) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.GET_USER_BY_ID_REQUEST });
    const res = await axios.get(`/api/users/${id}`);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;
      dispatch({
        type: userConstants.GET_USER_BY_ID_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      toast("get user by id success");
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: userConstants.GET_USER_BY_ID_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast("get user by id error");
    }
  };
};

export const searchListUserByName = (key,limit,page) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.SEARCH_USER_BY_NAME_REQUEST });
    const res = await axios.get(`/api/users/search?key=${key}&limit=${limit}&page=${page}`);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;
      dispatch({
        type: userConstants.SEARCH_USER_BY_NAME_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      toast("search list user by name success");
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: userConstants.SEARCH_USER_BY_NAME_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast("search list user by name error");
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
      const { dataResponse, message } = res.data;

      dispatch({
        type: userConstants.ADD_USER_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("tạo người dùng thành công");
      // dispatch(getListUser());
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: userConstants.ADD_USER_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      toast.error("tạo người dùng thất bại");
    }
  };
};
export const deleteUser = (form) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.DELETE_USER_REQUEST });
    const res = await axios.delete(`/api/users/${form.id}`);
    if (res.status === 200) {
      const { dataResponse, message } = res.data;

      dispatch({
        type: userConstants.DELETE_USER_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("xóa người dùng thành công");

      // dispatch(getListUserByPage());
    } else {
      const { dataResponse, message } = res.data;

      dispatch({
        type: userConstants.DELETE_USER_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.error("xóa người dùng thất bại");
    }
  };
};

export const updateUser = (id,form) => {
  return async (dispatch) => {
    // const id = form.get("id");
    dispatch({ type: userConstants.UPDATE_USER_REQUEST });
    const res = await axios.put(`/api/users/${id}`, form);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;

      dispatch({
        type: userConstants.UPDATE_USER_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("cập nhật người dùng thành công");

      // dispatch(getListUser());
    } else {
      const { dataResponse, message } = res.data;

      dispatch({
        type: userConstants.UPDATE_USER_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.error("cập nhật người dùng thất bại");
    }
  };
};
