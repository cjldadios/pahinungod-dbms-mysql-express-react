import React, { Component }  from 'react';
// import './Navbar.css'

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: localStorage.getItem("isAdmin"),
      asAdmin: localStorage.getItem("asAdmin"),
    };
  }

  // admin controls

  // user controls
  handleViewActivities() {

  }
  handleViewProfile() {

  }

  render() {
    
    return (
      <div>
        <div className="ui vertical secondary menu">  
          
          { // conditional rendering
            this.state.asAdmin? ( // if admin 
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
                <a className="item">
                  Activities
                </a>
                <a className="item">
                  Profile
                </a>
              </div>
            )
          } {/** end conditional rendering */}

          <a className="item">this.state.asAdmin: {this.state.asAdmin}</a>
              
        </div>
      </div>      
    );
  }
}

export default Sidebar;