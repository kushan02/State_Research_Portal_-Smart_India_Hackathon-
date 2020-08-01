import React, { Component } from "react";

import "./App.css";

import Home from "./components/Home.jsx";
import SearchResultCopy from "./components/SearchResultCopy.jsx";
import Details from "./components/Details.jsx";

import WrappedNormalLoginForm from "./components/Login.jsx";
import Registration from "./components/Registration";

import StepForm from "./components/StepForm";

import "antd/dist/antd.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends Component {
  state = {};
  render() {
    return (
      <Router>
        <Switch>
          <div>
            <Route
              exact
              path="/login"
              render={(props) => <WrappedNormalLoginForm {...props} />}
            />
            <Route
              exact
              path="/registration"
              render={(props) => <Registration {...props} />}
            />
            {/* <Route exact path="/" render={props => <Details />} /> */}
            <Route exact path="/" render={(props) => <Home {...props} />} />
          </div>
        </Switch>
      </Router>
    );
  }
}

export default App;
