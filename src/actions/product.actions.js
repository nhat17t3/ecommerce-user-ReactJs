import axios from "../helpers/axios";
import { productConstants } from "../constants/product.constants";
import { toast } from "react-toastify";

export const getListProductByPage = (formData) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_PRODUCT_BY_PAGE_REQUEST });
    console.log("formData", formData)
    const res = await axios.post(`/api/products/list`,formData);

    if (res.status === 200) {
      const { result, message } = res.data;
      dispatch({
        type: productConstants.GET_PRODUCT_BY_PAGE_SUCCESS,
        payload: {
          dataResponse: result.content,
          message: message,
          pageNumber: result.pageNumber,
          pageSize :result.pageSize,
          totalElements: result.totalElements,
          totalPages: result.totalPages,
        },
      });

      // toast("get list product by page success");
    } else {
      const { message } = res.data;
      dispatch({
        type: productConstants.GET_PRODUCT_BY_PAGE_FAILURE,
        payload: {
          message: message,
        },
      });
      // toast("get list product by page error");
    }
  };
};

export const getProductById = (id) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_PRODUCT_BY_ID_REQUEST });
    const res = await axios.get(`/api/products/${id}`);

    if (res.status === 200) {
      const { result, message } = res.data;
      dispatch({
        type: productConstants.GET_PRODUCT_BY_ID_SUCCESS,
        payload: {
          dataResponse: result,
          message: message,
        },
      });

      // toast("get product by id success");
    } else {
      const { message } = res.data;
      dispatch({
        type: productConstants.GET_PRODUCT_BY_ID_FAILURE,
        payload: {
          message: message,
        },
      });
      // toast("get product by id error");
    }
  };
};


export const createProduct = (form) => {
  return async (dispatch) => {
    dispatch({
      type: productConstants.ADD_PRODUCT_REQUEST,
    });
    const res = await axios.post(`/api/products`, form);

    if (res.status === 201) {
      const { result, message } = res.data;

      dispatch({
        type: productConstants.ADD_PRODUCT_SUCCESS,
        payload: {
          dataResponse: result,
          message: message,
        },
      });
      toast.success("tạo sản phẩm thành công");
      // dispatch(getListProduct());
    } else {
      const {  message } = res.data;
      dispatch({
        type: productConstants.ADD_PRODUCT_FAILURE,
        payload: {
          message: message,
        },
      });

      toast.error("tạo sản phẩm thất bại");
    }
  };
};
export const deleteProduct = (form) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.DELETE_PRODUCT_REQUEST });
    const res = await axios.delete(`/api/products/${form.id}`);
    if (res.status === 200) {
      const { message } = res.data;

      dispatch({
        type: productConstants.DELETE_PRODUCT_SUCCESS,
        payload: {
          message: message,
        },
      });
      toast.success("xóa sản phẩm thành công");

      // dispatch(getListProductByPage());
    } else {
      const {  message } = res.data;

      dispatch({
        type: productConstants.DELETE_PRODUCT_FAILURE,
        payload: {
          message: message,
        },
      });
      toast.error("xóa sản phẩm thất bại");
    }
  };
};

export const updateProduct = (id,form) => {
  return async (dispatch) => {
    // const id = form.get("id");
    dispatch({ type: productConstants.UPDATE_PRODUCT_REQUEST });
    const res = await axios.put(`/api/products/${id}`, form);

    if (res.status === 200) {
      const { result, message } = res.data;

      dispatch({
        type: productConstants.UPDATE_PRODUCT_SUCCESS,
        payload: {
          dataResponse: result,
          message: message,
        },
      });
      toast.success("cập nhật sản phẩm thành công");

      // dispatch(getListProduct());
    } else {
      const {  message } = res.data;

      dispatch({
        type: productConstants.UPDATE_PRODUCT_FAILURE,
        payload: {
          message: message,
        },
      });
      toast.error("cập nhật sản phẩm thất bại");
    }
  };
};
