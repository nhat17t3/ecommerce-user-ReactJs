import axios from "../helpers/axios";
import { feedbackConstants } from "../constants/feedback.constants";
import { toast } from "react-toastify";

export const getListFeedbackByPage = (limit=10,page=0) => {
  return async (dispatch) => {
    dispatch({ type: feedbackConstants.GET_FEEDBACK_BY_PAGE_REQUEST });
    const res = await axios.get(`/api/feedbacks?limit=${limit}&page=${page}&sortBy=createdAt`);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;
      dispatch({
        type: feedbackConstants.GET_FEEDBACK_BY_PAGE_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      // toast("get list feedback by page success");
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: feedbackConstants.GET_FEEDBACK_BY_PAGE_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      // toast("get list feedback by page error");
    }
  };
};

export const getFeedbackById = (id) => {
  return async (dispatch) => {
    dispatch({ type: feedbackConstants.GET_FEEDBACK_BY_ID_REQUEST });
    const res = await axios.get(`/api/feedbacks/${id}`);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;
      dispatch({
        type: feedbackConstants.GET_FEEDBACK_BY_ID_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      // toast("get feedback by id success");
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: feedbackConstants.GET_FEEDBACK_BY_ID_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      // toast("get feedback by id error");
    }
  };
};

// export const filterFeedbackIsRead = (isRead,limit,page) => {
//   return async (dispatch) => {
//     dispatch({ type: feedbackConstants.FILTER_FEEDBACK_BY_BRAND_REQUEST });
//     const res = await axios.get(`/api/feedbacks/brand/${brandId}?limit=${limit}&page=${page}`);

//     if (res.status === 200) {
//       const { dataResponse, message } = res.data;
//       dispatch({
//         type: feedbackConstants.FILTER_FEEDBACK_BY_BRAND_SUCCESS,
//         payload: {
//           dataResponse: dataResponse,
//           message: message,
//         },
//       });

//       toast("filter feedback by brand success");
//     } else {
//       const { dataResponse, message } = res.data;
//       dispatch({
//         type: feedbackConstants.FILTER_FEEDBACK_BY_BRAND_FAILURE,
//         payload: {
//           dataResponse: dataResponse,
//           message: message,
//         },
//       });
//       toast("filter feedback by brand error");
//     }
//   };
// };


export const createFeedback = (form) => {
  return async (dispatch) => {
    dispatch({
      type: feedbackConstants.ADD_FEEDBACK_REQUEST,
    });
    const res = await axios.post(`/api/feedbacks`, form);

    if (res.status === 201) {
      const { dataResponse, message } = res.data;

      dispatch({
        type: feedbackConstants.ADD_FEEDBACK_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("tạo feedback thành công");
      // dispatch(getListFeedback());
    } else {
      const { dataResponse, message } = res.data;
      dispatch({
        type: feedbackConstants.ADD_FEEDBACK_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      toast.error("tạo feedback thất bại");
    }
  };
};
export const deleteFeedback = (form) => {
  return async (dispatch) => {
    dispatch({ type: feedbackConstants.DELETE_FEEDBACK_REQUEST });
    const res = await axios.delete(`/api/feedbacks/${form.id}`);
    if (res.status === 200) {
      const { dataResponse, message } = res.data;

      dispatch({
        type: feedbackConstants.DELETE_FEEDBACK_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("xóa feedback thành công");

      // dispatch(getListFeedbackByPage());
    } else {
      const { dataResponse, message } = res.data;

      dispatch({
        type: feedbackConstants.DELETE_FEEDBACK_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.error("xóa feedback thất bại");
    }
  };
};

export const updateFeedback = (id,form) => {
  return async (dispatch) => {
    // const id = form.get("id");
    dispatch({ type: feedbackConstants.UPDATE_FEEDBACK_REQUEST });
    const res = await axios.put(`/api/feedbacks/${id}`, form);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;

      dispatch({
        type: feedbackConstants.UPDATE_FEEDBACK_SUCCESS,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.success("cập nhật feedback thành công");

      // dispatch(getListFeedback());
    } else {
      const { dataResponse, message } = res.data;

      dispatch({
        type: feedbackConstants.UPDATE_FEEDBACK_FAILURE,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });
      toast.error("cập nhật feedback thất bại");
    }
  };
};
