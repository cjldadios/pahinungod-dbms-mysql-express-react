var express = require('express'); // required as an express file
const bodyParser = require('body-parser');

const query = require('./../Database/Query.js'); // import sql statements
const connection = require('./../Database/Connection.js'); // import database connection

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Handle Valid Signup Credentials
router.post('/signup', (req, res) => {
  console.log(req.body);
  const { username, password, email, firstname, lastname } = req.body; // aliasing
  
  connection.query(query.INSERT_NEW_USER(username, password, email, firstname, lastname), (err, results) => {
    if(err) {
      res.send(err);
    } else {
      res.send(results);
    }
  })  
});

// handle request from the more complete form
router.post('/signup2', (req, res) => {
  console.log(req.body);
  const { 
    username,
    email,
    password,
    /////////
    surname,
    firstname,
    middlename,
    gender,
    civilstatus,
    classification,
    position,
    course,
    yearlevel,
    citizenship,
    birthday,
    placeofbirth,
    height,
    weight,
    bloodtype,
    address,
    mobilenumber,
    emailaddress,
    confirmemailaddress,
    specialskills,
    languages,
    organizations,
    illness,
    beneficiaryname,
    beneficiaryrelationship,
    beneficiarycontactnumber,
    beneficiaryaddress,
    contactpersonname,
    contactpersonrelationship,
    contactpersoncontactnumber,
    contactpersonaddress,
    brieflyexplainyourreason
  } = req.body.data; // aliasing
  
  connection.query(query.INSERT_NEW_USER2(username, password, email, firstname, surname), (err, results) => {
    if(err) {
      res.send('Inserted successfully.');
    } else {
      res.send(results);
    }
  })  
});

// handle request from the more complete form
router.post('/signup3', (req, res) => {
  console.log('------------------------------------------------------');
  console.log(req.body);
  const { 
    username,
    email,
    password,
    /////////
    surname,
    firstname,
    middlename,
    gender,
    civilstatus,
    classification,
    position,
    course,
    yearlevel,
    citizenship,
    birthday,
    placeofbirth,
    height,
    weight,
    bloodtype,
    address,
    mobilenumber,
    emailaddress,
    confirmemailaddress,
    specialskills,
    languages,
    organizations,
    illness,
    beneficiaryname,
    beneficiaryrelationship,
    beneficiarycontactnumber,
    beneficiaryaddress,
    contactpersonname,
    contactpersonrelationship,
    contactpersoncontactnumber,
    contactpersonaddress,
    brieflyexplainyourreason
  } = req.body.data; // aliasing

  console.log(query.UPDATE_USER(
    username,


    firstname,
    surname,
    email,
    middlename,
    gender,
    civilstatus,
    classification,
    position,
    course,
    yearlevel,
    citizenship,
    placeofbirth,
    birthday,
    height,
    weight,
    bloodtype,
    address,
    mobilenumber,
    specialskills,
    languages,
    organizations,
    illness,
    beneficiaryname,
    beneficiaryrelationship,
    beneficiarycontactnumber,
    beneficiaryaddress,
    contactpersonname,
    contactpersonrelationship,
    contactpersoncontactnumber,
    contactpersonaddress,
    brieflyexplainyourreason
  ));
  
  connection.query(query.UPDATE_USER(
    username,


    firstname,
    surname,
    email,
    middlename,
    gender,
    civilstatus,
    classification,
    position,
    course,
    yearlevel,
    citizenship,
    placeofbirth,
    birthday,
    height,
    weight,
    bloodtype,
    address,
    mobilenumber,
    specialskills,
    languages,
    organizations,
    illness,
    beneficiaryname,
    beneficiaryrelationship,
    beneficiarycontactnumber,
    beneficiaryaddress,
    contactpersonname,
    contactpersonrelationship,
    contactpersoncontactnumber,
    contactpersonaddress,
    brieflyexplainyourreason
  ), (err, results) => {
    if(err) {
      res.send(err);
    } else {
      res.send('Profile updated successfully.');
    }
  })  
});


module.exports = router;

