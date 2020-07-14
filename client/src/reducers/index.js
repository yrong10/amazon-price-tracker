import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import itemReducer from "./itemReducer";
import detailReducer from "./detailReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  items: itemReducer,
  details: detailReducer,
});
