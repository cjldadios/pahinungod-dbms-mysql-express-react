import React, { Component }  from 'react';

class Sidebar extends Component {
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
      <div>
        <div className="ui sidebar inverted vertical menu">
          <a className="item">
            Sidebar item 1
          </a>
          <a className="item">
          Sidebar item 2
          </a>
          <a className="item">
            Sidebar item 3
          </a>
        </div>
      </div>
    );
  }
}

export default Sidebar;