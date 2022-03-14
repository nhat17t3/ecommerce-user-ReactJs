import axios from "../helpers/axios";
import { voucherConstants } from "../constants/voucher.constants";
import { toast } from "react-toastify";

export const getListVoucherByPage = (limit=10,page=0) => {
  return async (dispatch) => {
    dispatch({ type: voucherConstants.GET_VOUCHER_BY_PAGE_REQUEST });
    const res = await axios.get(`/api/vouchers?limit=${limit}&page=${page}&sortBy=createdAt`);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;
      dispatch({
        type: voucherConstants.GET_VOUCHER_BY_PAGE_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      toast("get list voucher by page success");
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: voucherConstants.GET_VOUCHER_BY_PAGE_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast("get list voucher by page error");
    }
  };
};

export const searchListVoucherByName = (key,limit,page) => {
  return async (dispatch) => {
    dispatch({ type: voucherConstants.SEARCH_VOUCHER_BY_NAME_REQUEST });
    const res = await axios.get(`/api/vouchers/search?key=${key}&limit=${limit}&page=${page}`);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;
      dispatch({
        type: voucherConstants.SEARCH_VOUCHER_BY_NAME_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      toast("search list voucher by name success");
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: voucherConstants.SEARCH_VOUCHER_BY_NAME_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast("search list voucher by name error");
    }
  };
};

export const getVoucherById = (id) => {
  return async (dispatch) => {
    dispatch({ type: voucherConstants.GET_VOUCHER_BY_ID_REQUEST });
    const res = await axios.get(`/api/vouchers/${id}`);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;
      dispatch({
        type: voucherConstants.GET_VOUCHER_BY_ID_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      toast("get voucher by id success");
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: voucherConstants.GET_VOUCHER_BY_ID_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast("get voucher by id error");
    }
  };
};


export const createVoucher = (form) => {
  return async (dispatch) => {
    dispatch({
      type: voucherConstants.ADD_VOUCHER_REQUEST,
    });
    const res = await axios.post(`/api/vouchers`, form);

    if (res.status === 201) {
      const { dataResponse, message } = res.data;

      dispatch({
        type: voucherConstants.ADD_VOUCHER_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("tạo mã giảm giá thành công");
      // dispatch(getListVoucher());
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: voucherConstants.ADD_VOUCHER_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      toast.error("tạo mã giảm giá thất bại");
    }
  };
};
export const deleteVoucher = (form) => {
  return async (dispatch) => {
    dispatch({ type: voucherConstants.DELETE_VOUCHER_REQUEST });
    const res = await axios.delete(`/api/vouchers/${form.id}`);
    if (res.status === 200) {
      const { dataResponse, message } = res.data;

      dispatch({
        type: voucherConstants.DELETE_VOUCHER_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("xóa mã giảm giá thành công");

      // dispatch(getListVoucherByPage());
    } else {
      const { dataResponse, message } = res.data;

      dispatch({
        type: voucherConstants.DELETE_VOUCHER_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.error("xóa mã giảm giá thất bại");
    }
  };
};

export const updateVoucher = (id,form) => {
  return async (dispatch) => {
    // const id = form.get("id");
    dispatch({ type: voucherConstants.UPDATE_VOUCHER_REQUEST });
    const res = await axios.put(`/api/vouchers/${id}`, form);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;

      dispatch({
        type: voucherConstants.UPDATE_VOUCHER_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("cập nhật mã giảm giá thành công");

      // dispatch(getListVoucher());
    } else {
      const { dataResponse, message } = res.data;

      dispatch({
        type: voucherConstants.UPDATE_VOUCHER_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.error("cập nhật mã giảm giá thất bại");
    }
  };
};
