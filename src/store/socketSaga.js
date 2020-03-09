import { take, fork, call, put } from "redux-saga/effects";

function* subscriptionMessagesRequest() {
  const data = {
    query: `subscription{
        messages{
          id
          text
          users{
            name
            id
          }
        }
      }`
  };

  const subscriptionResponse = yield call(axios, get(API_URL, data));

  return subscriptionResponse;
}

export function* socketSaga() {
  yield take(FETCH_MESSAGES_REQUEST);
}
