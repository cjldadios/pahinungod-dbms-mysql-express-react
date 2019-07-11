import React, { Component }  from 'react';
// import './Navbar.css'

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: localStorage.getItem("isAdmin"),
      asAdmin: localStorage.getItem("asAdmin"),
    };

    this.handleViewActivities = this.handleViewActivities.bind(this);
    this.handleViewProfile = this.handleViewProfile.bind(this);
  }

  // admin controls

  // user controls
  handleViewActivities() {
    // this.props.history.push("/user/activity?username=" + localStorage.getItem("username"));
    this.props.showActivity();
  }
  handleViewProfile() {
    // this.props.history.push("/user/profile?username=" + localStorage.getItem("username"));
    this.props.showProfile();
  }

  render() {
    
    return (
      <div>
        <div className="ui vertical secondary menu">  
          
          { // conditional rendering
            this.props.asAdmin? ( // if admin 
              <div>
                <a className="item">
                  Manage Volunteers
                </a>
                <a className="item">
                  Manage Activities
                </a>
                <a className="item">
                  Manage Programs
                </a>
                <a className="item">
                  Manage Administrators
                </a>
              </div>
            ) : (
              <div>
                {/** if not admin */}
                <a className="item" onClick={this.handleViewActivities}>
                  Activities
                </a>
                <a className="item" onClick={this.handleViewProfile}>
                  Profile
                </a>
              </div>
            )
          } {/** end conditional rendering */}

          {/* <a className="item">this.state.isAdmin: {this.state.isAdmin}</a>
          <a className="item">this.state.asAdmin: {this.state.asAdmin}</a>
          <a className="item">this.props.asAdmin: {this.props.asAdmin}</a> */}
              
        </div>
      </div>      
    );
  }
}

export default Sidebar;