import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LoginComponent from "./components/login";
import Chat from "./components/Chat";

const Routes = () => (
  <Router>
    {/* <Route exact path="/" render={() => <div>Home Page</div>} /> */}
    <Route exact path="/" component={LoginComponent} />
    <Route path="/chat" component={Chat} />
  </Router>
);

export default Routes;
