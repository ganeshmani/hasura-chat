export default (initialState, handlers) => (state = initialState, action) => {
  const handler = handlers[action.type];
  if (handler) {
    return handler(state, action);
  }

  return state;
};
