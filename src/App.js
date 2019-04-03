import React from "react";
import { Switch } from "react-router-dom";
import "./App.css";

import PrivateRoutes from './components/AuthRoutes/PrivateRoutes';
import PublicRoutes from './components/AuthRoutes/PublicRoutes';
import Layout from "./hoc/Layout";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Admin/Dashboard";

const App = props => {
  console.log(props.user)
  return (
    <Layout user={props.user}>
      <Switch>
        <PrivateRoutes {...props} exact path="/dashboard" component={Dashboard} />
        <PublicRoutes {...props} restricted={false} exact path="/" component={Home} />
        <PublicRoutes {...props} restricted={true} exact path="/sign_in" component={SignIn} />
      </Switch>
    </Layout>
  );
};

export default App;
