import React, { Component } from 'react';

import Logout from './../Authentication/Logout';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: localStorage.getItem("isAdmin"),
      asAdmin: localStorage.getItem("asAdmin"),
    };

    this.handleContinueAsAdmin = this.handleContinueAsAdmin.bind(this);
    this.handleContinueAsVolunteer = this.handleContinueAsVolunteer.bind(this);
  }

  // nav link for admins to access admin pages
  handleContinueAsAdmin() {
    localStorage.setItem("asAdmin", true);
    this.setState({asAdmin: true});
    // redirect to admin home page 
    this.props.history.push("/admin/manage-volunteers");// + localStorage.getItem("username"));
  } 

  handleContinueAsVolunteer() {
    localStorage.removeItem("asAdmin");
    // redirect to user home page 
    this.props.history.push("/user/activity"); // + localStorage.getItem("username"));
  } 

  render() {
    return (
      <div className="">
        <div className="ui primary menu">
          <div className="item">
            <h4>{
              localStorage.getItem("asAdmin") ? 'Administrator' : 'Volunteer'
            }</h4>
          </div>

          <a className="ui item" >{localStorage.getItem("username")}</a>
          {/* 
            <a className="active item">
              Home
            </a>
              */}
          
          <div className="right menu">

            
            { localStorage.getItem("isAdmin") ? (
              localStorage.getItem("asAdmin") ? (
                <a className="ui item button" >
                  <button className="ui positive button" onClick={this.handleContinueAsVolunteer}>Continue as Volunteer</button>
                </a>
              ) : (
                <a className="ui item" >
                  <button className="ui primary button" onClick={this.handleContinueAsAdmin}>Continue as Administrator</button>
                </a>
              )
            ) : (null)}

            
            <a className="ui item">
              <Logout {...this.props} />
            </a>

            {/* <div className="ui item">{localStorage.getItem("isAdmin") + ", " + this.state.asAdmin}</div> */}
          </div>
        </div>
      </div>
    );
  }

}

export default Navbar;