import { SUBMIT_MESSAGE_REQUEST, FETCH_MESSAGES_REQUEST } from "./actionTypes";

export const submitMessage = payload => {
  return {
    type: SUBMIT_MESSAGE_REQUEST,
    payload
  };
};

export const fetchMessages = () => {
  return {
    type: FETCH_MESSAGES_REQUEST
  };
};
