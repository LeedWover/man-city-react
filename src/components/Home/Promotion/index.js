import React from 'react';

import PromoAnimation from './Animation';
import Enroll from './Enroll';

const Promotion = () => (
  <div
    className="promotion_wrapper"
    style={{
      background: '#fff'
    }}
  >
    <div className="container">
      <PromoAnimation />
      <Enroll />
    </div>
  </div>
)

export default Promotion;