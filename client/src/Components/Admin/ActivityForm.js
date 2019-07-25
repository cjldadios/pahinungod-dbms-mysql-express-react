import React, { Component } from 'react';

// import Navbar from '../Navigations/Navbar';
// import Sidebar from './../Navigations/Sidebar';

import DatePicker from 'react-datepicker';

class ActivityForm extends Component {
  constructor(props){
    super(props);

    this.genericHandleChange = this.genericHandleChange.bind(this); // generic item change handler
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeStartdate = this.handleChangeStartdate.bind(this);
    this.handleChangeEnddate = this.handleChangeEnddate.bind(this);
    this.getActivityData = this.getActivityData.bind(this);

    this.createNewActivityRequest = this.createNewActivityRequest.bind(this);

    this.state = {
      activityid: '',
      activityname: '',
      description: '',
      startdate: '',
      enddate: '',
      noofvolunteers: '',
      participants: '',
      coordinatorincharge: '',
      userid: '',

      startdateObject: '',
      enddateObject: '',
      startdateFormatted: '',
      enddateFormatted: '',
    }

  }

  // genericHandleChange = (e, { value }) => this.setState({ value });
  genericHandleChange(e) {
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

  handleSubmit(e) {
    // validate input here
    alert("input not validated");

    if(this.props.new) {
      console.log("Creating a new activity");
      this.createNewActivityRequest();
    } else {
      // this.handleValidSignup();
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
      // body: JSON.stringify({
      //   activityid: this.state.activityid,
      //   activityname: this.state.activityname,
      //   description: this.state.description,
      //   startdate: this.state.startdate,
      //   enddate: this.state.enddate,
      //   noofvolunteers: this.state.noofvolunteers,
      //   participants: this.state.participants,
      //   coordinatorincharge: this.state.coordinatorincharge,
      //   userid: this.state.userid,
      // }),
      body: JSON.stringify({
        data: this.state,
      }),
    });
    const body = await response.text();
    // get the response object
    this.setState({ message: body }); // get as JSON object
    this.setState({ success: true });

    localStorage.setItem("authenticated", true);
    this.setState({authenticated: true});
    
    alert(body);
  }

  handleValidCreateNewAccount = async e => {
    // e.preventDefault();
    const response = await fetch('/admin-create-new-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({
      //   firstname: this.state.fistName,
      //   lastname: this.state.lastName,
      //   username: this.state.username,
      //   email: this.state.email,
      //   password: this.state.password
      // }),
      body: JSON.stringify({
        data: this.state
      })
    });
    const body = await response.text();
    // get the response object
    this.setState({ message: body }); // get as JSON object
    this.setState({ success: true });

    localStorage.setItem("authenticated", true);
    this.setState({authenticated: true});
    
    alert("Server response: " + body);

  }

  
  // this method is invoked by the componentDidMount method to set this component's state
  getActivityData = async e => {
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

    console.log("ActivityForm... " + JSON.stringify(activityData));

    // this.setState({ username: userInfo.username });
    // this.setState({ email: userInfo.email });

    // if(this.state.birthday === null || this.state.birthday === undefined || this.state.birthday === '') {
    //   var nobirthdate = new Date();
    //   nobirthdate.setMonth(0);
    //   nobirthdate.setDate(1);
    //   nobirthdate.setFullYear(2000);
    //   this.setState({ date: nobirthdate });        
    //   console.log("state birthday: " + this.state.birtday)
    //   console.log("this.state.date: " + this.state.date);
    // } else {
    //   var parsedDate = this.state.birthday.split('/');
    //   var birthdate = new Date();
    //   console.log("parsedDate[0]: " + parsedDate[0])
    //   console.log("parsedDate[1]: " + parsedDate[1])
    //   console.log("parsedDate[2]: " + parsedDate[2])
    //   birthdate.setMonth(parsedDate[0] - 1);
    //   birthdate.setDate(parsedDate[1]);
    //   birthdate.setFullYear(parsedDate[2]);
    //   this.setState({ date: birthdate });
    //   console.log("state birthday: " + this.state.birtday)
    //   console.log("this.state.date: " + this.state.date);
    // }
  }

  componentDidMount() {
    // if editing an existing account

    if(this.props.userid) { // if a userid prop is passed
      console.log("Editing the user from props with userid: " + this.props.userid);
      this.setState({ userid: this.props.userid });
      this.getActivityData();
    } else { // no userid pass
      // means creating an new account
      // let the states be blank
      console.log("No userid was passed as a prop so this means that the Application is going to create a new account.");
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
            <input type="number" name="numberofvolunteers" placeholder="Number of Volunteers" defaultValue={this.state.numberofvolunteers} onChange={this.genericHandleChange} />
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