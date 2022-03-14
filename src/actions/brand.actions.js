import axios from "../helpers/axios";
import { brandConstants } from "../constants/brand.constants";
import { toast } from "react-toastify";

export const getListBrand = () => {
  return async (dispatch) => {
    dispatch({ type: brandConstants.GET_ALL_BRAND_REQUEST });
    const res = await axios.get(`/api/brands`);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;
      dispatch({
        type: brandConstants.GET_ALL_BRAND_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      toast("get list brand success");
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: brandConstants.GET_ALL_BRAND_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast("get list brand error");
    }
  };
};

export const createBrand = (form) => {
  return async (dispatch) => {
    dispatch({
      type: brandConstants.ADD_BRAND_REQUEST,
    });
    const res = await axios.post(`/api/brands`, form);

    if (res.status === 201) {
      const { dataResponse, message } = res.data;

      dispatch({
        type: brandConstants.ADD_BRAND_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("tạo thương hiệu thành công");
      // dispatch(getListBrand());
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: brandConstants.ADD_BRAND_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      toast.error("tạo thương hiệu thất bại");
    }
  };
};
export const deleteBrand = (form) => {
  return async (dispatch) => {
    dispatch({ type: brandConstants.DELETE_BRAND_REQUEST });
    const res = await axios.delete(`/api/brands/${form.id}`);
    if (res.status === 200) {
      const { dataResponse, message } = res.data;

      dispatch({
        type: brandConstants.DELETE_BRAND_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("xóa thương hiệu thành công");

      dispatch(getListBrand());
    } else {
      const { dataResponse, message } = res.data;

      dispatch({
        type: brandConstants.DELETE_BRAND_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.error("xóa thương hiệu thất bại");
    }
  };
};

export const updateBrand = (id,form) => {
  return async (dispatch) => {
    // const id = form.get("id");
    dispatch({ type: brandConstants.UPDATE_BRAND_REQUEST });
    const res = await axios.put(`/api/brands/${id}`, form);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;

      dispatch({
        type: brandConstants.UPDATE_BRAND_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("cập nhật thương hiệu thành công");

      // dispatch(getListBrand());
    } else {
      const { dataResponse, message } = res.data;

      dispatch({
        type: brandConstants.UPDATE_BRAND_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.error("cập nhật thương hiệu thất bại");
    }
  };
};
