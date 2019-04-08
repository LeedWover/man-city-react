import React, { Component } from "react";
import { Slide } from "react-reveal";
import { CircularProgress } from "@material-ui/core";

import { firebaseMatches } from "../../../firebase";
import MatchBlock from "../../utils/MatchesBlock";
import { firebaseLooper /*reverseArray*/ } from "../../utils/Misc";

class Blocks extends Component {
  state = {
    matches: [],
    isLoading: true,
    errorMessage: "",
    error: false
  };

  componentDidMount() {
    firebaseMatches
      .limitToLast(6)
      .once("value")
      .then(snapshot => {
        const matches = firebaseLooper(snapshot);

        this.setState({
          //matches: reverseArray(matches)
          matches: matches.reverse(),
          isLoading: false
        });
      })
      .catch(err => {
        this.setState({
          error: true,
          isLoading: false,
          errorMessage: err.message
        });
      });
  }

  render() {
    console.log(this.state);
    let showMatches = this.state.matches.map(match => {
      return (
        <Slide bottom key={match.id}>
          <div className="item">
            <div className="wrapper">
              <MatchBlock match={match} />
            </div>
          </div>
        </Slide>
      );
    });

    return (
      <div className="home_matches">
        {this.state.isLoading ? (
          <CircularProgress
            thickness={7}
            style={{ color: "#fff", margin: "auto", marginBottom: "3em" }}
          />
        ) : (
          this.state.error ? <div style={{margin: 'auto', marginBottom: '3em', fontSize: '1.5em', color: 'red'}}>{this.state.errorMessage}</div> : showMatches
        )}
      </div>
    );
  }
}

export default Blocks;
