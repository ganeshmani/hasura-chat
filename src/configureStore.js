import { Store, createStore, applyMiddleware } from "redux";

import createSagaMiddleware from "redux-saga";

import { rootSaga, createRootReducer } from "./store";

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    createRootReducer(),
    initialState,
    applyMiddleware(sagaMiddleware)
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
