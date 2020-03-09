import React from "react";
import logo from "./logo.svg";
import "./App.css";
import customTheme from "./theme";
import { ThemeProvider } from "@chakra-ui/core";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import Routes from "./routes";

const user = localStorage.getItem("user");
const initialState = {
  users: JSON.parse(user)
};
const store = configureStore(initialState);

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Provider store={store}>
        <div className="App">
          <Routes />
        </div>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
