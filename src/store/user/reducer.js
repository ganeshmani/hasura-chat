import createReducers from "../../helpers/createReducers";

const initialState = {
  id: "",
  name: ""
};

export default createReducers(initialState, {
  LOGIN_USER_SUCCESS: (state, action) => {
    console.log("success", action);
    let id = action.payload.data.id;
    let name = action.payload.data.name;
    state.id = id;
    state.name = name;

    return state;
  }
});
