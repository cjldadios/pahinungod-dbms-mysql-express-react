import React, { Component }  from 'react';

class Login extends Component {
  _isMounted = false; // For preventing a "React state update on an unmounted component." warning by being unmounted at Home

  constructor(props) {
    super(props);
    /*
     * Props from Home component
     * setUserInfo(), pass result from server
     * setLoginStaasynchronous
    */
    
    this.state = {
      username: '', // passed to the server
      password: '', // passed to the server
      user: '', // server result
      isLoggedIn: ''
    };
  }
  
  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
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

    console.log('login attempt');
    if(this.state.user !== undefined) { // if user exists given correct credentials
      this.props.setLoginStatus(true) // pass to the parent component Home the isLoggedIn state
      this.setState({ isLoggedIn: true }); // also update this component's state
    } else {
      this.props.setLoginStatus(false); // pass to the parent component Home the isLoggedIn state
      this.setState({ isLoggedIn: false }); // also update this component's state
    }
    // update parent user info
    this.props.setUserInfo(this.state.user);
  };

  render() {
    return (
      <div>
          <form onSubmit={this.handleLogin}>
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


      </div>
    );
  }
}
  
  export default Login;