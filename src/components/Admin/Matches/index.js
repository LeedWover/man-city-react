import React, { Component } from "react";
import {
  CircularProgress
} from "@material-ui/core";

import { firebaseMatches } from "../../../firebase";
import AdminLayout from "../../../hoc/AdminLayout";
import { firebaseLooper } from "../../utils/Misc";
import MatchesTable from './MatchesTable';

class AdminMatches extends Component {
  state = {
    isLoading: true,
    matches: []
  };

  componentDidMount() {
    firebaseMatches.once("value").then(snapshot => {
      const matches = firebaseLooper(snapshot);

      this.setState({
        isLoading: false,
        matches: matches.reverse()
      })
    });
  }

  render() {
    console.log(this.state.matches)
    return (
      <AdminLayout>
        <div>
          <MatchesTable matches={this.state.matches} />
          <div className="admin_progress">
            {this.state.isLoading ? (
              <CircularProgress thickness={7} style={{ color: "#98c5e9" }} />
            ) : null}
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default AdminMatches;