import React, { Component }  from 'react';

// The Login component is imported from Login.js in ../Login directory
// import Login from './../Login/Login'

import Navbar from './../Navbar/Navbar';
import Sidebar from './../Navbar/Sidebar';
import Activity from './Activity';
import Profile from './Profile';

class User extends Component {
  constructor(props) {
    super(props);

    this.showActivity = this.showActivity.bind(this);
    this.showProfile = this.showProfile.bind(this);

    this.state = {
      authenticated: localStorage.getItem("authenticated"),
      message: localStorage.getItem("message"),
      username: localStorage.getItem("username"),
      
      displayProfile: true,
      displayActivity: false,
    };
  }

  componentDidMount() {
    // if user is not logged in
    console.log("authenticated: " + localStorage.getItem('authenticated'));
    if(!localStorage.getItem('authenticated')) {
      console.log("not Authenticated");
      this.props.history.push('/');
    }
    console.log("User is Authenticated");
  }

  showActivity() {
    console.log("clicked showActivity");
    console.log('before setState');
    console.log('this.state.displayActivity: ' + this.state.displayActivity);
    console.log('this.state.displayProfile: ' + this.state.displayProfile);
    this.setState({ displayActivity: true });
    this.setState({ displayProfile: false });
    console.log('after setState');
    console.log('this.state.displayActivity: ' + this.state.displayActivity);
    console.log('this.state.displayProfile: ' + this.state.displayProfile);
  }

  showProfile() {
    console.log("clicked showProfile");
    console.log('before setState');
    console.log('this.state.displayActivity: ' + this.state.displayActivity);
    console.log('this.state.displayProfile: ' + this.state.displayProfile);
    this.setState({ displayActivity: false });
    this.setState({ displayProfile: true });
    console.log('after setState');
    console.log('this.state.displayActivity: ' + this.state.displayActivity);
    console.log('this.state.displayProfile: ' + this.state.displayProfile);
  }

  render() {
    
    return (
      <div>
        {/* <div className="ui grid">
          <div className="two wide column">
            <div className="ui secondary menu">
              <div className="item">
                <div className="three wide column">
                  <h4>{
                    this.props.asAdmin ? 'Administrator' : 'Volunteer'
                  }</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="column">          
            <Navbar {...this.props} asAdmin={false}/>
          </div>
        </div> */}

        <Navbar {...this.props} asAdmin={false}/>

        {/* this is how to include the sidebar */}
        <div className="ui grid">
          <div className="three wide column">
            <Sidebar {...this.props} asAdmin={false} showActivity={this.showActivity} showProfile={this.showProfile} /> {/** this is the side bar */}
          </div>
          <div className="column">    {/** this is where the USER Page contents should be declared */}
            <h1>Hey!</h1>
            <p>this.displayActivity: {this.displayActivity}</p>
            <p>this.displayProfile: {this.displayProfile}</p>
            {/** main page content */}
            {/* // if 'Activity' is clicked from the side nav, render 'Activity' component
              this.displayActivity === true ? (
                <div>
                  <Activity {...this.props} /> 
                </div>
              ) : ( // if 'Profile' is clicked from the side nav, render 'Profile' component
                this.displayProfile === true ? (
                  <div>
                    <Profile {...this.props}/>
                  </div>
                ) : ( // Else show this page with a simple heading
                  <div>
                    <h2>User homepagei</h2>
                  </div>
                )
              )
                */}

              <Profile {...this.props}/>
          
          </div>
        </div>

      </div>
    );
  }
}

export default User;