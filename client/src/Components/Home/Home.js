import React, { Component }  from 'react';

// The Login component is imported from Login.js in ../Login directory
import Login from './../Login/Login'

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      user: {
        username: 'charles97'
      }
    };

    this.setUserInfo = this.setUserInfo.bind(this);
    this.setLoginStatus = this.setLoginStatus.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  
  componentDidMount() {
    // set state variables here
    this.setState({ isLoggedIn: false });
  }

  // this method will be invoked by the child component Login
  setUserInfo(userInfo) {
    this.setState({ user: userInfo });
  } 

  setLoginStatus(status) {
    this.setState({ isLoggedIn: status });
  }

  handleLogout() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    const { isLoggedIn, user } = this.state; // this is to be able to access 'this.state.user' as simply 'user' for example

    return (
      <div>
        <div>Welcome to the homepage
        { // destructuring
          // this means inserting a script at the rendered page by enclosing it in curly brackets
          
          // conditional rendering using an 'inline if-else operator'
          
          isLoggedIn === true ? ', ' + user.username + '!': '. Please login.' // in single quotes, rendering a string
        }
        </div>

        <br/>

        { // render login form
          isLoggedIn === false ? ( // if a user is not logged in
            <Login setUserInfo={this.setUserInfo} setLoginStatus={this.setLoginStatus} /> 
          ) : ( // else
            <button onClick={this.handleLogout}>Logout</ button>
          ) // the statements are enclosed in parenthesis to render an html
        }
      </div>

    );
  }
}

export default Home;