import { combineReducers } from "redux";
// import { productReducer, selectedProductReducer } from "./productReducer";
import { authReducer } from "./authReducer";

const reducers = combineReducers({
  // allProducts: productReducer,
  // product: selectedProductReducer,
  login: authReducer,
});
export default reducers;
