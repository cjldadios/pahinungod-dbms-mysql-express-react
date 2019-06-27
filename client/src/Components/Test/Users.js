import React, { Component }  from 'react';

class User extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      users: [],  // array
      message: 'Requesting all users from the database.',
      usersText: ''
    };

    this.loadUsers = this.loadUsers.bind(this);
  }
  
  componentDidMount() {
    this.loadUsers();
  }
  
  loadUsers = async e => {
    const response = await fetch('/get-all-users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: this.state.message
      })
    });
    const body = await response.text();
    
    this.setState({ users: JSON.parse(body) }); // get the response object
    this.setState({ usersText: body }); // get the response as text
  };

  render() {
      return (
        <div>
          <strong>Users in table format:</strong>
          <table>
            <tr>
              <th>userid</th>
              <th>username</th> 
              <th>password</th>
            </tr>
            {
              this.state.users.map(user => 
                <tr key={user.userid}>
                  <td>{user.userid}</td>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                </tr>
              ) 
            }
          </table>

          <hr/>
          
          <strong>Users in table format:</strong>
          <ul>
            {
              this.state.users.map(user => 
                <li key={user.userid}>{user.userid} {user.username} {user.password}</li>
              ) 
            }
          </ul>
          
          <hr/>

          <strong>Users in unparsed text format:</strong>
          <p>{ this.state.usersText }</p>
        </div>
      );
    }
  }
  
  export default User;