import axios from "../helpers/axios";
import { authConstants } from "../constants/auth.constants";
import { toast } from "react-toastify";

export const login = (user) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.LOGIN_REQUEST,
    });

    const res = await axios.post(`/api/auth/login`, {
      ...user,
    });

    if (res.status === 200) {
        localStorage.setItem("accessToken", res.data.result.accessToken);
        localStorage.setItem("refreshToken", res.data.result.refreshToken);
        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: {
            accessToken: res.data.result.accessToken,
            message:res.data.message
          },
        });

        dispatch(getInformation({accessToken: res.data.result.accessToken}));
    } else {
          dispatch({
            type: authConstants.LOGIN_FAILURE,
            payload: {
              message: res.data.message
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
    dispatch({ type: authConstants.LOGOUT_REQUEST });
    const refreshToken= localStorage.getItem("refreshToken");
    const res = await axios.post(`/api/auth/logout?refreshToken=${refreshToken}`);
    if (res.status === 200) {
      localStorage.clear();
      dispatch({ type: authConstants.LOGOUT_SUCCESS });
    } else {
      dispatch({
        type: authConstants.LOGOUT_FAILURE,
        payload: {message : res.data.message },
      });
    }

    // localStorage.clear();
    // dispatch({ type: authConstants.LOGOUT_SUCCESS });
  };
};

export const signup = (user) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.REGISTER_REQUEST,
    });
    const res = await axios.post(`/api/auth/register`, {
      ...user,
    });

    if (res.status === 200) {
      // dispatch(getListAdmin());
      const { message } = res.data;
      dispatch({
        type: authConstants.REGISTER_SUCCESS,
        payload: { message },
      });
    } else {
        dispatch({
          type: authConstants.REGISTER_FAILURE,
          payload: { error: res.data.message },
        });
      
    }
  };
};

export const changeInformation = (id,data) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.CHANGE_INFORMATION_REQUEST });

    // const role = localStorage.getItem("role");
    const res = await axios.put(`/api/users/${id}`, data);

    if (res.status === 200) {
      const { message,result } = res.data;
      dispatch({
        type: authConstants.CHANGE_INFORMATION_SUCCESS,
        payload: {
          message: message,
          user: result
        },
      });

      // dispatch(getInformation());
    } else {
      const { message } = res.data;
      dispatch({
        type: authConstants.CHANGE_INFORMATION_FAILURE,
        payload: {
          error: message,
        },
      });
    }
  };
};

export const getInformation = (token) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.GET_INFORMATION_REQUEST });

    const res = await axios.post("/api/auth/getMyUserInfor", token);

    if (res.status === 200) {
      const user = res.data.result;
      dispatch({
        type: authConstants.GET_INFORMATION_SUCCESS,
        payload: {
          user: user,
          
        },
      });
    } else {
      const { message } = res.data;
      dispatch({
        type: authConstants.GET_INFORMATION_FAILURE,
        payload: {
          message: message,
        },
      });
    }
  };
};

export const changePassword = (pass) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.CHANGE_PASSWORD_REQUEST });

    const res = await axios.post(`/api/auth/updatePassword?newPassword=${pass.newPass}&oldPassword=${pass.oldPass}`);
    // const res = await axios.put(`admin/${data.id}/change-password`, { pass });
    if (res.status === 200) {
      const { message } = res.data.message;
      dispatch({
        type: authConstants.CHANGE_PASSWORD_SUCCESS,
        payload: {
          message: message,
        },
      });
      toast.success("cập nhật mật khẩu thành công")
    } else {
      const { message } = res.data.message;
      dispatch({
        type: authConstants.CHANGE_PASSWORD_FAILURE,
        payload: {
          error: message,
        },
      });
      toast.error("cập nhật mật khẩu thất bại")
    }
  };
};

export const loginGoogle = (user) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.LOGIN_REQUEST,
    });

    const res = await axios.post(`/api/auth/oauth2/login-success`, {
      ...user,
    });

    if (res.status === 200) {
        localStorage.setItem("accessToken", res.data.result.accessToken);
        localStorage.setItem("refreshToken", res.data.result.refreshToken);
        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: {
            accessToken: res.data.result.accessToken,
            message:res.data.message
          },
        });

        dispatch(getInformation({accessToken: res.data.result.accessToken}));
    } else {
          dispatch({
            type: authConstants.LOGIN_FAILURE,
            payload: {
              message: res.data.message
            },
          });
    }
  };
};