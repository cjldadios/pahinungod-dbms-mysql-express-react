import React, { Component } from 'react';

// import DatePicker from 'react-datepicker';


var globalvar1 = 0;

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

      searchedActivitiesArray: [],
      selectedUserObject: '',
      activitySearchText: '',
    }

    this.getUserActivity = this.getUserActivity.bind(this);
    this.getActivity = this.getActivity.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getDate = this.getDate.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.handleActivitySearch = this.handleActivitySearch.bind(this);
    this.isVolunteerActivity = this.isVolunteerActivity.bind(this);
    this.handleAddActivity = this.handleAddActivity.bind(this);
    this.handleRemoveActivity = this.handleRemoveActivity.bind(this);
    this.addUserActivity = this.addUserActivity.bind(this);
    this.removeUserActivity = this.removeUserActivity.bind(this);
  }

  componentDidMount() {
    this.getUserInfo();
    this.getUserActivity();
    this.searchActivity(); 
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
    // console.log("userActivitiesId: " + JSON.stringify(userActivitiesId));
    this.setState({ userActivitiesId: userActivitiesId});
    console.log("this.state.userActivitiesId: " + JSON.stringify(this.state.userActivitiesId));

    var countKey = Object.keys(this.state.userActivitiesId).length;

    // console.log("countKey: " + countKey);

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
    // console.log("body: " + body);
    this.setState({ userActivities: JSON.parse(body) })
  }

  handleClick() {
    alert('pushi');
    this.props.history.push('/');
  }

  getDate(originalDate) {
    // raw date is like this 2019-03-02T16:00:00.000Z 
    var parsedDate = originalDate.split('-');
    // console.log("parsedDate[0]: " + parsedDate[0]); // year
    // console.log("parsedDate[1]: " + parsedDate[1]); // month
    // console.log("parsedDate[2]: " + parsedDate[2]); // day but...
    // ...the day has some trailing characters
    // so parse the leading int which is the date
    var daydate = parseInt(parsedDate[2], 10); // 10 for base 10
    // console.log("parseInt(parsedDate[2]): " + daydate); // trailing characters
    return( parsedDate[1] + "/" + daydate + "/" + parsedDate[0] );
  }

  handleActivitySearch(e) {
    this.setState({ activitySearchText: e.target.value })
    // call the function to query with 'activitySearchText' set as parameter
    this.searchActivity();
    // which also changes the state of the activity search result array
  }

  searchActivity = async e => {
    const response = await fetch('/search-activity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        searchText: this.state.activitySearchText
      })
    });
    const body = await response.text(); // this should return a single row
    // console.log("body: " + body);
    this.setState({ searchedActivitiesArray: JSON.parse(body) });
  }

  isVolunteerActivity(id) {
    for(var i=0; i < this.state.userActivitiesId.length; i++){
      // console.log("comparing id: " + id  + " with userActivityId: " + this.state.userActivitiesId[i].activityid);
      // console.log("match: " + (this.state.userActivitiesId[i].activityid === id.toString()));
      if(this.state.userActivitiesId[i].activityid === id.toString()){
        return(true);
      }
    }
    return(false);
  }

  // rather than setting a state variable, these two methods sets the value of a global variable to perform a query, because these methods are called by a dynamic component rendered by a this.state.variable.map() function
  handleAddActivity(activityId) {
    globalvar1 = activityId;
      this.addUserActivity();
  }
  handleRemoveActivity(activityId) {
    globalvar1 = activityId;
    this.removeUserActivity();
  }

  addUserActivity = async e => {
    console.log("Here at addUserActivity");
    console.log("userid: " + this.props.userid);
    console.log("activityid: " + this.state.tempActivityIdForFetching);
    const response = await fetch('/add-user-activity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userid: this.props.userid,
        activityid: globalvar1
      })
    });
    const body = await response.text(); 
    console.log("Fetch response: " + body);
    // this.setState({ userActivities: JSON.parse(body) })
    this.getUserActivity() // reload user activities using the function called at componentDidMount()
  }

  removeUserActivity = async e => {
    const response = await fetch('/remove-user-activity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userid: this.props.userid,
        activityid: globalvar1
      })
    });
    const body = await response.text(); 
    console.log("Fetch response: " + body);
    // this.setState({ userActivities: JSON.parse(body) })
    this.getUserActivity() // reload user activities using the function called at componentDidMount()    
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
                    <input type="text" value={this.state.activitySearchText} placeholder="Activity Name" onChange={this.handleActivitySearch} />
                    <i className="search link icon"></i>
                  </div>
                </div>
                <div className="ui item">
                  <div>Search by:</div>
                </div>
                <div className="active item">
                  Name
                </div>
              </div>
            </div>

            <div className="ui center aligned two row">
              <div className="results">
                {
                  this.state.activitySearchText ? 
                    (
                      Object.keys(this.state.searchedActivitiesArray).length > 0 ? (
                        <div>
                          <div>
                            <label className="ui label">Matched with "{this.state.activitySearchText}"</label>
                            <label className="ui label">Total: {Object.keys(this.state.searchedActivitiesArray).length}</label>

                            <table className="ui celled compact table">
                              <thead>
                                <tr>
                                  <th>Add</th>
                                  <th>Activity ID</th>
                                  <th>Name</th> 
                                  <th>Description</th>
                                  <th>Start Date</th>
                                  <th>End Date</th>
                                  <th>No. of Volunteers</th>
                                  <th>Participants</th>
                                  <th>Coordinator-in-charge</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  this.state.searchedActivitiesArray.map(activity => 
                                    <tr key={activity.activityId}>
                                      <td>
                                          {
                                            this.isVolunteerActivity(activity.activityId) ? (
                                              <div>
                                                <button 
                                                onClick={() => this.handleRemoveActivity(activity.activityId)}
                                                className="ui icon button">
                                                  <i className="large green checkmark icon"></i>
                                                </button>
                                              </div>
                                            ) : (
                                              <div>
                                                <button value={activity.activityId}
                                                onClick={() => this.handleAddActivity(activity.activityId)}
                                                className="ui icon button"
                                                >
                                                  <i className="add icon"></i>
                                                </button>
                                              </div>
                                            )
                                          }
                                      </td>
                                      <td data-label="Activity ID">{activity.activityId}</td> 
                                      <td data-label="Name">{activity.activityname}</td> 
                                      <td data-label="Description">{activity.description}</td>  
                                      <td data-label="Start Date">{this.getDate(activity.startdate)}</td>  
                                      <td data-label="End Date">{this.getDate(activity.enddate)}</td>  
                                      <td data-label="No. of Volunteers">{activity.noOfVolunteers}</td> 
                                      <td data-label="Participants">{activity.participants}</td> 
                                      <td data-label="Coordinator-in-charge">{activity.coordinatorincharge}</td>
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
                    ) : ( null ) // no input at activity search
                }
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
                  <div className="ui grid">
                    <div className="ten wide column">
                      <h3>Volunteer Activities</h3>
                      {/* <strong>Volunteer Activities</strong> */}
                    </div>
                    <div className="five wide column">
                      <label className="ui label">Total Activities: {this.state.activityCount}</label>
                    </div>
                  </div>
                  
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
                            <td data-label="Coordinator-in-charge">{activity.coordinatorincharge}</td>
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