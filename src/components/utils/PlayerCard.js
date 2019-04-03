import React from 'react';

const PlayerCard = props => (
  <div className="player_card_wrapper">
    <div
      className="player_card_thmb"
      style={{
        background: `#f2f9ff url(${props.image})`
      }}
    ></div>
    <div className="player_card_nfo">
      <div className="player_card_number">
        {props.num}
      </div>
      <div className="player_card_name">
        <span>{props.name}</span>
        <span>{props.lastname}</span>
      </div>

    </div>
  </div>
)

export default PlayerCard;