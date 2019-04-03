import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { firebase } from "./firebase";
import App from "./App";

const AppEntry = props => (
  <Router>
    <App {...props} />
  </Router>
)

firebase.auth().onAuthStateChanged(user => {
  ReactDOM.render(<AppEntry user={user} />, document.getElementById("root"));
});
