import React, { Component }  from 'react';

import Navbar from './../Navigations/Navbar';
import Sidebar from './../Navigations/Sidebar';

class ManageVolunteers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: localStorage.getItem("authenticated"),
      message: localStorage.getItem("message"),

      username: localStorage.getItem("username"),

      usersArray: [],
      usersCount: 0,
    };

    this.getAllUsers = this.getAllUsers.bind(this);
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
    console.log("usersArray: " + JSON.stringify(usersArray));
    this.setState({ usersArray: usersArray});
    
    var usersCount = Object.keys(this.state.usersArray).length;

    console.log("usersCount: " + usersCount);

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
          <p>Not an administrator. <a href="/user">Go back</a></p>
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
                
                <div className="ui segment">
                  <div className="ui center aligned two row">
                    <div className="column">
                      <h3>Manage Volunteers Pagei</h3>
                    </div>
                  </div>

                  <div></div>

                  <div className="column">
                    <table className="ui celled table">
                      <thead>
                        <tr>
                          <th>userid</th>
                          <th>username</th> 
                          <th>password</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.state.usersArray.map(user => 
                            <tr key={user.userid}>
                              <td>{user.userid}</td>
                              <td>{user.username}</td>
                              <td>{user.password}</td>
                            </tr>
                          ) 
                        }
                      </tbody>
                    </table>
                  </div>

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