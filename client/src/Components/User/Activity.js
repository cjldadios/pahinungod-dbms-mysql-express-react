import React, { Component } from 'react';

import Navbar from './../Navigations/Navbar';
import Sidebar from './../Navigations/Sidebar';

// import DatePicker from 'react-datepicker';

class Activity extends Component {
  constructor(props){
    super(props);
    this.state = {
      success: '',
      date: new Date(),
      username: localStorage.getItem("username"),
      email: "",
      password: "",

      activityCount: 0,
      userActivities: [],
      userActivitiesId: [],
      tempActivityIdForFetching: '', // passed as part of the body in fetching response
      tempActivityForFetching: '', // 
    }

    this.getUserInfo = this.getUserInfo.bind(this);
    this.getUserActivity = this.getUserActivity.bind(this);
    this.getActivity = this.getActivity.bind(this);


    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    console.log("Activity did mount.");
    this.getUserInfo();
    this.getUserActivity();

    localStorage.removeItem("asAdmin");
  }

  getUserInfo = async e => {
    const response = await fetch('/get-user-via-username', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: localStorage.getItem("username")
      })
    });
    
    const body = await response.text();

    // get the response object
    this.setState({ user: JSON.parse(body) }); // get as JSON object

    const userInfo = JSON.parse(body)[0];

    console.log("userInfo: " + JSON.stringify(userInfo));

      this.setState({ username: userInfo.username });
      this.setState({ email: userInfo.email });
      this.setState({ password: userInfo.password });
      this.setState({ surname: userInfo.last_name });
      this.setState({ firstname: userInfo.first_name });
      this.setState({ middlename: userInfo.middle_name });
      
  }

  getUserActivity = async e => {
    const response = await fetch('/user-activity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userid: localStorage.getItem("userid")
      })
    });
    
    const body = await response.text();

    const userActivitiesId = JSON.parse(body);
    // get user activities
    console.log("userActivitiesId: " + JSON.stringify(userActivitiesId));
    this.setState({ userActivitiesId: userActivitiesId});
    console.log("this.state.userActivitiesId: " + JSON.stringify(this.state.userActivitiesId));

    var countKey = Object.keys(this.state.userActivitiesId).length;

    console.log("countKey: " + countKey);

    this.setState({ activityCount: countKey });

    // after knowing the IDs of the user activity, fetch them again from the activity table for showing
    if(this.state.activityCount > 0) { // if there exist such
      this.getActivity();
    }
  }

  // getActivity(activityId) {
  getActivity = async e => {

    const response = await fetch('/get-activity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        activityid: this.state.userActivitiesId,
        activityIdCount: this.state.activityCount
      })
    });
    
    const body = await response.text(); // this should return a single row

    console.log("body: " + body);
   
    this.setState({ userActivities: JSON.parse(body) })
  }

  handleClick() {
    alert('pushi');
    this.props.history.push('/');
  }

  render() {
    return (
    	// opening delimiter div tag
      <div>
        <Navbar history={this.props.history}/>
        
        {/* this is how to include the sidebar */}
        <div className="ui grid">
          <div className="three wide column">
            <Sidebar {...this.props} asAdmin={false} showActivity={true} /> {/** this is the side bar */}
          </div>
          <div className="eleven wide column">    {/** this is where the USER Page contents should be declared */}
            <div className="center aligned two column row"></div>

            { // if zero activity, say "You have no activitiy yet"
              // else display activities table
              this.state.activityCount === 0 ? (
                <div className="ui segment">
                  <h4>You have no activities yet.</h4>
                </div>
              ) : (
                <div>
                  <label className="ui label">Total Activities: {this.state.activityCount}</label>

                  <table className="ui celled table">
                    <thead>
                      <tr>
                        <th>Activity ID</th>
                        <th>Name</th> 
                        <th>Description</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>No. of Volunteers</th>
                        <th>Participants</th>
                        <th>Coordinator-in-charge</th>
                        <th>User ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.userActivities.map(activity => 
                          <tr key={activity.activityId}>
                            <td data-label="Activity ID">{activity.activityId}</td> 
                            <td data-label="Name">{activity.activityname}</td> 
                            <td data-label="Description">{activity.description}</td>  
                            <td data-label="Start Date">{activity.startdate}</td>  
                            <td data-label="End Date">{activity.enddate}</td>  
                            <td data-label="No. of Volunteers">{activity.noOfVolunteers}</td> 
                            <td data-label="Participants">{activity.participants}</td> 
                            <td data-label="Coordinator-in-charge">{activity.coordinatorincharge}</td>  
                            <td data-label="User ID">{activity.userId}</td> 
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
	    </div> // closing delimiter div tag
    );
  }
}

export default Activity;