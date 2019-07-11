import React, { Component } from 'react';
// import logo from './logo.svg';
import { BrowserRouter, Route, Router } from 'react-router-dom'; // for url routing

// created components for testing
// import Tutorial from './Components/Test/Tutorial';
import Users from './Components/Test/Users';

// created components
import Home from './Components/Home/Home';
// import Login from './Components/Authentication/Login';
import User from './Components/User/User';
import Admin from './Components/Admin/Admin';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import Profile from './Components/User/Profile';
import Activity from './Components/User/Activity';

import Signup2 from './Components/Signup/Signup2';
import Signup3 from './Components/Signup/Signup3';


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
        <Router history={history}>
          {/*
          * The Tutorial component is rendered at url = http://localhost:3000/tutorial 
          * the exact parameter when set to true renders only the component with the exact path
          */}
          <Route exact={true} path='/users' component={ Users } />

          <Route exact={true} path='/' component={ Home } />
          {/* <Route exact path='/login' component={ Login } /> */}
          <Route exact path='/user/' component={ User } />
          <Route path='/user/:id' component={ User } />
          <Route exact path='/admin/' component={ Admin } />
          <Route path='/admin/:id' component={ Admin } />
          <Route exact path='/signup/' component={ Signup } />
          <Route exact path='/login/' component={ Login } />
          <Route path='/user/activity' component={ Activity } />

          <Route path='/user/profile' component={ Profile } />

          <Route exact path='/signup2' component={ Signup2 } />
          <Route exact path='/signup3' component={ Signup3 } />
        </Router>
      </BrowserRouter>
    );
  }
}

export default App;