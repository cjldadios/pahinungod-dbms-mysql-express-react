import React, { Component }  from 'react';

// The Login component is imported from Login.js in ../Login directory
// import Login from './../Login/Login'

import Navbar from './../Navbar/Navbar'

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: localStorage.getItem("authenticated"),
      message: localStorage.getItem("message"),

      username: localStorage.getItem("username"),
    };
  }

  componentDidMount() {
    // check if user is logged in
    if(!localStorage.getItem('authenticated')) {
      this.props.history.push('/'); // redirect to home/login page if not logged
    }

    // if user is not logged in
    if(!localStorage.getItem('authenticated')) {
      this.props.history.push('/user/' + this.props.username) // redirect to user home page if not admin
    }
  }

  render() {
    
    return (
      <div>
        <Navbar {...this.props}/>
        <h2>Admin homepage</h2>
      </div>

    );
  }
}

export default Admin;