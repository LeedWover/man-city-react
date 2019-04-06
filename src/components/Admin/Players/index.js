import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
  CircularProgress
} from "@material-ui/core";

import { firebasePlayers } from '../../../firebase';
import { firebaseLooper } from '../../utils/Misc'
import AdminLayout from '../../../hoc/AdminLayout';
import PlayersTable from './PlayersTable';

class Players extends Component {
  
  state = {
    isLoading: true,
    players: []
  }

  componentDidMount() {
    firebasePlayers.once('value')
      .then(snapshot => {
        const players = firebaseLooper(snapshot);

        this.setState({
          isLoading: false,
          players
        })
      });
  }
  
  render() {
    console.log(this.state)
    
    return (
      <AdminLayout>
        <div>
          <PlayersTable players={this.state.players} />
          <div className="admin_progress">
            {this.state.isLoading ? (
              <CircularProgress thickness={7} style={{ color: "#98c5e9" }} />
            ) : null}
          </div>
        </div>
      </AdminLayout>
    )
  }
}

export default Players;