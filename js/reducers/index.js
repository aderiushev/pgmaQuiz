import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import drawer from "./drawer";
import user from "./user";
import test from "./test";
import train from "./train";
import exam from "./exam";

export default combineReducers({
  form: formReducer,
  drawer,
  user,
  test,
  train,
  exam
});
