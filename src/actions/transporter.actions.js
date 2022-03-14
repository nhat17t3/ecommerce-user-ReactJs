import axios from "../helpers/axios";
import { transporterConstants } from "../constants/transporter.constants";
import { toast } from "react-toastify";

export const getListTransporter = () => {
  return async (dispatch) => {
    dispatch({ type: transporterConstants.GET_ALL_TRANSPORTER_REQUEST });
    const res = await axios.get(`/api/transporters`);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;
      dispatch({
        type: transporterConstants.GET_ALL_TRANSPORTER_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      toast("get list transporter success");
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: transporterConstants.GET_ALL_TRANSPORTER_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast("get list transporter error");
    }
  };
};

export const getTransporterById = (id) => {
  return async (dispatch) => {
    dispatch({ type: transporterConstants.GET_TRANSPORTER_BY_ID_REQUEST });
    const res = await axios.get(`/api/transporters/${id}`);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;
      dispatch({
        type: transporterConstants.GET_TRANSPORTER_BY_ID_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      toast("get transporter by id success");
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: transporterConstants.GET_TRANSPORTER_BY_ID_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast("get transporter by id error");
    }
  };
};

export const createTransporter = (form) => {
  return async (dispatch) => {
    dispatch({
      type: transporterConstants.ADD_TRANSPORTER_REQUEST,
    });
    const res = await axios.post(`/api/transporters`, form);

    if (res.status === 201) {
      const { dataResponse, message } = res.data;

      dispatch({
        type: transporterConstants.ADD_TRANSPORTER_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("tạo đơn vị vận chuyển thành công");
      // dispatch(getListTransporter());
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: transporterConstants.ADD_TRANSPORTER_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      toast.error("tạo đơn vị vận chuyển thất bại");
    }
  };
};
export const deleteTransporter = (form) => {
  return async (dispatch) => {
    dispatch({ type: transporterConstants.DELETE_TRANSPORTER_REQUEST });
    const res = await axios.delete(`/api/transporters/${form.id}`);
    if (res.status === 200) {
      const { dataResponse, message } = res.data;

      dispatch({
        type: transporterConstants.DELETE_TRANSPORTER_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("xóa đơn vị vận chuyển thành công");

      dispatch(getListTransporter());
    } else {
      const { dataResponse, message } = res.data;

      dispatch({
        type: transporterConstants.DELETE_TRANSPORTER_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.error("xóa đơn vị vận chuyển thất bại");
    }
  };
};

export const updateTransporter = (id,form) => {
  return async (dispatch) => {
    // const id = form.get("id");
    dispatch({ type: transporterConstants.UPDATE_TRANSPORTER_REQUEST });
    const res = await axios.put(`/api/transporters/${id}`, form);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;

      dispatch({
        type: transporterConstants.UPDATE_TRANSPORTER_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("cập nhật đơn vị vận chuyển thành công");

      // dispatch(getListTransporter());
    } else {
      const { dataResponse, message } = res.data;

      dispatch({
        type: transporterConstants.UPDATE_TRANSPORTER_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.error("cập nhật đơn vị vận chuyển thất bại");
    }
  };
};
