import createReducers from "../../helpers/createReducers";

const initialState = {
  id: "",
  name: ""
};

export default createReducers(initialState, {
  LOGIN_USER_SUCCESS: (state, action) => {
    console.log("action.payload", action.payload);
    let id = action.payload.data.id;
    let name = action.payload.data.name;
    return {
      ...state,
      id,
      name
    };
  }
});
