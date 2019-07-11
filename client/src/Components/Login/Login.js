import React, { Component }  from 'react';
// import { Button } from 'semantic-ui-react';
// import { withRouter } from 'react-router-dom';

const jwt = require('jwt-simple'); // encoder-decoder

const divStyle = {
  width: '260px'
};

class Login extends Component {
  
  constructor(props) {
    super(props); 

    this.isEmpty = this.isEmpty.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleApply = this.handleApply.bind(this);

    this.state = {
      // for login server post request
      username: '',
      password: '',
      user: '',
      admin: '',
      
      authenticated: localStorage.getItem("authenticated"),
      message: localStorage.getItem("message"),

      valid: true,
    };
    
    
  }

  // Login authentication // https://www.youtube.com/watch?v=oRL-pttfNSc
  checkAuth = () => {
    const token = localStorage.getItem('token'); // native js
    const refreshToken = localStorage.getItem('refreshToken');
    if(!token || !refreshToken) { // both should be set
      return false;
    }
    try {
      const { exp } = jwt.decode(refreshToken);
      if(exp < new Date().getTime() / 1000) {
        return false;
      }
    } catch (e) {
      return false;
    }
    return true;
  }

  isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  
  handleLogin = async e => {
    e.preventDefault();
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),
    });
    const body = await response.text();
    // get the response object
    this.setState({ user: JSON.parse(body) }); // get as JSON object

    const userInfo = JSON.parse(body);
    //console.log("JSON.parse(body)[0].username: " + JSON.parse(body)[0].username); // userInfo[0].username
    
    console.log("Body: " + body);
    
    if(!this.isEmpty(userInfo)) { // if login successful
      // localStorage
      localStorage.setItem("message", "Login success");
      localStorage.setItem("username", this.state.username);
      localStorage.setItem("authenticated", true);


      // state
      this.setState({ authenticated: true });
      this.setState({ message: "Login is successful" });

      // check if admin
      if(userInfo[0].is_admin === 1) {
        localStorage.setItem("isAdmin", true); // [0/1]
        this.setState({admin: true});
        console.log("admin: true");
      } else {
        // localStorage.setItem("isAdmin", false); // [0/1]
        this.setState({admin: false});
        console.log("admin: false");
      }

      localStorage.setItem("username", userInfo[0].username);

      //if( this.props.location.pathname === "/login") { // if not at home page
        // redirect to user landing page 
        this.props.history.push("/user/" + userInfo[0].username);

      //} 

    } else { // if login fail
      // localStorage
      localStorage.setItem("message", "Login failed");
      localStorage.setItem("username", "");
      localStorage.setItem("authenticated", false);
      // state
      this.setState({ authenticated: false });
      this.setState({ message: "Login failed" });

      this.setState({valid: false});

      localStorage.clear();

      this.handleLogout();
    }
    
  }

  handleLogout() {
    // console.log('logging out')
    localStorage.setItem("message", "Logout success");
    localStorage.removeItem("username");
    localStorage.removeItem("authenticated");
    // localStorage.setItem("authenticated", false);
    this.setState({ authenticated: false});
  }

  handleApply() {
    this.props.history.push('/signup');
    /** At the login form, when 'Apply' is clicked, redirect to the signup page. */
  }

  render() {

    return (
      <div className="" >
        <br/>
        <div className="ui one column stackable center aligned page grid" >
          <div className="ui middle aligned center aligned grid">
            <div className="column">
              
              { !this.state.authenticated ? (
              <div>  
                <h2 className="ui image header">
                  <div className="content">
                    Log-in to your account
                  </div>
                </h2>
                <form className="ui large form" onSubmit={this.handleLogin} >
                  <div className="ui stacked secondary  segment">
                    <div className="field">
                      <div className="ui left icon input">
                        <i className="user icon"></i>
                        <input
                          type="text"
                          placeholder="Username"
                          value={this.state.username}
                          onChange={e => this.setState({ username: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <div className="ui left icon input">
                        <i className="lock icon"></i>
                        <input
                          type="password"
                          placeholder="Password"
                          value={this.state.password}
                          onChange={e => this.setState({ password: e.target.value })}
                        />
                      </div>
                    </div>
                    <button className="ui fluid large teal submit button" type="submit">Login</button>
                  </div>

                </form>

                <div className="ui message">
                  Want to become a volunteer? <a  onClick={this.handleApply} >Apply</a>
                </div>

                {
                  ( this.state.valid === '' || this.state.valid === false) ? (
                  <div className="ui error message" style={divStyle}>
                    <div className="header">Login error</div>
                    <p>Invalid credentials</p>
                  </div>
                  ) : (<div/>)
                }
               
              </div>) : (
                <div>  
                  <h2 className="ui image header">
                    <div className="content">
                      You are logged in!
                    </div>
                  </h2>
                  <div className="ui large form"  >
                    <div className="ui stacked secondary  segment">
                      <button className="ui fluid large teal submit button" onClick={this.handleLogout}>Logout</button>
                    </div>
                  </div>
                </div>
              )}

            </div>
            
          </div>

               

                
            

          

          {/* { <p>Authenticated: {this.state.authenticated}</p> } */}

        {/* // basic form

          { !this.state.authenticated ? (
            <form className="ui middle aligned center aligned grid" onSubmit={this.handleLogin}>
              Username:<br />
              <input
                type="text"
                value={this.state.username}
                onChange={e => this.setState({ username: e.target.value })}
              />
              <br/>
              Password:
              <br/>
              <input
                type="password"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
              />
              <br/>
              <button type="submit">Login</button>
            </form>
          ) : (
            <form onSubmit={this.handleLogout}>
              <button type="submit">Logout</button>
            </form>
          )}

          {
          <p>Local storage admin: { localStorage.getItem("admin") }</p>
          }

          <p>History:  {
            this.props.location.pathname
          } </p>
      

        */}

        </div> 

      </div>
    );
  }
}
  
  export default Login;