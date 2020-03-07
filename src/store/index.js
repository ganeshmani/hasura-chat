import { combineReducers } from "redux";

import { all, fork } from "redux-saga/effects";

import userReducer from "./user/reducer";
import userSaga from "./user/saga";
export const createRootReducer = () =>
  combineReducers({
    users: userReducer
  });
export function* rootSaga() {
  yield all([fork(userSaga)]);
}
