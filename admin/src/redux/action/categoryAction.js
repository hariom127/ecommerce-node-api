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
