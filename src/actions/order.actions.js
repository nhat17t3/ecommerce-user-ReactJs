import axios from "../helpers/axios";
import { orderConstants } from "../constants/order.constants";
import { toast } from "react-toastify";

export const getListOrderByPage = (formData) => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.GET_ORDER_BY_PAGE_REQUEST });
    console.log("formData", formData)
    const res = await axios.post(`/api/orders/list`,formData);

    if (res.status === 200) {
      const { result, message } = res.data;
      dispatch({
        type: orderConstants.GET_ORDER_BY_PAGE_SUCCESS,
        payload: {
          dataResponse: result.content,
          message: message,
          pageNumber: result.pageNumber,
          pageSize :result.pageSize,
          totalElements: result.totalElements,
          totalPages: result.totalPages,
        },
      });

      // toast("get list order by page success");
    } else {
      const { message } = res.data;
      dispatch({
        type: orderConstants.GET_ORDER_BY_PAGE_FAILURE,
        payload: {
          message: message,
        },
      });
      // toast("get list order by page error");
    }
  };
};

export const getOrderById = (id) => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.GET_ORDER_BY_ID_REQUEST });
    const res = await axios.get(`/api/orders/${id}`);

    if (res.status === 200) {
      const { result, message } = res.data;
      dispatch({
        type: orderConstants.GET_ORDER_BY_ID_SUCCESS,
        payload: {
          dataResponse: result,
          message: message,
        },
      });

      // toast("get order by id success");
    } else {
      const { message } = res.data;
      dispatch({
        type: orderConstants.GET_ORDER_BY_ID_FAILURE,
        payload: {
          message: message,
        },
      });
      // toast("get order by id error");
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
      const { result, message } = res.data;

      dispatch({
        type: orderConstants.ADD_ORDER_SUCCESS,
        payload: {
          dataResponse: result,
          message: message,
        },
      });
      toast.success("tạo đơn hàng thành công");
      // dispatch(getListOrder());
    } else {
      const {  message } = res.data;
      dispatch({
        type: orderConstants.ADD_ORDER_FAILURE,
        payload: {
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
      const { message } = res.data;

      dispatch({
        type: orderConstants.DELETE_ORDER_SUCCESS,
        payload: {
          message: message,
        },
      });
      toast.success("xóa đơn hàng thành công");

      // dispatch(getListOrderByPage());
    } else {
      const {  message } = res.data;

      dispatch({
        type: orderConstants.DELETE_ORDER_FAILURE,
        payload: {
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
      const { result, message } = res.data;

      dispatch({
        type: orderConstants.UPDATE_ORDER_SUCCESS,
        payload: {
          dataResponse: result,
          message: message,
        },
      });
      toast.success("cập nhật đơn hàng thành công");

      // dispatch(getListOrder());
    } else {
      const {  message } = res.data;

      dispatch({
        type: orderConstants.UPDATE_ORDER_FAILURE,
        payload: {
          message: message,
        },
      });
      toast.error("cập nhật đơn hàng thất bại");
    }
  };
};

export const updateOrderStatus = (id,form) => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.UPDATE_ORDER_REQUEST });
    const res = await axios.put(`/api/orders/${id}/status`, form);

    if (res.status === 200) {
      const { message } = res.data;

      dispatch({
        type: orderConstants.UPDATE_ORDER_SUCCESS,
        payload: {
          message: message,
        },
      });
      toast.success("cập nhật đơn hàng thành công");

      dispatch(getOrderById(id));
    } else {
      const {  message } = res.data;

      dispatch({
        type: orderConstants.UPDATE_ORDER_FAILURE,
        payload: {
          message: message,
        },
      });
      toast.error("cập nhật đơn hàng thất bại");
    }
  };
};

export const updateAllOrderStatusFromTracking = () => {
  return async (dispatch) => {
    // const id = form.get("id");
    dispatch({ type: orderConstants.GET_ALL_STATUS_TRACKING_ORDER_REQUEST });
    const res = await axios.post(`/api/orders/update-all-status-from-tracking`);

    if (res.status === 200) {
      const { message } = res.data;

      dispatch({
        type: orderConstants.GET_ALL_STATUS_TRACKING_ORDER_SUCCESS,
        payload: {
          message: message,
        },
      });
      toast.success("cập nhật trạng thái tất cả đơn hàng thành công");

      // dispatch(getListOrder());
    } else {
      const {  message } = res.data;

      dispatch({
        type: orderConstants.GET_ALL_STATUS_TRACKING_ORDER_FAILURE,
        payload: {
          message: message,
        },
      });
      toast.error("cập nhật trạng thái tất cả đơn hàng thất bại");
    }
  };
};

export const updateTrackingNumberForOrder = (orderId , formData) => {
  return async (dispatch) => {
    // const id = form.get("id");
    dispatch({ type: orderConstants.GET_ALL_STATUS_TRACKING_ORDER_REQUEST });
    const res = await axios.put(`/api/orders/${orderId}/tracking`, formData);

    if (res.status === 200) {
      const { message } = res.data;

      dispatch({
        type: orderConstants.GET_ALL_STATUS_TRACKING_ORDER_SUCCESS,
        payload: {
          message: message,
        },
      });
      toast.success("cập nhật trạng thái tất cả đơn hàng thành công");

      // dispatch(getListOrder());
    } else {
      const {  message } = res.data;

      dispatch({
        type: orderConstants.GET_ALL_STATUS_TRACKING_ORDER_FAILURE,
        payload: {
          message: message,
        },
      });
      toast.error("cập nhật trạng thái tất cả đơn hàng thất bại");
    }
  };
};
