import React, { Component }  from 'react';
import Logout from './../Login/Logout';
// import './Navbar.css'

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: localStorage.getItem("isAdmin"),
      asAdmin: this.props.asAdmin,
    };

    this.handleContinueAsAdmin = this.handleContinueAsAdmin.bind(this);
    this.handleContinueAsVolunteer = this.handleContinueAsVolunteer.bind(this);

  }

  // nav link for admins to access admin pages
  handleContinueAsAdmin() {
    localStorage.setItem("asAdmin", true);
    this.setState({asAdmin: true});
    // redirect to admin home page 
    this.props.history.push("/admin/" + localStorage.getItem("username"));
  } 

  handleContinueAsVolunteer() {
    // localStorage.setItem("asAdmin", false);
    this.setState({asAdmin: true});
    localStorage.removeItem("asAdmin");
    // redirect to admin home page 
    this.props.history.push("/user/" + localStorage.getItem("username"));
  } 

  render() {
    
    return (
      <div className="">
        <div className="ui secondary menu">
          <div className="item">
            
              <h4>{
                this.props.asAdmin ? 'Administrator' : 'Volunteer'
              }</h4>
          </div>

          <a className="active item">
            Home
          </a>
          <a className="item">
            Messages
          </a>
          <a className="item">
            Friends
          </a>
          <div className="right menu">
            
            { localStorage.getItem("isAdmin") ? (
              this.props.asAdmin ? (
                <a className="ui item" onClick={this.handleContinueAsVolunteer}>Continue as Volunteer</a>
              ) : (
                <a className="ui item" onClick={this.handleContinueAsAdmin}>Continue as Administrator</a>
              )
            ) : (<div/>)}

            <a className="ui item">
              <Logout {...this.props}/>
            </a>

            {/* <div className="ui item">{localStorage.getItem("isAdmin") + ", " + this.state.asAdmin}</div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;