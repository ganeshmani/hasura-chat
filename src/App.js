import React from "react";
import logo from "./logo.svg";
import "./App.css";
import customTheme from "./theme";
import { ThemeProvider } from "@chakra-ui/core";
import Routes from "./routes";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { WebSocketLink } from "apollo-link-ws";
import { HttpLink } from "apollo-link-http";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { InMemoryCache } from "apollo-cache-inmemory";

const httpLink = new HttpLink({
  uri: "https://hasura-infiite-loader.herokuapp.com/v1alpha1/graphql" // use https for secure endpoint
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: "ws://hasura-infiite-loader.herokuapp.com/v1alpha1/graphql", // use wss for a secure endpoint
  options: {
    reconnect: true
  }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

// Instantiate client
const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={customTheme}>
        <div className="App">
          <Routes />
        </div>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
