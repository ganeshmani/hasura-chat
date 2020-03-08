import axios from "axios";
import { post } from "../../helpers/requests";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE
} from "./actionTypes";

import { API_URL } from "../../helpers/api";

function* loginUserApiRequest(payload) {
  const data = {
    query: `mutation {
            insert_users(objects:{name : "${payload.username}",password : "${payload.password}"}){
                returning {
                    id
                    name
                  }
            }
          }`
  };

  const loginResponse = yield call(axios, post(API_URL, data));

  return loginResponse;
}

function* loginUser(action) {
  try {
    const loginUserResponse = yield call(loginUserApiRequest, action.payload);
    console.log("loginUserResponse", loginUserResponse);
    if (loginUserResponse.status === 200) {
      yield put({
        type: LOGIN_USER_SUCCESS,
        payload: {
          success: true,
          data: loginUserResponse.data.data.insert_users.returning[0]
        }
      });
    }
  } catch (err) {
    console.log("Err", err);
    yield put({
      type: LOGIN_USER_FAILURE,
      payload: {
        success: false,
        data: null
      }
    });
  }
}

function* watchLoginRequest() {
  yield takeEvery(LOGIN_USER_REQUEST, loginUser);
}

function* userSaga() {
  yield all([fork(watchLoginRequest)]);
}

export default userSaga;
