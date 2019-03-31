import React, { Component } from 'react';
import { Slide } from 'react-reveal';

import { firebaseMatches } from '../../../firebase';
import MatchBlock from '../../utils/MatchesBlock';
import { firebaseLooper, /*reverseArray*/ } from '../../utils/Misc';

class Blocks extends Component {
  
  state = {
    matches: []
  }
  
  componentDidMount() {
    firebaseMatches.limitToLast(6).once('value')
      .then(snapshot => {
        const matches = firebaseLooper(snapshot);
        
        this.setState({
          //matches: reverseArray(matches)
          matches: matches.reverse()
        })
      });
  }

  render() {

    let showMatches = this.state.matches.map(match => {
      return (
        <Slide
          bottom
          key={match.id}
        >
          <div
            className="item" 
          >
            <div className="wrapper">
              <MatchBlock
                
                match={match}
              />
            </div>
          </div>
        </Slide>
      )
    })

    return (
      <div className="home_matches">
        {showMatches}
      </div>
    )
  }
}

export default Blocks;