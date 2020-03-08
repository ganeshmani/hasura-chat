import createReducers from "../../helpers/createReducers";

const initialState = {
  messages: [
    // {
    //   id: null,
    //   text: "",
    //   created_user: null
    // }
  ]
};

export default createReducers(initialState, {
  SUBMIT_MESSAGE_SUCCESS: (state, action) => {
    let id = action.payload.data.id;
    let text = action.payload.data.text;
    let user = action.payload.data.user;
    return {
      ...state,
      messages: [
        ...state.messages,
        {
          id,
          text,
          user
        }
      ]
    };
  },
  FETCH_MESSAGES_SUCCESS: (state, action) => {
    let messages = action.payload.data.data.messages;

    return {
      ...state,
      messages: messages
    };
  }
});
