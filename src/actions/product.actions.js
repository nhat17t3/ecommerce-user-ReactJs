import axios from "../helpers/axios";
import { productConstants } from "../constants/product.constants";
import { toast } from "react-toastify";

export const getListProductByPage = (limit=10,page=0,brandId, sortBy) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_PRODUCT_BY_PAGE_REQUEST });
    const res = await axios.get(`/api/products/pro?limit=${limit}&page=${page}&sortBy=${sortBy}&brandId=${brandId}`);

    if (res.status === 200) {
      const { dataResponse, message,count } = res.data;
      dispatch({
        type: productConstants.GET_PRODUCT_BY_PAGE_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
          count : count,
        },
      });

      toast("get list product by page success");
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: productConstants.GET_PRODUCT_BY_PAGE_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
          
        },
      });
      toast("get list product by page error");
    }
  };
};

export const getProductById = (id) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_PRODUCT_BY_ID_REQUEST });
    const res = await axios.get(`/api/products/${id}`);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;
      dispatch({
        type: productConstants.GET_PRODUCT_BY_ID_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      toast("get product by id success");
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: productConstants.GET_PRODUCT_BY_ID_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast("get product by id error");
    }
  };
};

export const searchListProductByName = (key,limit,page) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.SEARCH_PRODUCT_BY_NAME_REQUEST });
    const res = await axios.get(`/api/products/search?key=${key}&limit=${limit}&page=${page}`);

    if (res.status === 200) {
      const { dataResponse, message,count } = res.data;
      dispatch({
        type: productConstants.SEARCH_PRODUCT_BY_NAME_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
          count : count,
        },
      });

      toast("search list product by name success");
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: productConstants.SEARCH_PRODUCT_BY_NAME_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast("search list product by name error");
    }
  };
};


export const filterProductByBrand = (brandId,limit,page) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.FILTER_PRODUCT_BY_BRAND_REQUEST });
    const res = await axios.get(`/api/products/brand/${brandId}?limit=${limit}&page=${page}`);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;
      dispatch({
        type: productConstants.FILTER_PRODUCT_BY_BRAND_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      toast("filter product by brand success");
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: productConstants.FILTER_PRODUCT_BY_BRAND_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast("filter product by brand error");
    }
  };
};


export const filterProductByCategory = (cateId,limit,page) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.FILTER_PRODUCT_BY_CATEGORY_REQUEST });
    const res = await axios.get(`/api/products/category/${cateId}?limit=${limit}&page=${page}`);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;
      dispatch({
        type: productConstants.FILTER_PRODUCT_BY_CATEGORY_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      toast("filter product by category success");
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: productConstants.FILTER_PRODUCT_BY_CATEGORY_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast("filter product by category error");
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
      const { dataResponse, message } = res.data;

      dispatch({
        type: productConstants.ADD_PRODUCT_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("tạo sản phẩm thành công");
      // dispatch(getListProduct());
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: productConstants.ADD_PRODUCT_FAILURE,
        payload: {
          dataResponse: dataResponse,
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
      const { dataResponse, message } = res.data;

      dispatch({
        type: productConstants.DELETE_PRODUCT_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("xóa sản phẩm thành công");

      // dispatch(getListProductByPage());
    } else {
      const { dataResponse, message } = res.data;

      dispatch({
        type: productConstants.DELETE_PRODUCT_FAILURE,
        payload: {
          dataResponse: dataResponse,
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
      const { dataResponse, message } = res.data;

      dispatch({
        type: productConstants.UPDATE_PRODUCT_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("cập nhật sản phẩm thành công");

      // dispatch(getListProduct());
    } else {
      const { dataResponse, message } = res.data;

      dispatch({
        type: productConstants.UPDATE_PRODUCT_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.error("cập nhật sản phẩm thất bại");
    }
  };
};
