import React, { Component }  from 'react';

// The Login component is imported from Login.js in ../Login directory
// import Login from './../Login/Login'

import Navbar from './../Navbar/Navbar'
import Sidebar from './../Navbar/Sidebar'

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: localStorage.getItem("authenticated"),
      message: localStorage.getItem("message"),

      username: localStorage.getItem("username"),
    };
  }

  componentDidMount() {
    // if user is not logged in
    if(!localStorage.getItem('authenticated')) {
      this.props.history.push('/')
    }
  }

  render() {
    
    return (
      <div>

        <Sidebar {...this.props}/>
        <Navbar {...this.props}/>
        <div className="puser">
          <h2>User homepage</h2>
        </div>
      </div>

    );
  }
}

export default User;