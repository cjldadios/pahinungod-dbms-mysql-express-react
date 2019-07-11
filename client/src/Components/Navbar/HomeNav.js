import React, { Component }  from 'react';

// The Login component is imported from Login.js in ../Login directory
import logo1 from './../../logo.svg';
import logo2 from './../../logo.jpeg';

const logoStyle = {
  float: 'left',
 height: '60px',
 padding: '5px 15px'
 /*padding: 0px 0px;*/
};

class HomeNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: localStorage.getItem("authenticated"),
      message: localStorage.getItem("message"),

      username: localStorage.getItem("username"),

      
    };
  }

  handleLogout() {
    this.setState({ authenticated: false });
    localStorage.setItem("authenticated", false);
    localStorage.setItem("message", "Logout success");
  }

  render () {
      return(
        <div>
          <div className="ui menu">
            <a>
              <img src={logo1} alt="Logo" style={logoStyle}/>
            </a>
            <a>
              <img src={logo2} alt="Logo" style={logoStyle}/>
            </a>
            <a className="item">
              <h2>Ugnayan ng Pahinungod</h2>
            </a>

            <div className="right menu">
              <div className="header item">
                Home
              </div>
              <a className="item">
                About Us
              </a>
              <a className="item">
                Contact Us
              </a>
              <a className="item">
                FAQs
              </a>
            </div>
          </div>

          <div>
          {/* // dynamic render
            // conditional rendering using an 'inline if-else operator'
            authenticated ? ', ' + username + '!': '.' // in single quotes, rendering a string
          */}
          </div>
        </ div>
      );
    }

}

export default HomeNav;