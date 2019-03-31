import React, { Component } from "react";
import { Reveal } from 'react-reveal';

import Stripes from "../../../images/stripes.png";
import { Tag } from "../../utils/Misc";
import Cards from './Cards';

class MeetPlayers extends Component {
  state = {
    show: false
  };

  render() {
    return (
      <Reveal
        fraction={0.7}
        onReveal={() => {
          this.setState({
            show: true
          })
        }}
      >
        <div
          className="home_meetplayers"
          style={{
            background: `#fff url(${Stripes})`
          }}
        >
          <div className="container">
            <div className="home_meetplayers_wrapper">
              <div className="home_card_wrapper">
                <Cards 
                  show={this.state.show}
                />
              </div>
              <div className="home_text_wrapper">
                <div>
                  <Tag
                    background="#0e1731"
                    size="100px"
                    color="#fff"
                    add={{
                      marginBottom: '20px'
                    }}
                  >
                    Meet
                  </Tag>
                  <Tag
                    background="#0e1731"
                    size="100px"
                    color="#fff"
                    add={{
                      marginBottom: '20px'
                    }}
                  >
                    The
                  </Tag>
                  <Tag
                    background="#0e1731"
                    size="100px"
                    color="#fff"
                    add={{
                      marginBottom: '20px'
                    }}
                  >
                    Players
                  </Tag>
                </div>
                <div>
                  <Tag
                    background="#fff"
                    size="27px"
                    color="#0e1731"
                    linkTo="/the_team"
                    add={{
                      border: '1px solid #0e1731'
                    }}
                  >
                    Meet them here
                  </Tag>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Reveal>
    );
  }
}

export default MeetPlayers;
