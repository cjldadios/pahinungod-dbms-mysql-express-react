import React, { Component } from 'react';
import { Button, Segment, Header, Form, Divider, Responsive/*, Input, Select*/ } from 'semantic-ui-react';

import DateSelector from './DateSelector';
// import DatePicker from 'react-datepicker';

const civilstatusoptions = [
  { key: 'sng', text: 'Single', value: 'single' },
  { key: 'mrd', text: 'Married', value: 'married' },
  { key: 'dvr', text: 'Divorced', value: 'divorced' },
  { key: 'wdw', text: 'Widowed', value: 'widowed' },
]

const classoptions = [
  { key: 'frmn', text: 'Freshman', value: 'freshman' },
  { key: 'sphmr', text: 'Sophomore', value: 'sophomore' },
  { key: 'jr', text: 'Junior', value: 'junior' },
  { key: 'sr', text: 'Senior', value: 'senior' },
]

const genderoptions = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
]

const bldtypeoptions = [
  { key: 'tpa+', text: 'Type A-positive', value: 'typea+' },
  { key: 'tpa-', text: 'Type A-negative', value: 'typea-' },
  { key: 'tpb+', text: 'Type B-positive', value: 'typeb+' },
  { key: 'tpb-', text: 'Type B-negative', value: 'typeb-' },
  { key: 'tpab+', text: 'Type AB-positive', value: 'typeab+' },  
  { key: 'tpab-', text: 'Type AB-negative', value: 'typeab-' },
  { key: 'tpo+', text: 'Type O-positive', value: 'typeo+' },
  { key: 'tpo-', text: 'Type O-negative', value: 'typeo-' },
]

class Signup extends Component {
  constructor(){
    super();
    this.state = {
      clickSubmitOnce: false,
      triggeredByActualSubmit: '',

      username: "",
      email: "",
      password: "",

      surname: '',
      firstname: '',
      middlename: '',
      gender: '',
      civilstatus: '',
      classification: '',
      position: '',
      course: '',
      yearlevel: '',
      citizenship: '',
      birthday: '',
      placeofbirth: '',
      height: '',
      weight: '',
      bloodtype: '',
      address: '',
      mobilenumber: '',
      emailaddress: '',
      confirmemailaddress: '',
      specialskills: '',
      languages: '',
      organizations: '',
      illness: '',
      beneficiaryname: '',
      beneficiaryrelationship: '',
      beneficiarycontactnumber: '',
      beneficiaryaddress: '',
      contactpersonname: '',
      contactpersonrelationship: '',
      contactpersoncontactnumber: '',
      contactpersonaddress: '',
      brieflyexplainyourreason: '',
    }

    this.getBirthday = this.getBirthday.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e, { value }) => this.setState({ value })

  handleChangeUsername = e => {
    this.setState({
      username: e.target.value
    })
  }

  handleChangeEmail = e => {
    this.setState({
      email: e.target.value
    })
  }

  handleChangePassword = e => {
    this.setState({
      password: e.target.value
    })
  }

  getBirthday(date) {
    this.setState({birthday: date});
    console.log('date passed is: ' + date);
  }

  handleTrueSubmit() {
    // this.setState({triggeredByActualSubmit: true});
    this.handleSubmit();
  }

  handleSubmit(e) {
    // validate input first

    // if (this.state.clickSubmitOnce === false) {
    //   this.setState({clickSubmitOnce: true});
      
    //   console.log("Handling submit.");
    //   this.handleValidSignup();
    // } else {
    //   this.setState({clickSubmitOnce: false});
    //   console.log("Huli! Ba't ba 'to nagdo-double respond?!");
    // }

    console.log("Handling submit without form validation");
    this.handleValidSignup();
    
    this.setState({triggeredByActualSubmit: false});
  }

