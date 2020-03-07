import { LOGIN_USER_REQUEST } from "./actionTypes";

export const loginUser = payload => {
  return {
    type: LOGIN_USER_REQUEST,
    payload
  };
};
