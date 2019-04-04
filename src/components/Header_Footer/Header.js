import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { AppBar, Toolbar, Button, Menu, MenuItem } from "@material-ui/core";

import { firebase } from "../../firebase";
import { CityLogo } from "../utils/Icons";

class Header extends Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  openDashboard = () => {
    this.props.history.push('/dashboard');
    this.handleClose();
  }

  logoutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.handleClose()
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    let profileDropdown = (
      <div>
        <Button
          color="inherit"
          aria-owns={this.state.anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          Profile
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.openDashboard}>Dashboard</MenuItem>
          <MenuItem onClick={this.logoutHandler}>Logout</MenuItem>
        </Menu>
      </div>
    );
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
            profileDropdown
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

export default withRouter(Header);
