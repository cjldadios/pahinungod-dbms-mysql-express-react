import React, { Component } from 'react';

// import DatePicker from 'react-datepicker';

class UserActivity extends Component {
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

      searchedActivities: [],
      selectedUserObject: ''
    }

    this.getUserActivity = this.getUserActivity.bind(this);
    this.getActivity = this.getActivity.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getDate = this.getDate.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  componentDidMount() {
    this.getUserInfo();
    this.getUserActivity();
  }

  getUserActivity = async e => {
    const response = await fetch('/user-activity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userid: this.props.userid
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

  getUserInfo = async e => {
    const response = await fetch('/get-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userid: this.props.userid
      })
    });
    const body = await response.text();
    // get the response object
    this.setState({ selectedUserObject: JSON.parse(body)[0] }); // get as JSON object, first row since one unique
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

  getDate(originalDate) {
    // raw date is like this 2019-03-02T16:00:00.000Z 

    var parsedDate = originalDate.split('-');
    
    console.log("parsedDate[0]: " + parsedDate[0]); // year
    console.log("parsedDate[1]: " + parsedDate[1]); // month
    console.log("parsedDate[2]: " + parsedDate[2]); // day but...
    // ...the day has some trailing characters
    // so parse the leading int which is the date
    var daydate = parseInt(parsedDate[2], 10); // 10 for base 10
    console.log("parseInt(parsedDate[2]): " + daydate); // trailing characters
    
    return( parsedDate[1] + "/" + daydate + "/" + parsedDate[0] );
  }

  render() {
    return (
    	// opening delimiter div tag
      <div>
        
        <div className="ui grid">
          
          <div className="eleven wide column">    {/** this is where the USER Page contents should be declared */}
            <div className="center aligned two column row"></div>

            <div className="ui center aligned two row">
              <div className="column">
                <h3>Managing Activities of <a>{this.state.selectedUserObject.first_name + " " + this.state.selectedUserObject.last_name}</a></h3>
              </div>
            </div>

            <br/>

            <div className="ui center aligned two row">
              <div className="ui secondary  menu">
                <div className="ui item">
                  <strong>Add Activity:</strong>
                </div>
                <div className="item">
                  <div className="ui icon input">
                    <input type="text" placeholder="Activity Name"/>
                    <i className="search link icon"></i>
                  </div>
                </div>
                <div className="item">
                  <button onClick={this.searchActivityByName} className="ui button">Search</button>
                </div>
              </div>
            </div>

            <div className="ui center aligned two row">
              <div className="results">

              </div>
            </div>

            <br/>

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
                        {/* <th>User ID</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.userActivities.map(activity => 
                          <tr key={activity.activityId}>
                            <td data-label="Activity ID">{activity.activityId}</td> 
                            <td data-label="Name">{activity.activityname}</td> 
                            <td data-label="Description">{activity.description}</td>  
                            <td data-label="Start Date">{this.getDate(activity.startdate)}</td>  
                            <td data-label="End Date">{this.getDate(activity.enddate)}</td>  
                            <td data-label="No. of Volunteers">{activity.noOfVolunteers}</td> 
                            <td data-label="Participants">{activity.participants}</td> 
                            <td data-label="Coordinator-in-charge">{activity.coordinatorincharge}</td> {/* <td data-label="User ID">{activity.userId}</td>  */}
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

export default UserActivity;