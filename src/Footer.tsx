import React from 'react';

class Footer extends React.Component {
    render() {
      return (
        <div className='footer'>
          <div className='footer-inner'>
            <p></p>
            <img src={`${process.env.PUBLIC_URL}/logo.png`} width="20%" height="20%" />
            <p>Under development.</p>
            <p></p>
          </div>
        </div>
      );
    }
  }

export default Footer;