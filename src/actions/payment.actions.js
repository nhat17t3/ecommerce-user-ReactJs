import axios from "../helpers/axios";
import { paymentConstants } from "../constants/payment.constants";
import { toast } from "react-toastify";

export const getListPayment = () => {
  return async (dispatch) => {
    dispatch({ type: paymentConstants.GET_ALL_PAYMENT_REQUEST });
    const res = await axios.get(`/api/payments`);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;
      dispatch({
        type: paymentConstants.GET_ALL_PAYMENT_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      // toast("get list payment success");
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: paymentConstants.GET_ALL_PAYMENT_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      // toast("get list payment error");
    }
  };
};



export const createPayment = (form) => {
  return async (dispatch) => {
    dispatch({
      type: paymentConstants.ADD_PAYMENT_REQUEST,
    });
    const res = await axios.post(`/api/payments`, form);

    if (res.status === 201) {
      const { dataResponse, message } = res.data;

      dispatch({
        type: paymentConstants.ADD_PAYMENT_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("tạo phương thức thanh toán thành công");
      dispatch(getListPayment());
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: paymentConstants.ADD_PAYMENT_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      toast.error("tạo phương thức thanh toán thất bại");
    }
  };
};
export const deletePayment = (form) => {
  return async (dispatch) => {
    dispatch({ type: paymentConstants.DELETE_PAYMENT_REQUEST });
    const res = await axios.delete(`/api/payments/${form.id}`);
    if (res.status === 200) {
      const { dataResponse, message } = res.data;

      dispatch({
        type: paymentConstants.DELETE_PAYMENT_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("xóa phương thức thanh toán thành công");

      dispatch(getListPayment());
    } else {
      const { dataResponse, message } = res.data;

      dispatch({
        type: paymentConstants.DELETE_PAYMENT_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.error("xóa phương thức thanh toán thất bại");
    }
  };
};

export const updatePayment = (form) => {
  return async (dispatch) => {
    // const id = form.get("id");
    dispatch({ type: paymentConstants.UPDATE_PAYMENT_REQUEST });
    const res = await axios.put(`/api/payments/${form.id}`, form);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;

      dispatch({
        type: paymentConstants.UPDATE_PAYMENT_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("cập nhật phương thức thanh toán thành công");

      dispatch(getListPayment());
    } else {
      const { dataResponse, message } = res.data;

      dispatch({
        type: paymentConstants.UPDATE_PAYMENT_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.error("cập nhật phương thức thanh toán thất bại");
    }
  };
};
