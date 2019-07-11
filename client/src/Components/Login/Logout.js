import React, { Component } from 'react';


class Logout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: localStorage.getItem('authenticated'),
    };
  
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    // clear localStorage
    // localStorage.setItem("message", "Logout success");
    localStorage.clear();
    // localStorage.removeItem("username");
    // localStorage.removeItem("authenticated");
    // this.setState({ authenticated: false});

    // console.log('logging oout');
    this.props.history.push("/"); // re
  }

  render() {
    return(
      <div>
        <div onClick={this.handleLogout}>Logout</div>
      </div>
    );
  }

}

export default Logout;