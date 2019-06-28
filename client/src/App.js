import React, { Component } from 'react';
// import logo from './logo.svg';
import { BrowserRouter, Route } from 'react-router-dom'; // for url routing

// created components for testing
import Tutorial from './Components/Test/Tutorial';
import Users from './Components/Test/Users';

// created components
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';

class App extends Component {
  
  render() {
    return (
      <BrowserRouter className="App">
        {/*
        * The Tutorial component is rendered at url = http://localhost:3000/tutorial 
        * the exact parameter when set to true renders only the component with the exact path
        */}
        <Route exact={true} path='/tutorial' component={ Tutorial } />
        <Route exact={true} path='/users' component={ Users } />

        <Route exact={true} path='/' component={ Home } />
        <Route exact={true} path='/login' component={ Login } />
      </BrowserRouter>
    );
  }
}

export default App;