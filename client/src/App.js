import React, { Component } from 'react';
import { BrowserRouter, Route, Router } from 'react-router-dom'; // for url routing

// created components 
// import Navbar from './Components/Navigations/Navbar';
import Login from './Components/Authentication/Login';
import Signup from './Components/Authentication/Signup';

import Profile from './Components/User/Profile';
import Activity from './Components/User/Activity';

import ManageVolunteers from './Components/Admin/ManageVolunteers';
import ManageActivities from './Components/Admin/ManageActivities';
import ManagePrograms from './Components/Admin/ManagePrograms';
import ManageAdministrators from './Components/Admin/ManageAdministrators';

import history from './history'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: localStorage.getItem("authenticated"),
      message: localStorage.getItem("message"),

      username: localStorage.getItem("username"),
    };
  }
  
  render() {
    return (
      <BrowserRouter className="App">
        {/* <div className="ui primary menu">
          <a className="item" href="/">/</a>
          <a className="item" href="/login">/login</a>
          <a className="item" href="/user/activity">/user/activity</a>
          <a className="item" href="/user/profile">/user/profile</a>
          <a className="item" href="/admin/manage-activities">/admin/manage-activities</a>
          <a className="item" href="/admin/manage-volunteers">/admin/manage-volunteers</a>
        </div> */}
        
        <Router history={history}>
 
          <Route exact={true} path='/' component={ Login } />
          <Route exact={false} path='/login' component={ Login } />
          <Route exact={false} path='/logout' component={ Login } />
          <Route exact={false} path='/signup' component={ Signup } />

          <Route exact={false} path='/user/activity' component={ Activity } />
          <Route exact={false} path='/user/profile' component={ Profile } />

          <Route exact={false} path='/admin/manage-volunteers' component={ ManageVolunteers } />
          <Route exact={false} path='/admin/manage-activities' component={ ManageActivities } />
          <Route exact={false} path='/admin/manage-programs' component={ ManagePrograms } />
          <Route exact={false} path='/admin/manage-administrators' component={ ManageAdministrators } />
          
        </Router>
      </BrowserRouter>
    );
  }
}

export default App;