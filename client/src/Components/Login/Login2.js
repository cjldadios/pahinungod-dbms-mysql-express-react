import React, { Component } from 'react';
import { Button, Segment, Header, Form, Divider, Responsive } from 'semantic-ui-react';

class Login extends Component {
  constructor(){
    super();
    this.state = {
      username: "",
      password: ""
    }
  }

  handleChangeUsername = e => {
    this.setState({
      username: e.target.value
    })
  }

  handleChangePassword = e => {
    this.setState({
      password: e.target.value
    })
  }

  render() {
    return (
    	<div>
				<Responsive as={Segment}>
            <Segment textAlign='center' style={{marginBottom:0}}>
              <Divider horizontal>
                <Header as='h4'>LOG IN</Header>
              </Divider>
              <Form size='large'>
                <Form.Input 
                  icon='user' 
                  iconPosition='left' 
                  placeholder='Username' 
                  id='username'
                  name='username'
                  onChange={this.handleChangeUsername}/>
                <Form.Input
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  id='password'
                  name='password'
                  onChange={this.handleChangePassword}/>
                <Button type='submit'
                        color='red' 
                        size='large' 
                        a href='/signup'
                        onClick={this.Login} 
                        style={{width: "20%"}}
                        disabled={
                          !(this.state.username &&
                            this.state.password) ? true : false}
                        >Log in</Button>
              </Form>
              not registered? Sign up <a href="/signup">here</a>!
            </Segment>
				</Responsive>
	    </div>
    );
  }
}

export default Login;