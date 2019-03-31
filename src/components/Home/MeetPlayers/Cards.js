import React, {Component} from 'react';
import { easePolyOut } from 'd3-ease';
import { Animate } from 'react-move';

import PlayerCard from '../../utils/PlayerCard';
import Otamendi from '../../../images/players/Otamendi.png';
import Bernando from '../../../images/players/player_to_upload/MIDF/bernardo_silva.png';
import Fabian from '../../../images/players/player_to_upload/MIDF/fabian_delph.png';
import Illkay from '../../../images/players/player_to_upload/MIDF/illkay_gundogan.png';

class Cards extends Component {
  state = {
    show: this.props.show,
    cards: [
      {
        bottom: 90,
        left: 300,
        source: Otamendi,
        name: 'Otamendi',
        lastname: 'Nicolas',
        num: '13'
      },
      {
        bottom: 60,
        left: 200,
        source: Bernando,
        name: 'Bernando',
        lastname: 'silva',
        num: '72'
      },
      {
        bottom: 30,
        left: 100,
        source: Fabian,
        name: 'Fabian',
        lastname: 'Delph',
        num: '21'
      },
      {
        bottom: 0,
        left: 0,
        source: Illkay,
        name: 'Illkay',
        lastname: 'Gundogan',
        num: '32'
      }
    ]
  }
  
  render() {

    let showCards = this.state.cards.map((card, index) => (
      <Animate
        key={index}
        show={this.props.show}

        start={{
          left: 0,
          bottom: 0
        }}

        enter={{
          left: [card.left],
          bottom: [card.bottom],
          timing: {
            duration: 500,
            ease: easePolyOut
          }
        }}
      >
        {({left, bottom}) => {
          return (
            <div
              style={{
                position: 'absolute',
                left,
                bottom
              }}
            >
              <PlayerCard
                name={card.name}
                image={card.source}
                num={card.num}
                lastname={card.lastname}
              />
            </div>
          )
        }}
      </Animate>
    ))

    return (
      <div>
        {showCards}
      </div>
    )
  }
}

export default Cards;