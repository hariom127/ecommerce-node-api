import { ActionTypes } from "../constant/action-type";

const initialState = {
  token: null,
  user: {
    firstName: "",
    lastName: "",
    email: "",
  },
  authenticate: false,
  authenticating: false,
};
// (state, action) --------destructure action------> (state, {type, payload})  -----------
export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.LOGIN_REQUEST:
      return (state = { ...state, authenticating: true });
    case ActionTypes.LOGIN_SUCCESS:
      return (state = {
        ...state,
        user: payload.user,
        token: payload.token,
        authenticate: true,
        authenticating: false,
      });
    case ActionTypes.LOGIN_FAILER:
      return { ...state, error: payload.error, authenticating: false };
    default:
      return state;
  }
};
