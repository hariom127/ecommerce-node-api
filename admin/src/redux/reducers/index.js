import { combineReducers } from "redux";
// import { productReducer, selectedProductReducer } from "./productReducer";
import { authReducer } from "./authReducer";
import { categoryReducer } from "./categoryReducer";

const reducers = combineReducers({
  login: authReducer,
  category: categoryReducer,
});
export default reducers;
