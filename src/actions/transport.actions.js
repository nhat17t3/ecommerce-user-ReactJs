import axios from "../helpers/axios";
import { transportConstants } from "../constants/transport.constants";
import { toast } from "react-toastify";

export const getListTransportByPage = (limit=10,page=0) => {
  return async (dispatch) => {
    dispatch({ type: transportConstants.GET_TRANSPORT_BY_PAGE_REQUEST });
    const res = await axios.get(`/api/transports?limit=${limit}&page=${page}&sortBy=createdAt`);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;
      dispatch({
        type: transportConstants.GET_TRANSPORT_BY_PAGE_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      toast("get list transport by page success");
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: transportConstants.GET_TRANSPORT_BY_PAGE_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast("get list transport by page error");
    }
  };
};

export const getTransportById = (id) => {
  return async (dispatch) => {
    dispatch({ type: transportConstants.GET_TRANSPORT_BY_ID_REQUEST });
    const res = await axios.get(`/api/transports/${id}`);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;
      dispatch({
        type: transportConstants.GET_TRANSPORT_BY_ID_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      toast("get transport by id success");
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: transportConstants.GET_TRANSPORT_BY_ID_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast("get transport by id error");
    }
  };
};

export const searchListTransportByCode = (key,limit,page) => {
  return async (dispatch) => {
    dispatch({ type: transportConstants.SEARCH_TRANSPORT_BY_CODE_REQUEST });
    const res = await axios.get(`/api/transports/search?key=${key}&limit=${limit}&page=${page}`);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;
      dispatch({
        type: transportConstants.SEARCH_TRANSPORT_BY_CODE_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      toast("search list transport by code success");
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: transportConstants.SEARCH_TRANSPORT_BY_CODE_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast("search list transport by code error");
    }
  };
};



export const createTransport = (form) => {
  return async (dispatch) => {
    dispatch({
      type: transportConstants.ADD_TRANSPORT_REQUEST,
    });
    const res = await axios.post(`/api/transports`, form);

    if (res.status === 201) {
      const { dataResponse, message } = res.data;

      dispatch({
        type: transportConstants.ADD_TRANSPORT_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("tạo vận đơn thành công");
      // dispatch(getListTransport());
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: transportConstants.ADD_TRANSPORT_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      toast.error("tạo vận đơn thất bại");
    }
  };
};
export const deleteTransport = (form) => {
  return async (dispatch) => {
    dispatch({ type: transportConstants.DELETE_TRANSPORT_REQUEST });
    const res = await axios.delete(`/api/transports/${form.id}`);
    if (res.status === 200) {
      const { dataResponse, message } = res.data;

      dispatch({
        type: transportConstants.DELETE_TRANSPORT_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("xóa vận đơn thành công");

      // dispatch(getListTransportByPage());
    } else {
      const { dataResponse, message } = res.data;

      dispatch({
        type: transportConstants.DELETE_TRANSPORT_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.error("xóa vận đơn thất bại");
    }
  };
};

export const updateTransport = (id,form) => {
  return async (dispatch) => {
    // const id = form.get("id");
    dispatch({ type: transportConstants.UPDATE_TRANSPORT_REQUEST });
    const res = await axios.put(`/api/transports/${id}`, form);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;

      dispatch({
        type: transportConstants.UPDATE_TRANSPORT_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("cập nhật vận đơn thành công");

      // dispatch(getListTransport());
    } else {
      const { dataResponse, message } = res.data;

      dispatch({
        type: transportConstants.UPDATE_TRANSPORT_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.error("cập nhật vận đơn thất bại");
    }
  };
};
