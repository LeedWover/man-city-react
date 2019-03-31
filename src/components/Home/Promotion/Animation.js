import React from 'react';
import { Zoom } from 'react-reveal';

import Jersey from '../../../images/jersey.jpg';

const PromoAnimation = () => (
  <div className="promotion_animation">
    <div className="left">
      <Zoom>
        <div>
          <span>Win a</span>
          <span>Jersey</span>
        </div>
      </Zoom>
    </div>
    <div className="right">
      <Zoom>
        <div 
          style={{
            background: `url(${Jersey}) no-repeat`
          }}
        >
        </div>
      </Zoom>
    </div>
  </div>
)

export default PromoAnimation;