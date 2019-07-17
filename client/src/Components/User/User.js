import React, { Component }  from 'react';

import Navbar from './../Navigations/Navbar';

import Sidebar from './Sidebar';
import Activity from './Activity';
import Profile from './Profile';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: localStorage.getItem("authenticated"),
      message: localStorage.getItem("message"),
      username: localStorage.getItem("username"),
      
      displayActivity: true, // show activity page as default
      displayProfile: false,
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

  showActivity(e) {
    
  }

  render() {
    
    return (
      // <div>

      //   {/* this is how to include the sidebar */}
      //   <div className="ui grid">
      //     <div className="three wide column">
      //       <Sidebar {...this.props} asAdmin={false} showActivity={this.showActivity} showProfile={this.showProfile} /> {/** this is the side bar */}
      //     </div>
      //     <div className="eleven wide column">    {/** this is where the USER Page contents should be declared */}
      //       <div className="center aligned two column row">

      //         {/** main page content */}

      //         { // if 'Activity' is clicked from the side nav, render 'Activity' component
      //           this.state.displayActivity === true ? (
      //             <div>
      //               <Activity {...this.props} /> 
      //             </div>
      //           ) : ( // if 'Profile' is clicked from the side nav, render 'Profile' component
      //             this.state.displayProfile === true ? (
      //               <div>
      //                 <Profile {...this.props} showProfile={this.showProfile}/>
      //               </div>
      //             ) : ( // Else show this page with a simple heading
      //               <div>
      //                 <h2>User homepagei</h2>
      //               </div>
      //             )
      //           )
      //         }

      //         {/* <Profile {...this.props}/> */}
      //       </div>
      //     </div>
      //   </div>

      // </div>
    );
  }
}

export default User;