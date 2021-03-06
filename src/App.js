import React from "react";
import { Switch } from "react-router-dom";
import "./App.css";

import PrivateRoutes from './components/AuthRoutes/PrivateRoutes';
import PublicRoutes from './components/AuthRoutes/PublicRoutes';
import Layout from "./hoc/Layout";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Admin/Dashboard";
import AdminMatches from './components/Admin/Matches';
import AddEditMatch from './components/Admin/Matches/AddEditMatch';
import AdminPlayers from './components/Admin/Players';
import AddEditPlayer from './components/Admin/Players/AddEditPlayer';

const App = props => {
  return (
    <Layout {...props}>
      <Switch>
        <PrivateRoutes {...props} exact path="/dashboard" component={Dashboard} />
        <PrivateRoutes {...props} exact path="/admin_matches" component={AdminMatches} />
        <PrivateRoutes {...props} exact path="/admin_matches/edit_match" component={AddEditMatch} />
        <PrivateRoutes {...props} exact path="/admin_matches/edit_match/:id" component={AddEditMatch} />
        <PrivateRoutes {...props} exact path="/admin_players" component={AdminPlayers} />
        <PrivateRoutes {...props} exact path="/admin_players/add_player" component={AddEditPlayer} />
        <PrivateRoutes {...props} exact path="/admin_players/add_player/:id" component={AddEditPlayer} />
        <PublicRoutes {...props} restricted={false} exact path="/" component={Home} />
        <PublicRoutes {...props} restricted={true} exact path="/sign_in" component={SignIn} />
      </Switch>
    </Layout>
  );
};

export default App;
