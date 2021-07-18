import axios from "../../helper/axios";
import { ActionTypes } from "../constant/action-type";

export const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.LOGIN_REQUEST, payload: user });
    const res = await axios.post(`/admin/login`, {
      ...user, //Spread oprater
    });

    if (res.status === 200) {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: { token, user } });
    } else {
      if (res.status === 400) {
        dispatch({
          type: ActionTypes.LOGIN_FAILER,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

export const isUserLogedIn = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: { token, user } });
    } else {
      dispatch({
        type: ActionTypes.LOGIN_FAILER,
        payload: { error: "Login failed" },
      });
    }
  };
};
