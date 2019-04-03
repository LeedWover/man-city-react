import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

import Layout from "./hoc/Layout";
import Home from "./components/Home";
import SignIn from "./components/SignIn";

const App = props => {
  return (
    <Layout>
      <Switch>
        <Route exact component={SignIn} path="/sign_in" />
        <Route exact component={Home} path="/" />
      </Switch>
    </Layout>
  );
};

export default App;
