import { authConstants } from "../constants/auth.constants";

const initState = {
  token: null,
  user: {},
  authenticate: false,
  authenticating: false,
  loading: false,
  error: "",
  message: "",
};

export default (state = initState, action) => {
  console.log(action.type);
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        loading: true,
        authenticating: true,
      };
      break;
    case authConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        // user: action.payload.user,
        token: action.payload.token,
        loading: false,
        authenticate: true,
        authenticating: false,
      };
      break;
    case authConstants.LOGIN_FAILURE:
      state = {
        ...initState,
        error: action.payload.error,
      };
      break;
    // case authConstants.UPDATE_INFORMATION_SUCCESS:
    //   state = {
    //     ...state,
    //     message: "",
    //     error: "",
    //     user: action.payload.user,
    //     loading: false,
    //   };
    //   break;

    // case authConstants.LOGOUT_REQUEST:
    //   state = {
    //     ...state,
    //     loading: true,
    //   };
    //   break;
    case authConstants.LOGOUT_SUCCESS:
      state = {
        ...initState,
        message: "Logout Success",
      };
      break;
    // case authConstants.LOGOUT_FAILURE:
    //   state = {
    //     ...state,
    //     error: action.payload.error,
    //     loading: false,
    //   };
    //   break;
    case authConstants.REGISTER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authConstants.REGISTER_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: "User Register Successfully",
        error: "",
      };
      break;
    case authConstants.REGISTER_FAILURE:
      state = {
        ...state,
        loading: false,
        message: "",
        error: action.payload.error,
      };
      break;
    case authConstants.GET_INFORMATION_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authConstants.GET_INFORMATION_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        loading: false,
      };
      break;
    case authConstants.GET_INFORMATION_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;

      case authConstants.CHANGE_INFORMATION_REQUEST:
        state = {
          ...state,
          loading: true,
        };
        break;
      case authConstants.CHANGE_INFORMATION_SUCCESS:
        state = {
          ...state,
          user: action.payload.user,
          loading: false,
        };
        break;
      case authConstants.CHANGE_INFORMATION_FAILURE:
        state = {
          ...state,
          error: action.payload.message,
          loading: false,
        };
        break;

        case authConstants.CHANGE_PASSWORD_REQUEST:
          state = {
            ...state,
            loading: true,
          };
          break;
        case authConstants.CHANGE_PASSWORD_SUCCESS:
          state = {
            ...state,
            message : action.payload.message,
            loading: false,
          };
          break;
        case authConstants.CHANGE_PASSWORD_FAILURE:
          state = {
            ...state,
            error: action.payload.message,
            loading: false,
          };
          break;
  }
  return state;
};
