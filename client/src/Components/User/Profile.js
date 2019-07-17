import React, { Component } from 'react';

import Navbar from '../Navigations/Navbar';
import Sidebar from './../Navigations/Sidebar';

import DatePicker from 'react-datepicker';

class Profile extends Component {
  constructor(props){
    super(props);

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.getBirthday = this.getBirthday.bind(this);
    this.handleChangeSurname = this.handleChangeSurname.bind(this);
    this.handleChangeFirstname = this.handleChangeFirstname.bind(this);
    this.handleChangeMiddlename = this.handleChangeMiddlename.bind(this);
    this.handleChangeGender = this.handleChangeGender.bind(this);
    this.handleChangeCivilStatus = this.handleChangeCivilStatus.bind(this);
    this.handleChangeClassification = this.handleChangeClassification.bind(this);
    this.handleChangePosition = this.handleChangePosition.bind(this);
    this.handleChangeCourse = this.handleChangeCourse.bind(this);
    this.handleChangeYearLevel = this.handleChangeYearLevel.bind(this);
    this.handleChangeCitizenship = this.handleChangeCitizenship.bind(this);
    this.handleChangeBirthday = this.handleChangeBirthday.bind(this);
    this.handleChangeBirthplace = this.handleChangeBirthplace.bind(this);
    this.handleChangeHeight = this.handleChangeHeight.bind(this);
    this.handleChangeWeight = this.handleChangeWeight.bind(this);
    this.handleChangeBloodType = this.handleChangeBloodType.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleChangeMobileNumber = this.handleChangeMobileNumber.bind(this);
    this.handleChangeSpecialSkills = this.handleChangeSpecialSkills.bind(this);
    this.handleChangeLanguages = this.handleChangeLanguages.bind(this);
    this.handleChangeOrganizations = this.handleChangeOrganizations.bind(this);
    this.handleChangeIllness = this.handleChangeIllness.bind(this);
    this.handleChangeBeneficiaryName = this.handleChangeBeneficiaryName.bind(this);
    this.handleChangeBeneficiaryRelationship = this.handleChangeBeneficiaryRelationship.bind(this);
    this.handleChangeBeneficiaryContactNumber = this.handleChangeBeneficiaryContactNumber.bind(this);
    this.handleChangeBeneficiaryAddress = this.handleChangeBeneficiaryAddress.bind(this);
    this.handleChangeContactPersonName = this.handleChangeContactPersonName.bind(this);
    this.handleChangeContactPersonRealtionship = this.handleChangeContactPersonRealtionship.bind(this);
    this.handleChangeContactPersonContactNumber = this.handleChangeContactPersonContactNumber.bind(this);
    this.handleChangeContactPersonAddress = this.handleChangeContactPersonAddress.bind(this);
    this.handleChangeBriefyExplainYourReason = this.handleChangeBriefyExplainYourReason.bind(this);

    this.state = {
      success: '',

      date: new Date(),

      username: localStorage.getItem("username"),
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
    this.handleValidSignup = this.handleValidSignup.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  

  handleChange = (e, { value }) => this.setState({ value });

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
  handleChangeDate = (date) => {
    this.setState({ date });

    // var bday = date.getMonth() + '/' + date.getDate() + '/' + date.getYear();
    // this.setState({ birthday: bday});
  };
  getBirthday(date) {
    this.setState({birthday: date});
    console.log('date passed is: ' + date);
  }
  // handleValidSubmit() {
  // }
  // date: new Date(),
  // username: "",
  // handleChangeUsername() done
  // email: "",
  // handleChangeEmail() ok
  // password: "", 
  // handleChangePassword ok
  // surname: '',
  handleChangeSurname(e) {
    this.setState({ surname: e.target.value });
  }
  // firstname: '',
  handleChangeFirstname(e) {
    this.setState({ firstname: e.target.value });
  }
  // middlename: '',
  handleChangeMiddlename(e) {
    this.setState({ middlename: e.target.value });
  }
  // gender: '',
  handleChangeGender(e) {
    this.setState({ gender: e.target.value });
  }
  // civilstatus: '',
  handleChangeCivilStatus(e) {
    this.setState({ civilstatus: e.target.value });
  }
  // classification: '',
  handleChangeClassification(e) {
    this.setState({ classification: e.target.value });
  }
  // position: '',
  handleChangePosition(e) {
    this.setState({ position: e.target.value });
  }
  // course: '',
  handleChangeCourse(e) {
    this.setState({ course: e.target.value });
  }
  // yearlevel: '',
  handleChangeYearLevel(e) {
    this.setState({ yearlevel: e.target.value });
  }
  // citizenship: '',
  handleChangeCitizenship(e) {
    this.setState({ citizenship: e.target.value });
  }
  // birthday: '',
  handleChangeBirthday = (date) => {
    this.setState({ date: date });
    console.log("date: " + date);
    var dateString = (date.getMonth() + 1 ) + '/' + date.getDate() + '/' + date.getFullYear();
    console.log("dateString: " + dateString);
    this.setState({ birthday: dateString});

    // alert('Setting birthday.');
  }
  // placeofbirth: '',
  handleChangeBirthplace(e) {
    this.setState({ placeofbirth: e.target.value });
  }
  // height: '',
  handleChangeHeight(e) {
    this.setState({ height: e.target.value });
  }
  // weight: '',
  handleChangeWeight(e) {
    this.setState({ weight: e.target.value });
  }
  // bloodtype: '',
  handleChangeBloodType(e) {
    this.setState({ bloodtype: e.target.value });
  }
  // address: '',
  handleChangeAddress(e) {
    this.setState({ address: e.target.value });
  }
  // mobilenumber: '',
  handleChangeMobileNumber(e) {
    this.setState({ mobilenumber: e.target.value });
  }
  // emailaddress: '',
  // handleChangeEmail ok
  // confirmemailaddress: '', not used
  // specialskills: '',
  handleChangeSpecialSkills(e) {
    this.setState({ specialskills: e.target.value });
  }
  // languages: '',
  handleChangeLanguages(e) {
    this.setState({ languages: e.target.value });
  }
  // organizations: '',
  handleChangeOrganizations(e) {
    this.setState({ organizations: e.target.value });
  }
  // illness: '',
  handleChangeIllness(e) {
    this.setState({ illness: e.target.value });
  }
  // beneficiaryname: '',
  handleChangeBeneficiaryName(e) {
    this.setState({ beneficiaryname: e.target.value });
  }
  // beneficiaryrelationship: '',
  handleChangeBeneficiaryRelationship(e) {
    this.setState({ beneficiaryrelationship: e.target.value });
  }
  // beneficiarycontactnumber: '',
  handleChangeBeneficiaryContactNumber(e) {
    this.setState({ beneficiarycontactnumber: e.target.value });
  }
  // beneficiaryaddress: '',
  handleChangeBeneficiaryAddress(e) {
    this.setState({ beneficiaryAddress: e.target.value });
  }
  // contactpersonname: '',
  handleChangeContactPersonName(e) {
    this.setState({ contactpersonname: e.target.value });
  }
  // contactpersonrelationship: '',
  handleChangeContactPersonRealtionship(e) {
    this.setState({ contactpersonrelationship: e.target.value });
  }
  // contactpersoncontactnumber: '',
  handleChangeContactPersonContactNumber(e) {
    this.setState({ contactpersoncontactnumber: e.target.value });
  }
  // contactpersonaddress: '',
  handleChangeContactPersonAddress(e) {
    this.setState({ contactpersonaddress: e.target.value });
  }
  // brieflyexplainyourreason: '',
  handleChangeBriefyExplainYourReason(e) {
    this.setState({ brieflyexplainyourreason: e.target.value });
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
    // console.log("Handling submit without form validation");
    this.handleValidSignup();

    alert( "Thank you for signing up!" );

    // this.props.history.push("/"); // go back to user home after edit 

    if(localStorage.getItem("isAdmin") === false ) {
      // if the user is not an admin
      // this.props.showProfile(); // redirect to the profile page

      this.props.history.push('/user/profile');
    }
  }

  handleValidSignup = async e => {
    // e.preventDefault();
    const response = await fetch('/signup3', {
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
        data: this.state
      })
    });
    const body = await response.text();
    // get the response object
    this.setState({ message: body }); // get as JSON object
    this.setState({ success: true });

    localStorage.setItem("authenticated", true);
    this.setState({authenticated: true});
    
    alert(body);

  }

