import React, { Component } from 'react';
// import logo from './logo.svg';
import { BrowserRouter, Route, Router } from 'react-router-dom'; // for url routing

// created components for testing
import Tutorial from './Components/Test/Tutorial';
import Users from './Components/Test/Users';

// created components
import Home from './Components/Home/Home';
// import Login from './Components/Authentication/Login';
import User from './Components/User/User';
import Admin from './Components/Admin/Admin';


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
          <Route exact path='/tutorial' component={ Tutorial } />
          <Route exact path='/users' component={ Users } />

          <Route exact path='/' component={ Home } />
          {/* <Route exact path='/login' component={ Login } /> */}
          <Route exact path='/user/:id' component={ User } />
          <Route exact path='/user/' component={ User } />
          <Route exact path='/admin/:id' component={ Admin } />
          <Route exact path='/admin/' component={ Admin } />
        </Router>
      </BrowserRouter>
    );
  }
}

export default App;