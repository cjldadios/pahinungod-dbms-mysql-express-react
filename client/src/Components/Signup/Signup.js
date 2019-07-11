import React, { Component } from 'react';
// import { Button, Segment, Header, Form, Divider, Responsive, Grid, Image } from 'semantic-ui-react';
import HomeNav from './../Navbar/HomeNav';

import Logout from './../Login/Logout'

import * as EmailValidator from 'email-validator';

class Signup extends Component {
  constructor(props){
    super(props);

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleValidSignup = this.handleValidSignup.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      firstName: '',
      middleName: '',
      lastName: '',
      username: "",
      email: "",
      password: "",
      retypedPassword: "",

      validFirstName: '',
      validMiddleName: '',
      validLastName: '',
      validUsername: '',
      validEmail: '',
      validPassword: '',
      matchedPassword: '',
      
      takenUsername: '',
      takenPassword: '',

      authenticated: localStorage.getItem("authenticated"),

      message: localStorage.getItem("message"),
    }
  }

  handleChangeFirstName = e => {
    this.setState({ firstName: e.target.value });
    if(this.state.firstName === '' || this.state.firstName ) {
      this.setState({ validFirstName: false });
    } else {
      this.setState({ validFirstName: true });
    }
  }

  handleChangeMiddleName = e => {
    this.setState({ middleName: e.target.value });
    if(this.state.middleName === '' || this.state.middleName ) {
      this.setState({ validMiddleName: false });
    } else {
      this.setState({ validMiddleName: true });
    }
  }

  handleChangeLastName = e => {
    this.setState({ lastName: e.target.value });
    if(this.state.lastName === '' || this.state.lastName ) {
      this.setState({ validLastName: false });
    } else {
      this.setState({ validLastName: true });
    }
  }

  handleChangeEmail = e => {
    this.setState({ email: e.target.value });
    if( EmailValidator.validate(this.state.email) ) {
      this.setState({ validEmail: true });
    } else {
      this.setState({ validEmail: false });
    }
  }

  handleChangeUsername = e => {
    this.setState({ username: e.target.value });

    // check the database if the user is taken
  }

  handleChangePassword = e => {
    this.setState({ password: e.target.value });
    if(this.state.password === '' ) {
      this.setState({ validPassword: false });
    } else {
      this.setState({ validPassword: true });
    }
  }
  

  handleChangeRetypedPassword = e => {
    this.setState({ retypedPassword: e.target.value });
    if(this.state.retypedPassword === this.state.password ) {
      this.setState({ matchedPassword: true });
    } else {
      this.setState({ matchedPassword: false });
    }
  }

  handleSubmit(e) {
    // verify form field iputs
      // set state valid
    if (this.state.username === '') {
      this.setState({validUsername: false})
    }
    if (this.state.password === '') {
      this.setState({validPassword: false})
    }
    if (this.state.email === '') {
      this.setState({validEmail: false})
    }

    // check if user credentials are unique
    if(this.state.takenUsername === true) {
      this.setState({message: 'Invalid username!'});
      localStorage.setItem("message", 'Username taken!');
    } else if (
      this.state.username === '' ||
      this.state.password === '' ||
      this.state.email === ''
    ) {
      localStorage.setItem("message", 'Fields must not be empty!');
    } else {

      // call handle valid signup
      this.handleValidSignup(e);
      localStorage.setItem("message", 'Signup success.');
    }

  }

  handleValidSignup = async e => {
    e.preventDefault();
    const response = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: this.state.fistName,
        lastname: this.state.lastName,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      }),
    });
    const body = await response.text();
    // get the response object
    this.setState({ message: body }); // get as JSON object

    alert("Account created successfully.");

    localStorage.setItem("authenticated", true);
    this.setState({authenticated: true});
    
    this.props.history.push('/');
  }


  render() {
    return (
      <div>
        {/* Six column means the width of the column depending on the screen */}
        
        { !this.state.authenticated ?
        (
          <div>
            <HomeNav />

            <br/>

            <div className="ui two column centered grid"> 
              <div className="row">
                <h2 >Creating new account</h2>
              </div>

              <div className="row">
                <div className="column">
                <form className="ui form" onSubmit={this.handleSubmit}>
                  {/* <div className="equal width fields">
                    <div className="field">
                      <label>First name</label>
                      <div className="ui fluid input"><input type="text" placeholder="First name" onChange={e => this.setState({firstName: e.target.value})}/></div>
                    </div>
                    <div className="field">
                      <label>Middle name</label>
                      <div className="ui fluid input"><input type="text" placeholder="Middle name" onChange={e => this.setState({middleName: e.target.value})}/></div>
                    </div>
                    <div className="field">
                      <label>Last name</label>
                      <div className="ui fluid input"><input type="text" placeholder="Last name" onChange={e => this.setState({lastName: e.target.value})} /></div>
                    </div>
                  </div> */}
                  
                  <div className="field">
                    <label>E-mail</label>
                    <input type="email" placeholder="E-mail" onChange={e => this.setState({email: e.target.value})}></input>
                  </div>

                  <div className="field">
                    <label>Username</label>
                    <input type="text" placeholder="Username" onChange={e => this.setState({username: e.target.value})}></input>
                  </div>

                  <div className="field">
                    <label>New password</label>
                    <input type="password" placeholder="Password" onChange={e => this.setState({password: e.target.value})}></input>
                  </div>

                  <div className="field">
                    <label>Retype new password</label>
                    <input type="password" placeholder="Password" onChange={e => this.setState({retypedPassword: e.target.value})}></input>
                  </div>

                  {/* <div className="field">
                    <div className="ui checkbox">
                      <input type="checkbox" className="hidden" readonly="" tabindex="0" />
                      <label >I agree to the Terms and Conditions</label>
                    </div>
                  </div> */}

                  <div className="button">
                    <button type="submit" className="ui button">Submit</button>
                  </div>
                </form>
                </div>
              </div>

              <div className="ui segment"><strong>Message: </strong>{this.state.message}</div>

            </div>
          </div>
        ) : (
          <div>
            <p>You must logout first.<a href="/user
            ">Go back.</a></p>
            <button ><Logout {...this.props} /></button>
            <p><a href="/signup3?please_complete_this_form">Continue</a> signing up.</p> 
          </div>
        )
        }
      </div>
    );
  }
}

export default Signup;