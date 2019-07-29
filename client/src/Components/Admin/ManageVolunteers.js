import React, { Component }  from 'react';

import Navbar from './../Navigations/Navbar';
import Sidebar from './../Navigations/Sidebar';
import ApplicationForm from './ApplicationForm';
import UserActivity from './UserActivity';


class ManageVolunteers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: localStorage.getItem("authenticated"),
      message: localStorage.getItem("message"),

      username: localStorage.getItem("username"),

      usersArray: [],
      usersCount: 0,

      tempUserIdForFetching: '35',

      showViewVolunteer: true, // set this to true by default
      showEditVolunteer: false,
      showAddVolunteer: false,
      showManageVolunteerActivities: false
    };

    this.getAllUsers = this.getAllUsers.bind(this);
    this.handleEditUser = this.handleEditUser.bind(this);
    this.handleAddUser = this.handleAddUser.bind(this);
    this.handleViewUser = this.handleViewUser.bind(this);
    this.handleManageUserActivities = this.handleManageUserActivities.bind(this);
  }

  handleEditUser(e) { 
    console.log("handlingEditUser()");
    this.setState({ tempUserIdForFetching: e.target.value });
    console.log("userid to edit: " + e.target.value);
    this.setState({ showEditVolunteer: true });
    this.setState({ showAddVolunteer: false });
    this.setState({ showViewVolunteer: false });
    this.setState({ showManageVolunteerActivities: false });
  }

  handleViewUser(e) {
    this.setState({ tempUserIdForFetching: e.target.value });
    this.setState({ showEditVolunteer: false });
    this.setState({ showAddVolunteer: false });
    this.setState({ showViewVolunteer: true });
    this.setState({ showManageVolunteerActivities: false });
  }

  handleAddUser(e) {
    this.setState({ tempUserIdForFetching: e.target.value });
    this.setState({ showEditVolunteer: false });
    this.setState({ showAddVolunteer: true });
    this.setState({ showViewVolunteer: false });
    this.setState({ showManageVolunteerActivities: false });
  }

  handleManageUserActivities(e) {
    this.setState({ tempUserIdForFetching: e.target.value });
    this.setState({ showEditVolunteer: false });
    this.setState({ showAddVolunteer: false });
    this.setState({ showViewVolunteer: false });
    this.setState({ showManageVolunteerActivities: true });
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

    this.getAllUsers();
  }

  getAllUsers = async e => {
    const response = await fetch('/get-all-users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'getting all users'
      })
    });
    
    const body = await response.text();

    const usersArray = JSON.parse(body);
    // get user activities
    // console.log("usersArray: " + JSON.stringify(usersArray));
    this.setState({ usersArray: usersArray});
    
    var usersCount = Object.keys(this.state.usersArray).length;

    // console.log("usersCount: " + usersCount);

    this.setState({ usersCount: usersCount });

    // after knowing the IDs of the user activity, fetch them again from the activity table for showing
    if(this.state.activityCount > 0) { // if there exist such
      this.getActivity();
    }
  }

  render() {
    
    return (
      <div> {
        // check if the account is an admin, show a message that redirects back to user page
        !localStorage.getItem('isAdmin') === true ? (
        <div>
          <p>Not an administrator. <a href="/user/activity">Go back</a></p>
        </div>
        ): 
        ( // this is the content of the actual admin page
          <div>
            <Navbar history={this.props.history}/>

            {/* this is how to include the sidebar */}
            <div className="ui grid">
              <div className="three wide column">
                <Sidebar {...this.props} asAdmin={true} showManageVolunteers={true} /> {/** this is the side bar */}
              </div>

              <div className="eleven wide column">
                <div className="center aligned two column row">{/** this is  a space between the center and the navbar */}</div>
                
                {/* this is the middle segment div */}
                  <div className="ui segment">
                  
                  { // conditional rendering
                    this.state.showViewVolunteer ?
                    (
                      <div>
                        <div className="ui center aligned two row">
                          <div className="column">
                            <h3>Manage Volunteers Page</h3>
                          </div>
                        </div>

                        <div className="ui center aligned two row">
                          <div className="ui secondary  menu">
                            <div className="ui item">
                              <strong>View:</strong>
                            </div>
                            <a className="active item">
                              All
                            </a>
                            <a className="item">
                              
                            </a>
                            <a className="item">
                              
                            </a>
                            <div className="right menu">
                              <div className="item">
                                <div className="ui icon input">
                                  <input type="text" placeholder="Search..."/>
                                  <i className="search link icon"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="column">
                          <table className="ui celled table">
                            <thead>
                              <tr>
                                <th>User ID</th>
                                <th>Username</th> 
                                <th>Password</th>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>
                                <button className="ui teal button" onClick={this.handleAddUser}>Add Volunteer</button>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                this.state.usersArray.map(user => 
                                  <tr key={user.userid}>
                                    <td>{user.userid}</td>
                                    <td>{user.username}</td>
                                    <td>{user.password}</td>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>
                                      <strong>Edit: </strong><br/>
                                      <button value={user.userid} onClick={this.handleEditUser} >Profile</button>
                                      <button value={user.userid} onClick={this.handleManageUserActivities} >Activities</button>
                                    </td>
                                  </tr>
                                ) 
                              }
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      // else if
                      this.state.showEditVolunteer ?
                      (
                        <div>
                          <br/>
                          <button onClick={this.handleViewUser} className="ui right floated negative button">Back</button>
                          <ApplicationForm userid={this.state.tempUserIdForFetching}  heading="Editing Volunteer Profile" 
                          />
                        </div>
                      ) : (
                        this.state.showAddVolunteer ? (
                          <div>
                            <br/>
                            <button onClick={this.handleViewUser} className="ui right floated negative button">Back</button>
                            <ApplicationForm newAccount={true} heading="New Volunteer Application" alertMessage="Volunteer added successfully" />
                          </div>
                        ) : (
                          this.state.showManageVolunteerActivities? (
                            <div>
                              <button onClick={this.handleViewUser} className="ui right floated negative button">Back</button>
                              <UserActivity userid={this.state.tempUserIdForFetching} />
                            </div>
                          ) : (
                            <div>
                              <p>Opps. Something's wrong. <a href="/user/activity">Continue</a>.</p>
                            </div>
                          )
                          
                        )
                      )
                    )
                  }

                </div>
              </div>

            </div>                    
          </div>
        )
      }</div>
    );
  }
}

export default ManageVolunteers;