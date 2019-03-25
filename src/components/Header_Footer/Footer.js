import React from 'react';

import { CityLogo } from '../utils/Icons';

const Footer = props => {
  return (
    <footer
      className="bck_blue"
      /*style={{
        position: 'fixed',
        bottom: 0,
        width: '100%'
      }} */
    >
      <div className="footer_logo">
        <CityLogo
          width="70px"
          height="70px"
          link={false}
        />
        <div className="footer_discl">
          Manchester City 2019. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer;