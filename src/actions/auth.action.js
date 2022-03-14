import axios from "../helpers/axios";
import { authConstants } from "../constants/auth.constants";
import { toast } from "react-toastify";

export const login = (user) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.LOGIN_REQUEST,
    });

    const res = await axios.post(`/api/auth/signin`, {
      ...user,
    });

    try {
      if (res.status === 201) {
        const token = res.data.dataResponse;
        localStorage.setItem("token", token);

        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: {
            token: token,
          },
        });
        dispatch(getInformation({ token }));
      } else {
        if (res.status === 400) {
          dispatch({
            type: authConstants.LOGIN_FAILURE,
            payload: {
              error: "login failed",
            },
          });
        }
      }
    } catch (error) {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: {
          error: "Server error",
        },
      });
    }
  };
};

// export const isAdminLoggedIn = () => {
//   return async (dispatch) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       // const user = JSON.parse(localStorage.getItem("user"));
//       dispatch({
//         type: authConstants.LOGIN_SUCCESS,
//         payload: {
//           token
//         },
//       });
//       dispatch(getInformation());
//     } else {
//       dispatch({
//         type: authConstants.LOGIN_FAILURE,
//         payload: {
//           error: " Please login first",
//         },
//       });
//     }
//   };
// };

export const logout = () => {
  return async (dispatch) => {
    // dispatch({ type: authConstants.LOGOUT_REQUEST });
    // const res = await axios.post(`/admin/signout`);
    // console.log("Logout",res)
    // if (res.status === 200) {
    //   localStorage.clear();
    //   dispatch({ type: authConstants.LOGOUT_SUCCESS });
    // } else {
    //   dispatch({
    //     type: authConstants.LOGOUT_FAILURE,
    //     payload: res.data.error,
    //   });
    // }

    localStorage.removeItem("token");
    dispatch({ type: authConstants.LOGOUT_SUCCESS });
  };
};

export const signup = (user) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.REGISTER_REQUEST,
    });
    const res = await axios.post(`/api/auth/signup`, {
      ...user,
    });

    if (res.status === 201) {
      // dispatch(getListAdmin());
      const { message } = res.data;
      dispatch({
        type: authConstants.REGISTER_SUCCESS,
        payload: { message },
      });
      toast.success("Chúc mừng bạn đã đăng kí thành công")
    } else {
      dispatch({
        type: authConstants.REGISTER_FAILURE,
        payload: { error: res.data.message },
      });
      toast.error("Đăng kí thất bại")
    }
  };
};

export const changeInformation = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.CHANGE_INFORMATION_REQUEST });

    // const role = localStorage.getItem("role");
    const res = await axios.put(`/api/users/${id}`, data);

    if (res.status === 200) {
      const { message, dataResponse } = res.data;
      dispatch({
        type: authConstants.CHANGE_INFORMATION_SUCCESS,
        payload: {
          message: message,
          user: dataResponse,
        },
      });

      toast.success("cập nhật thông tin thành công")

      // dispatch(getInformation());
    } else {
      const { message } = res.data;
      dispatch({
        type: authConstants.CHANGE_INFORMATION_FAILURE,
        payload: {
          error: message,
        },
      });
      toast.error("cập nhật thông tin thất bại")
    }
  };
};

export const getInformation = (token) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.GET_INFORMATION_REQUEST });

    const res = await axios.post("/api/auth/getInfor", token);

    if (res.status === 200) {
      const user = res.data.dataResponse;
      dispatch({
        type: authConstants.GET_INFORMATION_SUCCESS,
        payload: {
          user: user,
          message: res.data.message,
        },
      });
    } else {
      const { message } = res.data;
      dispatch({
        type: authConstants.GET_INFORMATION_FAILURE,
        payload: {
          error: message,
        },
      });
    }
  };
};

export const changePassword = (pass) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.CHANGE_PASSWORD_REQUEST });

    const res = await axios.put(`/api/auth/password`, pass);
    // const res = await axios.put(`admin/${data.id}/change-password`, { pass });
    if (res.status === 200) {
      const { message } = res.data.message;
      dispatch({
        type: authConstants.CHANGE_PASSWORD_SUCCESS,
        payload: {
          message: message,
        },
      });
    } else {
      const { message } = res.data.message;
      dispatch({
        type: authConstants.CHANGE_PASSWORD_FAILURE,
        payload: {
          error: message,
        },
      });
    }
  };
};
