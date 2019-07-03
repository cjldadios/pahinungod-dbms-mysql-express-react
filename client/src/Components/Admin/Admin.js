import React, { Component }  from 'react';

// The Login component is imported from Login.js in ../Login directory
// import Login from './../Login/Login'

import Navbar from './../Navbar/Navbar'
import Sidebar from './../Navbar/Sidebar';

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
      <div> {
        // check if the account is an admin, show a message that redirects back to user page
        !localStorage.getItem('isAdmin') === true ? (
        <div>
          <p>Not an administrator. <a href="/user">Go back</a></p>
        </div>
        ): 
        ( // this is the content of the actual admin page
        <div>
          <Navbar {...this.props} asAdmin={true} isAdmin={true}/>
          {/* this is how to include the sidebar */}
        <div className="ui grid">
          <div className="three wide column">
            <Sidebar {...this.props}/> {/** this is the side bar */}
          </div>
          <div className="column">    {/** this is where the ADMIN Page contents should be declared */}
            <h2>Admin homepage</h2>
          </div>
        </div>
        </div>
        )
      }</div>
    );
  }
}

export default Admin;