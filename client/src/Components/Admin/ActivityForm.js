import React, { Component } from 'react';

// import Navbar from '../Navigations/Navbar';
// import Sidebar from './../Navigations/Sidebar';

import DatePicker from 'react-datepicker';

class ActivityForm extends Component {
  constructor(props){
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.genericHandleChange = this.genericHandleChange.bind(this); // generic item change handler

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeStartdate = this.handleChangeStartdate.bind(this);
    this.handleChangeEnddate = this.handleChangeEnddate.bind(this);
    this.getActivityData = this.getActivityData.bind(this);
    this.handleChangeNoofvolunteers = this.handleChangeNoofvolunteers.bind(this);

    this.createNewActivityRequest = this.createNewActivityRequest.bind(this);
    this.editActivityRequest = this.editActivityRequest.bind(this);

    this.state = {
      activityid: '',
      activityname: '',
      description: '',
      startdate: '',
      enddate: '',
      noofvolunteers: 0, // must be initialized as an int to be react at the input
      participants: '',
      coordinatorincharge: '',
      userid: '',

      startdateObject: '',
      enddateObject: '',
      startdateFormatted: '',
      enddateFormatted: '',
    }

  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // genericHandleChange = (e, { value }) => this.setState({ value });
  genericHandleChange(e) {
    console.log("changing state [" + e.target.name + "] to [" + e.target.value + "]");
    this.setState({ [e.target.name]: e.target.value });
  }

  handleChangeStartdate(date) {
    this.setState({ startdateObject: date });
    // console.log("date: " + date);
    // var dateString = (date.getMonth() + 1 ) + '/' + date.getDate() + '/' + date.getFullYear();
    // console.log("dateString: " + dateString);
    // this.setState({ startdate: dateString});
    var dateFormatted = date.getFullYear() + '-' + date.getMonth() + '-' +date.getDate();
    this.setState({ startdate: dateFormatted});
  }

  handleChangeEnddate(date) {
    this.setState({ enddateObject: date });
    // console.log("date: " + date);
    // var dateString = (date.getMonth() + 1 ) + '/' + date.getDate() + '/' + date.getFullYear();
    // console.log("dateString: " + dateString);
    // this.setState({ enddate: dateString});
    var dateFormatted = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();      
    this.setState({ enddate: dateFormatted});
  }

  handleChangeNoofvolunteers(e) {
    this.setState({ noofvolunteers: e.target.value });
    console.log("vol count: " + e.target.value);
  }

  handleSubmit(e) {
    // validate input here
    // alert("input not validated");

    if(this.props.new) {
      console.log("Creating a new activity");
      this.createNewActivityRequest();
    } else {
      this.editActivityRequest();
    }

    if (this.props.alertMessage) {
      alert(this.props.alertMessage);
    }
  }

  createNewActivityRequest = async e => {
    alert("Create new activity request");    
    const response = await fetch('/admin-add-activity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: this.state,
      }),
    });
    const body = await response.text();
    // get the response object
    this.setState({ message: body }); // get as JSON object
    this.setState({ success: true });
    alert(body);
  }

  editActivityRequest = async e => {
    const response = await fetch('/admin-edit-activity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: this.state,
      }),
    });
    const body = await response.text();
    // get the response object
    this.setState({ message: body });
    alert(body);
  }
  
  // this method is invoked by the componentDidMount method to set this component's state
  getActivityData = async e => {
    // console.log("Here at getActivityData");
    // console.log("Requesting Activity data by passing to 'body' parameters 'activityid' of 'this.props.activityid'");

    const response = await fetch('/get-activity-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        activityid: this.props.activityid // this has been established
      })
    });
    
    const body = await response.text();

    // get the response object
    // this.setState({ user: JSON.parse(body) }); // get as JSON object

    const activityData = JSON.parse(body)[0];
    // console.log("Response: " + JSON.stringify(activityData));

    // console.log("activityData.noofvolunteers 1: " + activityData.noofvolunteers);

    this.setState({ activityid: activityData.activityId }); // or this,props.activityid
    this.setState({ activityname: activityData.activityname });
    this.setState({ description: activityData.description });
    this.setState({ startdate: activityData.startdate });
    this.setState({ enddate: activityData.enddate });
    this.setState({ noofvolunteers: activityData.noOfVolunteers });
    this.setState({ participants: activityData.participants });
    this.setState({ coordinatorincharge: activityData.coordinatorincharge });

    // setting up startdate and startdateObject
    if(this.state.startdate === null || this.state.startdate === undefined || this.state.startdate === '') {
      console.log("Undefined startdate!");
      // var nodate = new Date();
      // nodate.setMonth(0);
      // nodate.setDate(1);
      // nodate.setFullYear(2000);
      // this.setState({ startdateObject: nodate });  // the default is 01/01/2000
      // but let the default be blank
      console.log("this.state.startdate: " + this.state.startdate);
      this.setState({ startdate: "0000-00-00" });
      console.log("this.state.startdate: " + this.state.startdate);
    } else {
      console.log("this.state.startdate: " + this.state.startdate);
      var parsedDate = this.state.startdate.split('-'); // this wouldn't work, because its format is like this 2019-03-02T16:00:00.000Z
      
      var newdate = new Date();
      console.log("parsedDate[0]: " + parsedDate[0]); // year
      console.log("parsedDate[1]: " + parsedDate[1]); // month
      console.log("parsedDate[2]: " + parsedDate[2]); // day but...
      // ...the day has some trailing characters
      // so parse the leading int which is the date
      var daydate = parseInt(parsedDate[2], 10); // 10 for base 10
      console.log("parseInt(parsedDate[2]): " + daydate); // trailing characters
      newdate.setMonth(parsedDate[1]);
      newdate.setDate(daydate + 1);
      newdate.setFullYear(parsedDate[0]);
      this.setState({ startdateObject: newdate });
      console.log("this.state.startdate: " + this.state.startdate);
      this.setState({ startdateObject: newdate });
    }

    // setting up enddate and enddateObject
    if(this.state.enddate === null || this.state.enddate === undefined || this.state.enddate === '') {
      console.log("Undefined enddate!");
      console.log("this.state.enddate: " + this.state.enddate);
      this.setState({ enddate: "0000-00-00" });
      console.log("this.state.enddate: " + this.state.enddate);
    } else {
      console.log("this.state.enddate: " + this.state.enddate);
      var parsedEnddate = this.state.enddate.split('-'); // this wouldn't work, because its format is like this 2019-03-02T16:00:00.000Z
      
      var newEnddate = new Date();
      console.log("parsedEnddate[0]: " + parsedEnddate[0]); // year
      console.log("parsedEnddate[1]: " + parsedEnddate[1]); // month
      console.log("parsedEnddate[2]: " + parsedEnddate[2]); // day but...
      // ...the day has some trailing characters
      // so parse the leading int which is the date
      var enddateDay = parseInt(parsedEnddate[2], 10); // base 10
      console.log("parseInt(parsedEnddate[2]): " + enddateDay); // trailing characters
      newEnddate.setMonth(parsedEnddate[1]);
      newEnddate.setDate(enddateDay + 1);
      newEnddate.setFullYear(parsedEnddate[0]);
      this.setState({ enddateObject: newEnddate });
      console.log("this.state.enddate: " + this.state.enddate);
      this.setState({ enddateObject: newEnddate });

    }
  }

  componentDidMount() {
    // if editing an existing account
    // console.log("Invoked componentDidMount()");

    // console.log("this.props.activityid: " + this.props.activityid);
    // console.log("this.props.activityid === undefined:" + this.props.activityid === undefined);
    // console.log("this.props.activityid === 'undefined':" + this.props.activityid === 'undefined');
    // console.log("this.props.activityid === true: " + this.props.activityid === true);
    // console.log("this.props.activityid === null: " + this.props.activityid === null);
    
    // console.log("this.props.new:" + this.props.new);

    // console.log("Add new activity?");
    if(this.props.new) { // true
      // console.log("Creating new activity.");

      // means creating an new account
      // let the states be blank
      // console.log("The passed prop 'new' is 'true' so this means that the Application is going to create a new account.");

    } else {
      // console.log("Editing actvity...getting activity data.");
      
      // console.log("Editing the 'activity', from props, with activiyid: " + this.props.activiyid);
      this.setState({ userid: this.props.activiyid });
      // console.log("Calling getActivityData()");
      this.getActivityData();
    }
  }

  render() {
    return (
    	// opening delimiter div tag
      <div>
        <h4 className="ui dividing header">Activiy Information</h4>
        
        <form className="ui form" onSubmit={this.handleSubmit}>
          <div className="field">
            <label>Activity Name</label>
            <input type="text" name="activityname" placeholder="Activity Name" defaultValue={this.state.activityname}
            onChange={this.genericHandleChange}/>
          </div>
          <div className="field">
            <label>Description</label>
            <input type="text" name="description" placeholder="Description" defaultValue={this.state.description} onChange={this.genericHandleChange} />
          </div>
          <div className="two fields">
            <div className="four wide field">
              <label>Start date</label>
              <DatePicker disabledKeyboardNavigation
                selected={this.state.startdateObject}
                placeholderText="mm/dd/yyyy"
                onChange={this.handleChangeStartdate}/>
            </div>
            <div className="four wide field">
              <label>End date</label>
              <DatePicker disabledKeyboardNavigation
                selected={this.state.enddateObject}
                placeholderText="mm/dd/yyyy"
                onChange={this.handleChangeEnddate}/>
            </div>
          </div>
          <div className="four wide field">
            <label>Number of Volunteers</label>
            <input type="number" min="0" placeholder="Number of Volunteers" value={this.state.noofvolunteers} onChange={this.handleChangeNoofvolunteers} />
          </div>
          <div className="field">
            <label>Participants</label>
            <input type="text" name="participants" placeholder="Participants" defaultValue={this.state.participants} onChange={this.genericHandleChange} />
          </div>
          <div className="field">
            <label>Coordinator-in-charge</label>
            <input type="text" name="coordinatorincharge" placeholder="Coordinator-in-charge" defaultValue={this.state.coordinatorincharge} onChange={this.genericHandleChange}/>
          </div>
                            
          <button className="ui positive button" type="submit">Submit</button>
        </form>
        
	    </div> // closing delimiter div tag
    );
  }
}

export default ActivityForm;