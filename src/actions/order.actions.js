import axios from "../helpers/axios";
import { orderConstants } from "../constants/order.constants";
import { toast } from "react-toastify";

export const getListOrderByPage = (limit=10,page=0) => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.GET_ORDER_BY_PAGE_REQUEST });
    const res = await axios.get(`/api/orders?limit=${limit}&page=${page}&sortBy=createdAt`);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;
      dispatch({
        type: orderConstants.GET_ORDER_BY_PAGE_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      toast("get list order by page success");
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: orderConstants.GET_ORDER_BY_PAGE_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast("get list order by page error");
    }
  };
};

export const getOrderById = (id) => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.GET_ORDER_BY_ID_REQUEST });
    const res = await axios.get(`/api/orders/${id}`);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;
      dispatch({
        type: orderConstants.GET_ORDER_BY_ID_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      toast("get order by id success");
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: orderConstants.GET_ORDER_BY_ID_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast("get order by id error");
    }
  };
};

export const searchListOrderByName = (key,limit,page) => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.SEARCH_ORDER_BY_NAME_REQUEST });
    const res = await axios.get(`/api/orders/search?key=${key}&limit=${limit}&page=${page}`);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;
      dispatch({
        type: orderConstants.SEARCH_ORDER_BY_NAME_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      toast("search list order by name success");
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: orderConstants.SEARCH_ORDER_BY_NAME_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast("search list order by name error");
    }
  };
};


export const filterOrderByUser = (userId) => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.FILTER_ORDER_BY_USER_REQUEST });
    const res = await axios.get(`/api/orders/user/${userId}`);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;
      dispatch({
        type: orderConstants.FILTER_ORDER_BY_USER_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      toast("filter order by user success");
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: orderConstants.FILTER_ORDER_BY_USER_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast("filter order by user error");
    }
  };
};

export const filterOrderByStatus = (status,limit,page) => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.FILTER_ORDER_BY_STATUS_REQUEST });
    const res = await axios.get(`/api/orders?status=${status}?limit=${limit}&page=${page}`);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;
      dispatch({
        type: orderConstants.FILTER_ORDER_BY_STATUS_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      toast("filter order by status success");
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: orderConstants.FILTER_ORDER_BY_STATUS_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast("filter order by status error");
    }
  };
};


export const createOrder = (form) => {
  return async (dispatch) => {
    dispatch({
      type: orderConstants.ADD_ORDER_REQUEST,
    });
    const res = await axios.post(`/api/orders`, form);

    if (res.status === 201) {
      const { dataResponse, message } = res.data;

      dispatch({
        type: orderConstants.ADD_ORDER_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("tạo đơn hàng thành công");
      // dispatch(getListOrder());
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: orderConstants.ADD_ORDER_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      toast.error("tạo đơn hàng thất bại");
    }
  };
};
export const deleteOrder = (form) => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.DELETE_ORDER_REQUEST });
    const res = await axios.delete(`/api/orders/${form.id}`);
    if (res.status === 200) {
      const { dataResponse, message } = res.data;

      dispatch({
        type: orderConstants.DELETE_ORDER_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("xóa đơn hàng thành công");

      // dispatch(getListOrderByPage());
    } else {
      const { dataResponse, message } = res.data;

      dispatch({
        type: orderConstants.DELETE_ORDER_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.error("xóa đơn hàng thất bại");
    }
  };
};

export const updateOrder = (id,form) => {
  return async (dispatch) => {
    // const id = form.get("id");
    dispatch({ type: orderConstants.UPDATE_ORDER_REQUEST });
    const res = await axios.put(`/api/orders/${id}`, form);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;

      dispatch({
        type: orderConstants.UPDATE_ORDER_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("cập nhật đơn hàng thành công");

      // dispatch(getListOrderByPage(100,0));
    } else {
      const { dataResponse, message } = res.data;

      dispatch({
        type: orderConstants.UPDATE_ORDER_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.error("cập nhật đơn hàng thất bại");
    }
  };
};
