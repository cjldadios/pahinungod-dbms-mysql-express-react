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
        {/* <div className="ui grid">
          <div className="two wide column">
            <div className="ui secondary menu">
              <div className="item">
                <div className="three wide column">
                  <h4>{
                    this.props.asAdmin ? 'Administrator' : 'Volunteer'
                  }</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="column">          
            <Navbar {...this.props} asAdmin={false}/>
          </div>
        </div> */}

        <Navbar {...this.props} asAdmin={false}/>

        {/* this is how to include the sidebar */}
        <div className="ui grid">
          <div className="three wide column">
            <Sidebar {...this.props}/> {/** this is the side bar */}
          </div>
          <div className="column">    {/** this is where the USER Page contents should be declared */}
            <h2>User homepage</h2>
          </div>
        </div>

      </div>
    );
  }
}

export default User;