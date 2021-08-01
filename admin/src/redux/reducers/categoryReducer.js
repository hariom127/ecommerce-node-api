import { CategoryActionTypes } from "../constant/action-type";

const initialState = {
  categories: [],
  loading: false,
  error: null,
  message: "",
};

// (state, action) --------destructure action------> (state, {type, payload})  -----------
export const categoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CategoryActionTypes.GET_CATEGORY_REQUEST:
      state = { ...state, loading: true };
      break;
    case CategoryActionTypes.GET_CATEGORY_SUCCESS:
      state = { ...state, loading: false, categories: payload.categories };
      break;
    case CategoryActionTypes.GET_CATEGORY_FAILED:
      state = { ...state, loading: false };
      break;

    default:
      return state;
  }
  return state;
};
