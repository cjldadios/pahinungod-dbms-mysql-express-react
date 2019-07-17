import React, { Component }  from 'react';

import Navbar from './../Navigations/Navbar';
import Sidebar from './../Navigations/Sidebar';

class ManagePrograms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: localStorage.getItem("authenticated"),
      message: localStorage.getItem("message"),
      username: localStorage.getItem("username"),
      
      manageVolunteersIsActive: false,
      manageActivitiesIsActive: false,
      manageProgramsIsActive: true,
      manageAdministratorsIsActive: false,
    };

    this.showManageVolunteers = this.showManageVolunteers.bind(this);
    this.showManageActivities = this.showManageActivities.bind(this);
    this.showManagePrograms = this.showManagePrograms.bind(this);
    this.showManageAdministrators = this.showManageAdministrators.bind(this);
  }

  componentDidMount() {
    // check if user is logged in
    if(!localStorage.getItem('authenticated')) {
      this.props.history.push('/login'); // redirect to home/login page if not logged
    }

    // if user is not logged in
    if(!localStorage.getItem('authenticated')) {
      this.props.history.push('/user/' + this.props.username) // redirect to user home page if not admin
    }

    localStorage.setItem("asAdmin", true);
  }

  showManageVolunteers () {
    console.log('oops, somebody triggered me');
    // this.setState({ profileIsActive: false});
    // this.setState({ activityIsActive: false});
    this.setState({ manageVolunteersIsActive: true});
    this.setState({ manageActivitiesIsActive: false});
    this.setState({ manageProgramsIsActive: false});
    this.setState({ manageAdministratorsIsActive: false});
    // this.props.history.push('/manage-volunteers');
  }
  showManageActivities (e) {
    // this.setState({ profileIsActive: false});
    // this.setState({ activityIsActive: false});
    this.setState({ manageVolunteersIsActive: false});
    this.setState({ manageActivitiesIsActive: true});
    this.setState({ manageProgramsIsActive: false});
    this.setState({ manageAdministratorsIsActive: false});
    // this.props.history.push('/manage-activities');
  }
  showManagePrograms (e) {
    // this.setState({ profileIsActive: false});
    // this.setState({ activityIsActive: false});
    this.setState({ manageVolunteersIsActive: false});
    this.setState({ manageActivitiesIsActive: false});
    this.setState({ manageProgramsIsActive: true});
    this.setState({ manageAdministratorsIsActive: false});
    // this.props.history.push('/manage-programs');
  }
  showManageAdministrators (e) {
    // this.setState({ profileIsActive: false});
    // this.setState({ activityIsActive: false});
    this.setState({ manageVolunteersIsActive: false});
    this.setState({ manageActivitiesIsActive: false});
    this.setState({ manageProgramsIsActive: false});
    this.setState({ manageAdministratorsIsActive: true});
    // this.props.history.push('/manage-administrators');
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
            <Navbar history={this.props.history}/>

            {/* this is how to include the sidebar */}
            <div className="ui grid">
              <div className="three wide column">
                <Sidebar {...this.props} asAdmin={true} showManagePrograms={true} /> {/** this is the side bar */}
              </div>
              <div className="eleven wide column">    {/** this is where the USER Page contents should be declared */}
                <br/> 
                <h3>Manage Programs</h3>

              </div>
            </div>          
          </div>
        )
      }</div>
    );
  }
}

export default ManagePrograms;