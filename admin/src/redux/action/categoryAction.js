import axios from "../../helper/axios";
import { CategoryActionTypes } from "../constant/action-type";

export const getCategory = () => {
  return async (dispatch) => {
    dispatch({ type: CategoryActionTypes.GET_CATEGORY_REQUEST });
    const res = await axios.get(`/admin/categories/index`);

    if (res.status === 200) {
      const { categoriesList } = res.data;
      dispatch({
        type: CategoryActionTypes.GET_CATEGORY_SUCCESS,
        payload: { categories: categoriesList },
      });
    } else {
      dispatch({
        type: CategoryActionTypes.GET_CATEGORY_FAILED,
        payload: { error: res.data.error },
      });
    }
  };
};

export const addCategory = (form) => {
  return async (dispatch) => {
    dispatch({ type: CategoryActionTypes.ADD_CATEGORY_REQUEST });
    const res = await axios.post(`/admin/categories/create`, form);
    console.log(res, "from action");

    if (res.status === 200) {
      const { categoriesList } = res.data;
      dispatch({
        type: CategoryActionTypes.ADD_CATEGORY_SUCCESS,
        payload: { categories: categoriesList },
      });
    } else {
      const { message } = res.data;
      if (res.status === 400) {
        dispatch({
          type: CategoryActionTypes.ADD_CATEGORY_FAILED,
          payload: { message },
        });
      }
      if (res.status === 422) {
        dispatch({
          type: CategoryActionTypes.ADD_CATEGORY_FAILED,
          payload: { message },
        });
      }
      dispatch({
        type: CategoryActionTypes.ADD_CATEGORY_FAILED,
        payload: { message },
      });
    }
  };
};