  handleValidSignup = async e => {
    // e.preventDefault();
    const response = await fetch('/signup2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({
      //   firstname: this.state.fistName,
      //   lastname: this.state.lastName,
      //   username: this.state.username,
      //   email: this.state.email,
      //   password: this.state.password
      // }),
      body: JSON.stringify({
        data: this.state,
      })
    });
    const body = await response.text();
    // get the response object
    this.setState({ message: body }); // get as JSON object

    localStorage.setItem("authenticated", true);
    this.setState({authenticated: true});
    
    alert(body);
    alert( "Thank you for signing up!" );
  }

  render() {
    return (
    	<div>
				<Responsive as={Segment}>
            <Segment textAlign='center' style={{ marginBottom:0, marginLeft:"10%", marginRight:"10%"}}>
              <Divider horizontal>
                <Header as='h2'>Volunteer Application</Header>
              </Divider>
              <Header as='h4'>Personal Information</Header>
                  
              <Form size='tiny' onSubmit={this.handleSubmit} >
                <Form.Group widths='equal'>
                  <Form.Input fluid label='Surname' placeholder='Surname' 
                    onChange={ e => this.setState({ surname: e.target.value })} />
                  {/* {this.state.surname} */}
                  <Form.Input fluid label='First Name' placeholder='First Name' 
                    onChange={ e => this.setState({ firstname: e.target.value })} />
                  <Form.Input fluid label='Middle Name' placeholder='Middle Name' 
                  onChange={ e => this.setState({ middlename: e.target.value })} />
                </Form.Group>

                <Form.Group widths='equal'>
                  <Form.Select fluid label='Gender' options={genderoptions} placeholder='-Select Gender-' 
                  onChange={ e => this.setState({ gender: e.target.value })} />
                  <Form.Select fluid label='Civil Status' options={civilstatusoptions} placeholder='-Select Civil Status-'
                  onChange={ e => this.setState({ civilstatus: e.target.value })} />
                  <Form.Select fluid label='Classification' options={classoptions} placeholder='-Select Classification-'
                  onChange={ e => this.setState({ position: e.target.value })} />
                </Form.Group>

                <Form.Group widths='equal'>
                  <Form.Input fluid label='Position' placeholder='Position' 
                  onChange={ e => this.setState({ position: e.target.value })} />
                  <Form.Input fluid label='Course' placeholder='Course' 
                  onChange={ e => this.setState({ course: e.target.value })} />
                  <Form.Input fluid label='Year Level' placeholder='Year Level' 
                  onChange={ e => this.setState({ yearlevel: e.target.value })} />
                </Form.Group>

                <Form.Group>
                  <Form.Input fluid label='Citizenship' placeholder='Citizenship' width='5'
                  onChange={ e => this.setState({ citizenship: e.target.value })} />
                  
                  <Form.Input fluid label='Place of Birth' placeholder='Place of Birth' width='5'
                  onChange={ e => this.setState({ placeofbirth: e.target.value })} />
                  <Form.Field>
                    <label>Birthday</label>
                    <Form.Field inline>
                      {/* <Form.Input placeholder='MM' >01</Form.Input>
                      <Form.Input placeholder='DD' >01</Form.Input>
                      <Form.Input placeholder='YYYY'>2000</Form.Input> */}
                      {/* <Form.Input placeholder="date-baio"></Form.Input> */}
                      <div className="ui input">{this.state.birthday}</div>
                      {/* <DateSelector /> */}
                    </Form.Field>
                    {/* <div>
                      <DateSelector />
                    </div> */}
                  </Form.Field>
                </Form.Group>
                
                <div>
                  <DateSelector type='input' className="ui right" buttonLabel="Set Birthday" setDate={this.getBirthday}  />
                </div>

                <Form.Group widths='equal'>
                    <Form.Input fluid label='Height' placeholder='0 cm'
                    onChange={ e => this.setState({ height: e.target.value })} />
                    <Form.Input fluid label='Weight' placeholder='0 kg'
                    onChange={ e => this.setState({ weight: e.target.value })} />
                    <Form.Select fluid label='Bloodtype' options={bldtypeoptions} placeholder='-Select Bloodtype-'
                    onChange={ e => this.setState({ bloodtype: e.target.value })} />
                </Form.Group>
                
                <Form.Group widths='equal'>
                  <Form.TextArea label='Address'/>
                </Form.Group>

                <Form.Group widths='equal'>
                  <Form.Input fluid label='Mobile Number' placeholder='Mobile Number' 
                  onChange={ e => this.setState({ mobilenumber: e.target.value })} />
                  <Form.Input fluid label='E-mail Address' placeholder='E-mail Address'
                  onChange={ e => this.setState({ emailaddress: e.target.value })} />
                  <Form.Input fluid label='Confirm E-mail Address' placeholder='Confirm E-mail Address' 
                  onChange={ e => this.setState({ confirmemailaddress: e.target.value })} />
                </Form.Group>

                <Form.Group widths='equal'>
                  <Form.TextArea label='Special Skills'
                  onChange={ e => this.setState({ specialskills: e.target.value })} />
                  <Form.TextArea label='Languages/Dialects Spoken'
                  onChange={ e => this.setState({ languages: e.target.value })} />
                </Form.Group>

                <Form.Group widths='equal'>
                  <Form.TextArea label='Organizations'
                  onChange={ e => this.setState({ organizations: e.target.value })} />
                </Form.Group>

                <Form.Group widths='equal'>
                  <Form.TextArea label='Mention any physical or psychological illness or disability you have, or have had, which would have a bearing on your future volunteer assignment.'
                  onChange={ e => this.setState({ illness: e.target.value })} />
                </Form.Group>

                <Header as='h4'>For Insurance Purposes</Header>

                <Form.Group widths='equal'>
                  <Form.Input fluid label='Name of Beneficiary' placeholder='Name of Beneficiary' 
                  onChange={ e => this.setState({ beneficiaryname: e.target.value })} />
                  <Form.Input fluid label='Relationship to Beneficiary' placeholder='Relationship to Beneficiary'
                  onChange={ e => this.setState({ beneficiaryrelationship: e.target.value })} />
                  <Form.Input fluid label='Contact Number' placeholder='Contact Number' 
                  onChange={ e => this.setState({ beneficiarycontactnumber: e.target.value })} 
                  />
                </Form.Group>

                <Form.Group widths='equal'>
                  <Form.TextArea label='Address'
                  onChange={ e => this.setState({ beneficiaryaddress: e.target.value })} />
                </Form.Group>

                <Header as='h4'>Contact Person in Case of Emergency</Header>

                <Form.Group widths='equal'>
                  <Form.Input fluid label='Name' placeholder='Name' 
                  onChange={ e => this.setState({ contactpersonname: e.target.value })} />
                  <Form.Input fluid label='Relationship' placeholder='Relationship'
                  onChange={ e => this.setState({ contactpersonrelationship: e.target.value })} />
                  <Form.Input fluid label='Contact Number' placeholder='Contact Number' 
                  onChange={ e => this.setState({ contactpersoncontactnumber: e.target.value })} />
                </Form.Group>

                <Form.Group widths='equal'>
                  <Form.TextArea label='Address'
                  onChange={ e => this.setState({ contactpersonaddress: e.target.value })} />
                </Form.Group>

                <Form.Group widths='equal'>
                  <Form.TextArea label='Briefly explain your reason/s for applying as Pahinungod volunteer. (Not more than 200 words)' maxLength='200'
                  onChange={ e => this.setState({ brieflyexplainyourreason: e.target.value })} />
                </Form.Group>

                {/* <Button
                  type='submit'
                  color='red'
                  size='large'
                  a href="/login"
                  disabled={
                          !(this.state.username &&
                            this.state.password &&
                            this.state.email) ? true : false}
                  ButtonPositonClick={this.handleSubmit}
                  style={{width: "20%"}}
                  >Submit Application</Button> */}

                  <Button type='submit'  >Submit</Button>

              </Form>
            </Segment>
				</Responsive>
	    </div>
    );
  }
}

export default Signup;