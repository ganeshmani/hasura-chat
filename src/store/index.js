import { combineReducers } from "redux";

import { all, fork } from "redux-saga/effects";

import userReducer from "./user/reducer";
import userSaga from "./user/saga";

import messageReducer from "./messages/reducer";
import messageSaga from "./messages/saga";
export const createRootReducer = () =>
  combineReducers({
    users: userReducer,
    messages: messageReducer
  });
export function* rootSaga() {
  yield all([fork(userSaga), fork(messageSaga)]);
}
