import React, { Component }  from 'react';

// The Login component is imported from Login.js in ../Login directory
import Login from './../Login/Login'
import logo1 from './../../logo.svg';
import logo2 from './../../logo.jpeg';

const logoStyle = {
  float: 'left',
 height: '60px',
 padding: '5px 15px'
 /*padding: 0px 0px;*/
};

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: localStorage.getItem("authenticated"),
      message: localStorage.getItem("message"),

      username: localStorage.getItem("username"),

      
    };

    this.handleLogout = this.handleLogout.bind(this);
    this.handleRedirectToUserHome = this.handleRedirectToUserHome.bind(this);
  }
  
  componentDidMount() {
    // set state variables here
  }

  handleLogout() {
    this.setState({ authenticated: false });
    localStorage.setItem("authenticated", false);
    localStorage.setItem("message", "Logout success");
  }

  reload(e) {
    this.forceUpdate();
  }

  handleRedirectToUserHome() {
    
  }

  render() {
    //const { authenticated, username } = this.state; // this is to be able to access 'this.state.user' as simply 'user' for example

    return (
      <div>
        <div> {
          localStorage.getItem('authenticated') ? (
          <div>
            <p>
              {/* redirect to user home page */}
              <a onClick={this.props.history.push('/user')}>Go to user home.</a>
            </p>
          </div>
          ) : (
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

            <Login {...this.props} />
          </div>
          )
        }</div>


        
      </div>

    );
  }
}

export default Home;