  componentDidMount() {
    console.log("Profile did mount.");
    this.getUserInfo();

    localStorage.removeItem("asAdmin"); 
  }

  getUserInfo = async e => {
    const response = await fetch('/get-user-via-username', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: localStorage.getItem("username")
      })
    });
    
    const body = await response.text();

    // get the response object
    this.setState({ user: JSON.parse(body) }); // get as JSON object

    const userInfo = JSON.parse(body)[0];

    console.log(userInfo);

    // alert(body);
    // alert( "Attempted to get user info of " + localStorage.getItem("username"));


    this.setState({ username: userInfo.username });
    this.setState({ email: userInfo.email });
    this.setState({ password: userInfo.password });
    this.setState({ surname: userInfo.last_name });
    this.setState({ firstname: userInfo.first_name });
    this.setState({ middlename: userInfo.middle_name });
    this.setState({ gender: userInfo.gender });
    this.setState({ civilstatus: userInfo.civil_status });
    this.setState({ classification: userInfo.classification });
    this.setState({ position: userInfo.position });
    this.setState({ course: userInfo.course });
    this.setState({ yearlevel: userInfo.year_level });
    this.setState({ citizenship: userInfo.citizenship });
    this.setState({ birthday: userInfo.birth_date });
    this.setState({ placeofbirth: userInfo.birth_place });
    this.setState({ height: userInfo.height });
    this.setState({ weight: userInfo.weight });
    this.setState({ bloodtype: userInfo.blood_type });
    this.setState({ address: userInfo.address });
    this.setState({ mobilenumber: userInfo.mobile_number });
    // this.setState({ emailaddress: userInfo.emailaddress }); // there's no such column
    // this.setState({ confirmemailaddress: userInfo.confirmemailaddress }); // there's no such column
    this.setState({ specialskills: userInfo.skills });
    this.setState({ languages: userInfo.languages });
    this.setState({ organizations: userInfo.organizations });
    this.setState({ illness: userInfo.illness });
    this.setState({ beneficiaryname: userInfo.beneficiary_name });
    this.setState({ beneficiaryrelationship: userInfo.beneficiary_relationship });
    this.setState({ beneficiarycontactnumber: userInfo.beneficiary_contact_number });
    this.setState({ beneficiaryaddress: userInfo.beneficiary_address });
    this.setState({ contactpersonname: userInfo.contact_person_name });
    this.setState({ contactpersonrelationship: userInfo.contact_person_relationship });
    this.setState({ contactpersoncontactnumber: userInfo.contact_person_contact_number });
    this.setState({ contactpersonaddress: userInfo.contact_person_address });
    this.setState({ brieflyexplainyourreason: userInfo.reason });


    if(this.state.birthday !== null) {
      var parsedDate = this.state.birthday.split('/');
      var birthdate = new Date();
      console.log("parsedDate[0]: " + parsedDate[0])
      console.log("parsedDate[1]: " + parsedDate[1])
      console.log("parsedDate[2]: " + parsedDate[2])
      birthdate.setMonth(parsedDate[0] - 1);
      birthdate.setDate(parsedDate[1]);
      birthdate.setFullYear(parsedDate[2]);
      this.setState({ date: birthdate });
    } else {
      this.setState({ date: '' });        
    }
  }

  render() {
    return (
    	// opening delimiter div tag
      <div>

        <Navbar history={this.props.history}/>

        {/* this is how to include the sidebar */}
        <div className="ui grid">
          <div className="three wide column">
            {/* <div className="row"><br/></div> */}
            {/* </br> */}
            <div className="row">
              <Sidebar {...this.props} asAdmin={false} showProfile={true} /> {/** this is the side bar */}
            </div>
          </div>
          <div className="eleven wide column">    {/** this is where the USER Page contents should be declared */}


            <div className="ui segment">
              { this.state.success ? ( 
                <div className="ui message">
                  {/* <i className="close icon"></i> */}
                  <div className="header">
                    Your user registration was successful.
                  </div>
                  <p>You may now log-in with the username you have chosen</p>
                  <p>{this.state.message}</p>
                </div>
              ): (null) }

              <div className="ui column centered grid segment">
                <div className="row">
                  <h2>Volunteer Application</h2>
                </div>
                
                <form className="ui form" onSubmit={this.handleSubmit}>
                <div className="ui column centered grid ">
                    <h4 className="ui dividing header row">Personal Information</h4>

                    <div className="fields row">
                      <div className="field">
                        <label>First name</label>
                        <input type="text" placeholder="First Name"
                        defaultValue={this.state.firstname}
                        onChange={this.handleChangeFirstname}
                        />
                      </div>
                      <div className="field">
                        <label>Middle name</label>
                        <input type="text" placeholder="Middle Name"
                        defaultValue={this.state.middlename}
                        onChange={this.handleChangeMiddlename}
                        />
                      </div>
                      <div className="field">
                        <label>Last name</label>
                        <input type="text" placeholder="Last Name"
                        defaultValue={this.state.surname} 
                        onChange={this.handleChangeSurname}
                        />
                      </div>
                    </div>

                    <div className="fields row">
                      <div className="field">
                        <label>Gender</label>
                        <select multiple="" className="ui dropdown"
                        value={this.state.gender ? this.state.gender : ''} 
                        onChange={this.handleChangeGender}
                        >
                          <option value="">Gender</option>
                          <option value="1">Male</option>
                          <option value="0">Female</option>
                        </select>
                      </div>
                      <div className="field">
                        <label>Civil Status</label>
                        <select multiple="" className="ui dropdown"
                        value={this.state.civilstatus ? this.state.civilstatus : ''}
                        onChange={this.handleChangeCivilStatus}
                        >
                          <option value="">Civil Status</option>
                          <option value="single">Single</option>
                          <option value="married">Married</option>
                          <option value="divorced">Divorced</option>
                          <option value="widowed">Widowed</option>
                        </select>
                      </div>
                      <div className="field">
                        <label>Classification</label>
                        <select multiple="" className="ui dropdown"
                        value={this.state.classification ? this.state.classification : ''}
                        onChange={this.handleChangeClassification}
                        >
                          <option value="">Classification</option>
                          <option value="freshman">Freshman</option>
                          <option value="sophomore">Sophomore</option>
                          <option value="junior">Junior</option>
                          <option value="senior">Senior</option>
                        </select>
                      </div>
                      <div className="field">
                        <label>Year Level</label>
                        <select multiple="" className="ui dropdown"
                        value={this.state.yearlevel ? this.state.yearlevel : ''}
                        onChange={this.handleChangeYearLevel}
                        >                    
                          <option value="">Year Level</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>
                      {
                        this.state.birthday === 'null' || this.state.birthday === 'undefined' ? (
                        <div>
                          <div className="field">
                            <label>Birthdate</label>
                            <DatePicker disabledKeyboardNavigation
                            placeholderText="Input date"
                            onChange={this.handleChangeBirthday}/>
                          </div>
                        </div>
                        ) : (
                          <div>
                            <div className="field">
                              <label>Birthdate</label>
                              <DatePicker disabledKeyboardNavigation
                              selected={this.state.date}
                              onChange={this.handleChangeBirthday}/>
                            </div>
                          </div>
                        )
                      }
                    </div>

                    <div className="fields row">
                      <div className="field">
                        <label>Position</label>
                        <input type="text" placeholder="Position"
                        defaultValue={this.state.position}
                        onChange={this.handleChangePosition}
                        />
                      </div>
                      <div className="field">
                        <label>Course</label>
                        <input type="text" placeholder="Course"
                        defaultValue={this.state.course}
                        onChange={this.handleChangeCourse}
                        />
                      </div>
                      <div className="field">
                        <label>Citizenship</label>
                        <input type="text" placeholder="Citizenship"
                        defaultValue={this.state.citizenship}
                        onChange={this.handleChangeCitizenship}
                        />
                      </div>
                    </div>
                    
                    <div className="fields row">
                      <div className="field">
                        <label>Birthplace</label>
                        <input type="text" placeholder="Birthplace"
                        defaultValue={this.state.placeofbirth}
                        onChange={this.handleChangeBirthplace}
                        />
                      </div>
                      <div className="field">
                        <label>Height</label>
                        <input type="text" placeholder="Height"
                        defaultValue={this.state.height}
                        onChange={this.handleChangeHeight}
                        />
                      </div>
                      <div className="field">
                        <label>Weight</label>
                        <input type="text" placeholder="Weight"
                        defaultValue={this.state.weight}
                        onChange={this.handleChangeWeight}
                        />
                      </div>
                    </div>

                    <div className="fields row">
                      <div className="field">
                        <label>Bloodtype</label>
                        <input type="text" placeholder="Bloodtype"
                        defaultValue={this.state.bloodtype}
                        onChange={this.handleChangeBloodType}
                        />
                      </div>
                    </div>
                    
                    <div className="field row eight wide">
                      <label>Address</label>
                      <input type="text" placeholder="Address"
                        defaultValue={this.state.address}
                        onChange={this.handleChangeAddress}
                        />
                    </div>

                    <div className="fields row">
                      <div className="field">
                        <label>Mobile number</label>
                        <input type="text" placeholder="Mobile number"
                        defaultValue={this.state.mobilenumber}
                        onChange={this.handleChangeMobileNumber}
                        />
                      </div>
                      <div className="field">
                        <label>E-mail</label>
                        <input type="email" placeholder="E-mail"
                        defaultValue={this.state.email}
                        onChange={this.handleChangeEmail}
                        />
                      </div>
                    </div>

                    <div className="fields row">
                      <div className="field">
                        <label>Special skills</label>
                        <input type="text" placeholder="Special Skills"
                        defaultValue={this.state.specialskills}
                        onChange={this.handleChangeSpecialSkills}
                        />
                      </div>
                      <div className="field">
                        <label>Languages/Dialects Spoken</label>
                        <input type="text" placeholder="Languages/Dialects Spoken"
                        defaultValue={this.state.languages}
                        onChange={this.handleChangeLanguages}
                        />
                      </div>
                    </div>

                    <div className="fields row">
                      <div className="field">
                        <label>Organizations</label>
                        <input type="text" placeholder="Organizations"
                        defaultValue={this.state.organizations}
                        onChange={this.handleChangeOrganizations}
                        />
                      </div>
                    </div>

                    <div className="fields row">
                      <div className="field nine wide">
                        <label>Mention any physical or psychological illness or disability you have, or have had, which would have a bearing on your future volunteer assignment.
      </label>
                        <input type="text" placeholder=""
                        defaultValue={this.state.illness}
                        onChange={this.handleChangeIllness}
                        />
                      </div>
                    </div>

                    <h4 className="ui dividing header row">For Insurance Purposes</h4>

                    <div className="fields row">
                      <div className="field">
                        <label>Name of beneficiary</label>
                        <input type="text" placeholder="Name of beneficiary"
                        defaultValue={this.state.beneficiaryname}
                        onChange={this.handleChangeBeneficiaryName}
                        />
                      </div>
                      <div className="field">
                        <label>Relationship to beneficiary</label>
                        <input type="text" placeholder="Relationship to beneficiary"
                        defaultValue={this.state.beneficiaryrelationship}
                        onChange={this.handleChangeBeneficiaryRelationship}
                        />
                      </div>
                      <div className="field">
                        <label>Contact number</label>
                        <input type="text" placeholder="Contact number"
                        defaultValue={this.state.beneficiarycontactnumber}
                        onChange={this.handleChangeContactPersonContactNumber}
                        />
                      </div>
                    </div>
                    
                    <div className="field row eight wide">
                      <label>Address</label>
                      <input type="text" placeholder="Address"
                        defaultValue={this.state.beneficiaryaddress}
                        onChange={this.handleChangeBeneficiaryAddress}
                        />
                    </div>

                    <h4 className="ui dividing header row">Contact Person in Case of Emergency</h4>

                    <div className="fields row">
                      <div className="field">
                        <label>Name</label>
                        <input type="text" placeholder="Name"
                        defaultValue={this.state.contactpersonname}
                        onChange={this.handleChangeContactPersonName}
                        />
                      </div>
                      <div className="field">
                        <label>Relationship</label>
                        <input type="text" placeholder="Relationship"
                        defaultValue={this.state.contactpersonrelationship}
                        onChange={this.handleChangeContactPersonRealtionship}
                        />
                      </div>
                      <div className="field">
                        <label>Contact number</label>
                        <input type="text" placeholder="Contact number"
                        defaultValue={this.state.contactpersoncontactnumber}
                        onChange={this.handleChangeContactPersonContactNumber}
                        />
                      </div>
                    </div>

                    <div className="field row eight wide">
                      <label>Address</label>
                      <input type="text" placeholder="Address"
                        defaultValue={this.state.contactpersonaddress}
                        onChange={this.handleChangeContactPersonAddress}
                        />
                    </div>

                    <div className="field row nine wide">
                      <label>Briefly explain your reason/s for applying as Pahinungod volunteer. (Not more than 200 words)
      </label>
                      <input type="text" placeholder=""
                        defaultValue={this.state.brieflyexplainyourreason}
                        onChange={this.handleChangeBriefyExplainYourReason}
                        />
                    </div>
      
                    <div className='field row'>
                      <button type="submit" className="ui button">Save</button>
                    </div>

                    <br/>
                  
                </div></form>
              </div>

            </div>

          </div>
        </div>
	    </div> // closing delimiter div tag
    );
  }
}

export default Profile;