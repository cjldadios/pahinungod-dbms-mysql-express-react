import React, { Component }  from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      responseMessage: '', 
      username: '', 
      password: '', 
      post: ''
    };
  }
  
  componentDidMount() {
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
    this.setState({ post: JSON.parse(body) }); // get as JSON object
    this.setState({ responseMessage: body });

    console.log('login attempt');

    // update parent user info
    this.props.setUserInfo(this.state.user);
  };

  render() {
    const { isLoggedIn, user } = this.state; // this is to be able to access 'this.state.user' as simply 'user' for example

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

          <br/>
          Response message: {this.state.responseMessage}

          <br/>
          username: {this.state.username}
          <br/>
          password: {this.state.password}


          <br/>
          Response post: {this.state.post.post2}


        </div>
      );
    }
  }
  
  export default Login;