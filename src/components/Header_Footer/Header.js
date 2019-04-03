import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, ListItem } from "@material-ui/core";

import { firebase } from '../../firebase';
import { CityLogo } from "../utils/Icons";

class Header extends Component {
  logoutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Logged out");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <AppBar
        position="fixed"
        style={{
          backgroundColor: "#98c5e9",
          boxShadow: "none",
          padding: "10px 0",
          borderBottom: "2px solid #00285e"
        }}
      >
        <Toolbar style={{ display: "flex" }}>
          <div
            style={{
              flexGrow: 1
            }}
          >
            <div className="header_logo">
              <CityLogo link={true} linkTo="/" width="70px" height="70px" />
            </div>
          </div>
          <Link to="/the_team">
            <Button color="inherit">The Team</Button>
          </Link>
          <Link to="/the_matches">
            <Button color="inherit">Matches</Button>
          </Link>
          {this.props.user ? (
            <Button onClick={this.logoutHandler} color="inherit">
              Logout
            </Button>
          ) : (
            <Link to="/sign_in">
              <Button color="inherit">Login</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
