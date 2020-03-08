import axios from "axios";
import { post } from "../../helpers/requests";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
  SUBMIT_MESSAGE_REQUEST,
  SUBMIT_MESSAGE_SUCCESS,
  SUBMIT_MESSAGE_FAILURE,
  FETCH_MESSAGES_REQUEST,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAILURE
} from "./actionTypes";

import { API_URL } from "../../helpers/api";

function* submitMessageApiRequest(payload) {
  const data = {
    query: `mutation {
        insert_messages(objects: {
          text :"${payload.text}"
          created_user : ${payload.userid}
        }){
          returning{
            text
            created_user
            user{
                name
                id
              }
            id
          }
        }
      }
      `
  };

  const submitMessageResponse = yield call(axios, post(API_URL, data));

  return submitMessageResponse;
}

function* fetchMessagesApiRequest(payload) {
  const data = {
    query: `query{
        messages{
          id
          text
          user{
            name
            id
          }
        }
      }`
  };

  const fetchMessagesResponse = yield call(axios, post(API_URL, data));
  return fetchMessagesResponse;
}

function* submitMessage(action) {
  try {
    const submitMessageResponse = yield call(
      submitMessageApiRequest,
      action.payload
    );
    console.log("submitMessageResponse", submitMessageResponse);
    if (submitMessageResponse.statusText === "OK") {
      yield put({
        type: SUBMIT_MESSAGE_SUCCESS,
        payload: {
          success: true,
          data: submitMessageResponse.data.data.insert_messages.returning[0]
        }
      });
    } else {
      yield put({
        type: SUBMIT_MESSAGE_FAILURE,
        payload: {
          success: false,
          data: null
        }
      });
    }
  } catch (err) {
    yield put({
      type: SUBMIT_MESSAGE_FAILURE,
      payload: {
        success: false,
        data: null
      }
    });
  }
}

function* fetchMessages() {
  try {
    const fetchMessagesResponse = yield call(fetchMessagesApiRequest);

    if (fetchMessagesResponse.statusText === "OK") {
      yield put({
        type: FETCH_MESSAGES_SUCCESS,
        payload: {
          success: true,
          data: fetchMessagesResponse.data
        }
      });
    } else {
      yield put({
        type: FETCH_MESSAGES_FAILURE,
        payload: {
          success: false,
          data: null
        }
      });
    }
  } catch (err) {
    yield put({
      type: FETCH_MESSAGES_FAILURE,
      payload: {
        success: false,
        data: null
      }
    });
  }
}

function* watchMessageRequest() {
  yield takeEvery(SUBMIT_MESSAGE_REQUEST, submitMessage);
}

function* watchFetchMessageRequest() {
  yield takeEvery(FETCH_MESSAGES_REQUEST, fetchMessages);
}

function* messageSaga() {
  yield all([fork(watchMessageRequest), fork(watchFetchMessageRequest)]);
}

export default messageSaga;
