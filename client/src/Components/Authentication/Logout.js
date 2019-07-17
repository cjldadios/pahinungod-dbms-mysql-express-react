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
    localStorage.clear();
    this.props.history.push("/login");
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