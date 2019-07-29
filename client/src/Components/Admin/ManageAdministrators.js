import React, { Component }  from 'react';

import Navbar from './../Navigations/Navbar';
import Sidebar from './../Navigations/Sidebar';

var globalvar1 = '';

class ManageAdministrators extends Component {
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


      searchText: '',
      volunteerArray: [],
      adminArray: [],
    };

    this.showManageVolunteers = this.showManageVolunteers.bind(this);
    this.showManageActivities = this.showManageActivities.bind(this);
    this.showManagePrograms = this.showManagePrograms.bind(this);
    this.showManageAdministrators = this.showManageAdministrators.bind(this);

    this.handleSearchVolunteer = this.handleSearchVolunteer.bind(this);
    this.getAllAdministrators = this.getAllAdministrators.bind(this);
    this.handleAddAdmin = this.handleAddAdmin.bind(this);
    this.handleRemoveAdmin = this.handleRemoveAdmin.bind(this);
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

    console.log("admin userid: " + localStorage.getItem("userid"));

    this.searchVolunteer(); 
    this.getAllAdministrators();
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

  getAllAdministrators = async e => {
    const response = await fetch('/get-all-administrators', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // userid: this.props.userid
      })
    });
    
    const body = await response.text();

    const resultArray = JSON.parse(body);

    this.setState({ adminArray: resultArray});
    // console.log("adminArray: " + JSON.stringify(this.state.adminArray));
  }

  handleSearchVolunteer(e) {
    this.setState({ searchText: e.target.value });
    console.log("e.target.value: " + e.target.value);
    // console.log("searchText: " + this.state.searchText);

    globalvar1 = e.target.value;
    // console.log("globalvar1: " + globalvar1);
    this.searchVolunteer();
  }

  searchVolunteer = async e => {
    const response = await fetch('/search-volunteer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // searchText: this.state.searchText
        searchText: globalvar1
      })
    });
    const body = await response.text(); // this should return a single row
    // console.log("body: " + body);
    this.setState({ volunteerArray: JSON.parse(body) });
    // console.log("response: " + this.state.volunteerArray);
    // console.log("response: " + body);
  }

  handleAddAdmin(userid) {
    globalvar1 = userid;
    this.addAdmin();

    this.searchVolunteer();
    this.getAllAdministrators();
  }

  handleRemoveAdmin(userid) {
    globalvar1 = userid;

    if(userid.toString() === localStorage.getItem("userid")) {
      alert("You cannot remove yourself as admin!");
    } else {
      this.removeAdmin();
    }

    this.searchVolunteer();
    this.getAllAdministrators();
  }

  addAdmin = async e => {
    const response = await fetch('/add-admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userid: globalvar1
      })
    });
    const body = await response.text(); 
    console.log("body: " + body);
  }

  removeAdmin = async e => {
    const response = await fetch('/remove-admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // searchText: this.state.searchText
        userid: globalvar1
      })
    });
    const body = await response.text(); 
    console.log("body: " + body);
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
                <Sidebar {...this.props} asAdmin={true} showManageAdministrators={true} /> {/** this is the side bar */}
              </div>
              <div className="eleven wide column">    {/** this is where the USER Page contents should be declared */}
                <br/>


                <div className="ui segment">

                  <h3>Manage Administrators</h3>

                  {/* User Search */}
                  <div className="ui center aligned two row">
                    <div className="ui secondary  menu">
                      <div className="ui item">
                        <strong>Add/Remove Volunteer:</strong>
                      </div>
                      <div className="item">
                        <div className="ui icon input">
                          <input type="text" value={this.state.searchText} placeholder="Search by Name" onChange={this.handleSearchVolunteer} />
                          <i className="search link icon"></i>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Search results div */}
                  <div className="ui center aligned two row">
                    <div className="results">
                      {
                        this.state.searchText ? 
                        (
                          Object.keys(this.state.volunteerArray).length > 0 ? (
                            <div>
                              <div>
                                {/* <label className="ui label">Matched with "{this.state.activitySearchText}"</label> */}
                                <label className="ui label">Total Match: {Object.keys(this.state.volunteerArray).length}</label>

                                <table className="ui celled compact table">
                                  <thead>
                                    <tr>
                                      <th>Admin</th>
                                      <th>User ID</th>
                                      <th>First Name</th> 
                                      <th>Last Name</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {
                                      this.state.volunteerArray.map(volunteer => 
                                        <tr key={volunteer.userid}>
                                          <td>
                                              {
                                                volunteer.is_admin ? (
                                                  <div>
                                                    <button 
                                                    onClick={() => this.handleRemoveAdmin(volunteer.userid)}
                                                    className="ui icon button">
                                                      <i className="large green checkmark icon"></i>
                                                    </button>
                                                  </div>
                                                ) : (
                                                  <div>
                                                    <button value={volunteer.userid}
                                                    onClick={() => this.handleAddAdmin(volunteer.userid)}
                                                    className="ui icon button"
                                                    >
                                                      <i className="add icon"></i>
                                                    </button>
                                                  </div>
                                                )
                                              }
                                          </td>
                                          <td>{volunteer.userid}</td> 
                                          <td>{volunteer.first_name}</td> 
                                          <td>{volunteer.last_name}</td> 
                                        </tr>
                                      ) 
                                    }
                                  </tbody>
                                </table>


                              </div>
                            </div>
                          ) : (
                            <div>
                              <label className="ui label">Total Result: 0</label>
                              <div className="ui segment">No match</div>
                            </div>
                          )
                        ) : ( 
                          <div>
                            {/* null */}
                          </div>
                        ) // no input at activity search
                      }
                    </div>
                  </div>

                  <br />
                  {/* Div for displaying current admnistrators */}
                  { 
                    Object.keys(this.state.adminArray).length === 0 ? (
                      <div className="ui segment">
                        <h4>What, no admin?</h4>
                      </div>
                    ) : (
                      <div>
                        <div className="ui grid">
                          <div className="ten wide column">
                            <h3>Administrators List</h3>
                            {/* <strong>Volunteer Activities</strong> */}
                          </div>
                          <div className="five wide column">
                            <label className="ui label">Total: {Object.keys(this.state.adminArray).length}</label>
                          </div>
                        </div>
                        
                        <table className="ui celled compact table">
                          <thead>
                            <tr>
                              <th>Admin</th>
                              <th>User ID</th>
                              <th>First Name</th> 
                              <th>Last Name</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              this.state.adminArray.map(volunteer => 
                                <tr key={volunteer.userid}>
                                  <td>
                                      {
                                        volunteer.is_admin ? (
                                          <div>
                                            <button 
                                            onClick={() => this.handleRemoveAdmin(volunteer.userid)}
                                            className="ui icon button">
                                              <i className="large green checkmark icon"></i>
                                            </button>
                                          </div>
                                        ) : (
                                          <div>
                                            <button value={volunteer.userid}
                                            onClick={() => this.handleAddAdmin(volunteer.userid)}
                                            className="ui icon button"
                                            >
                                              <i className="add icon"></i>
                                            </button>
                                          </div>
                                        )
                                      }
                                  </td>
                                  <td>{volunteer.userid}</td> 
                                  <td>{volunteer.first_name}</td> 
                                  <td>{volunteer.last_name}</td> 
                                </tr>
                              ) 
                            }
                          </tbody>
                        </table>
                      </div>
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

export default ManageAdministrators;