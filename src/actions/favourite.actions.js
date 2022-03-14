import axios from "../helpers/axios";
import { favouriteConstants } from "../constants/favourite.constants";
import { toast } from "react-toastify";

export const filterFavouriteByUser = (userId) => {
  return async (dispatch) => {
    dispatch({ type: favouriteConstants.FILTER_FAVOURITE_BY_USER_REQUEST });
    const res = await axios.get(`/api/favourites/user/${userId}`);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;
      dispatch({
        type: favouriteConstants.FILTER_FAVOURITE_BY_USER_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      // toast("filter favourite by user success");
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: favouriteConstants.FILTER_FAVOURITE_BY_USER_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      // toast("filter favourite by user error");
    }
  };
};


export const createFavourite = (form) => {
  return async (dispatch) => {
    dispatch({
      type: favouriteConstants.ADD_FAVOURITE_REQUEST,
    });
    const res = await axios.post(`/api/favourites`, form);

    if (res.status === 201) {
      const { dataResponse, message } = res.data;

      dispatch({
        type: favouriteConstants.ADD_FAVOURITE_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("tạo yêu thích thành công");
      // dispatch(getListFavourite());
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: favouriteConstants.ADD_FAVOURITE_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      toast.error("tạo yêu thích thất bại");
    }
  };
};
export const deleteFavourite = (form) => {
  return async (dispatch) => {
    dispatch({ type: favouriteConstants.DELETE_FAVOURITE_REQUEST });
    const res = await axios.delete(`/api/favourites`, {data : form});
    if (res.status === 200) {
      const { dataResponse, message } = res.data;

      dispatch({
        type: favouriteConstants.DELETE_FAVOURITE_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("xóa yêu thích thành công");

      // dispatch(getListFavouriteByPage());
    } else {
      const { dataResponse, message } = res.data;

      dispatch({
        type: favouriteConstants.DELETE_FAVOURITE_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.error("xóa yêu thích thất bại");
    }
  };
};