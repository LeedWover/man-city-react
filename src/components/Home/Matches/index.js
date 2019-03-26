import React from 'react';

import Blocks from './Blocks';
import { Tag } from '../../utils/Misc';

const Matches = () => (
  <div className="home_matches_wrapper">
    <div className="container">
      <Tag
        background='#0e1731'
        size='50px'
        color='#fff'       
      >
        Matches
      </Tag>

      <Blocks />
      
      <Tag
        background='#fff'
        size='25px'
        color='#0e1731'
        link={true}
        linkTo="/the_team" 
      >
        See more matches
      </Tag>
    </div>
  </div>
);

export default Matches;