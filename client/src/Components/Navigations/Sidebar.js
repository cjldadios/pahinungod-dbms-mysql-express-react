import React, { Component }  from 'react';
// import './Navbar.css'

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: localStorage.getItem("isAdmin"),
      asAdmin: localStorage.getItem("asAdmin"),

      activityIsActive: this.props.showActivity,
      profileIsActive: this.props.showProfile,
      
      manageVolunteersIsActive: this.props.showManageVolunteers, // show this by default
      manageActivitiesIsActive: this.props.showManageActivities,
      manageProgramsIsActive: this.props.showManagePrograms,
      manageAdministratorsIsActive: this.props.showManageAdministrators,
    };

    this.handleViewActivities = this.handleViewActivities.bind(this);
    this.handleViewProfile = this.handleViewProfile.bind(this);

    this.handleViewManageVolunteers = this.handleViewManageVolunteers.bind(this);
    this.handleViewManageActivities = this.handleViewManageActivities.bind(this);
    this.handleViewManagePrograms = this.handleViewManagePrograms.bind(this);
    this.handleViewManageAdministrators = this.handleViewManageAdministrators.bind(this);
  }

  // admin controls


  // user controls
  handleViewActivities() {
    this.props.history.push("/user/activity?username=" + localStorage.getItem("username"));
  }
  handleViewProfile() {
    this.props.history.push("/user/profile?username=" + localStorage.getItem("username"));
  }

  handleViewManageVolunteers () {
    this.props.history.push("/admin/manage-volunteers");
  }
  handleViewManageActivities () {
    this.props.history.push("/admin/manage-activities");
  }
  handleViewManagePrograms () {
    this.props.history.push("/admin/manage-programs");
  }
  handleViewManageAdministrators () {
    this.props.history.push("/admin/manage-administrators");
  }

  render() {
    
    return (
      <div className="ui left floated">
        <div className="ui vertical secondary menu">  
          
          { // conditional rendering
            this.props.asAdmin? ( // if admin 
              <div>
                { // this is just a conditional rendering of which items are active
                  this.state.manageVolunteersIsActive ? (
                    <div>
                      <a className="active item" onClick={this.handleViewManageVolunteers}>Manage Volunteers</a>
                      <a className="item" onClick={this.handleViewManageActivities}>Manage Activities</a>
                      {/* <a className="item" onClick={this.handleViewManagePrograms}>Manage Programs</a> */}
                      <a className="item" onClick={this.handleViewManageAdministrators}>Manage Administrators</a>
                    </div>
                  ) : (
                    this.state.manageActivitiesIsActive ? (
                      <div>
                        <a className="item" onClick={this.handleViewManageVolunteers}>Manage Volunteers</a>
                        <a className="active item" onClick={this.handleManageActivities}>Manage Activities</a>
                        {/* <a className="item" onClick={this.handleViewManagePrograms}>Manage Programs</a> */}
                        <a className="item" onClick={this.handleViewManageAdministrators}>Manage Administrators</a>
                      </div>
                    ) : (
                      this.state.manageProgramsIsActive ? (
                        <div>
                          <a className="item" onClick={this.handleViewManageVolunteers}>Manage Volunteers</a>
                          <a className="item" onClick={this.handleViewManageActivities}>Manage Activities</a>
                          <a className="active item" onClick={this.handleManagePrograms}>Manage Programs</a>
                          <a className="item" onClick={this.handleViewManageAdministrators}>Manage Administrators</a>
                        </div>
                      ) : (
                        this.state.manageAdministratorsIsActive ? (
                          <div>
                            <a className="item" onClick={this.handleViewManageVolunteers}>Manage Volunteers</a>
                            <a className="item" onClick={this.handleViewManageActivities}>Manage Activities</a>
                            {/* <a className="item" onClick={this.handleViewManagePrograms}>Manage Programs</a> */}
                            <a className="active item" onClick={this.handleManageAdministrators}>Manage Administrators</a>
                          </div>
                        ) : ( // lastly, if nothing is active, nothing is active
                          <div>
                            <a className="active item" onClick={this.handleViewManageVolunteers}>Manage Volunteers</a>
                            <a className="active item" onClick={this.handleViewManageActivities}>Manage Activities</a>
                            {/* <a className="active item" onClick={this.handleViewManagePrograms}>Manage Programs</a> */}
                            <a className="active item" onClick={this.handleViewManageAdministrators}>Manage Administrators</a>
                          </div>
                        )
                      )
                    )
                  )
                }
              </div>
            ) : (
              <div>
                {/** if not admin */}
                
                { 
                  this.state.activityIsActive ? (
                  <div>
                    <a className="active item" onClick={this.handleViewActivities}>
                      Activities
                    </a>
                    <a className="item" onClick={this.handleViewProfile}>
                      Profile
                    </a>
                  </div>
                  ) : (
                    this.state.profileIsActive ? (
                      <div>
                        <a className="item" onClick={this.handleViewActivities}>
                          Activities
                        </a>
                        <a className="active item" onClick={this.handleViewProfile}>
                          Profile
                        </a>
                      </div>
                    ) : (
                      <div>
                        <a className="item" onClick={this.handleViewActivities}>
                          Activities
                        </a>
                        <a className="item" onClick={this.handleViewProfile}>
                          Profile
                        </a>
                      </div>
                    )
                  )
                }
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