var express = require('express'); // required as an express file
const bodyParser = require('body-parser');

const query = require('./../Database/Query.js'); // import sql statements
const connection = require('./../Database/Connection.js'); // import database connection

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/get-all-users', (req, res) => {
  console.log('Received a POST request at /user-activity route');
  console.log(req.body);
  const { message } = req.body; // aliasing
  console.log("message: " + message);
  connection.query(`SELECT * FROM user`, (err, results) => {
    if(err) {
      res.send(err);
    } else {
      res.send(results);
    }
  })  
});

router.post('/get-user', (req, res) => {
  const { userid } = req.body; // aliasing
  console.log("");
  console.log('Requesting info from userid: ' + userid);
  connection.query(`SELECT * FROM user where userid='${userid}'`, (err, results) => {
    if(err) {
      res.send(err);
    } else {
      res.send(results);
    }
  })  
});

router.post('/get-activity', (req, res) => {
  console.log('Received a POST request at /get-activity route');
  // console.log(req.body);
  const { activityid, activityIdCount } = req.body; // aliasing

  var statement = `SELECT * FROM activity WHERE activityId='${(activityid[0].activityid)}'`;
  var i = 1;
  while(i < activityIdCount) {
    statement = statement + ` || activityId='${(activityid[i].activityid)}'`;

    // console.log(statement)
    i++;
  }
  console.log("activityid: " + activityid);
  connection.query(statement, (err, results) => {
    // console.log(results);
    if(err) {
      res.send(err);
    } else {
      res.send(results);
    }
  })  
});

router.post('/search-volunteer', (req, res) => {
  console.log("");
  console.log('Handling request at /search-activity');
  const { searchText } = req.body; // aliasing
  console.log("searchText: " + searchText);
  var statement = `SELECT * FROM user WHERE first_name LIKE '%${searchText}%' || middle_name LIKE '%${searchText}%' || last_name LIKE '%${searchText}%'`;

  // console.log("Query: " + statement);
  connection.query(statement, (err, results) => {
    if(err) {
      console.log(err);
      res.send(err);
    } else {
      // console.log(results);
      res.send(results);
    }
  })  
});


router.post('/add-user-activity', (req, res) => {
  console.log("");
  console.log('Handling request at /add-user-activity');
  const { userid, activityid } = req.body; // aliasing
  var statement = `INSERT INTO user_activity (userid, activityid) VALUES ('${userid}', '${activityid}')`;

  console.log("Query: " + statement);
  connection.query(statement, (err, results) => {
    console.log(results);
    if(err) {
      res.send(err);
    } else {
      res.send(results);
    }
  })  
});

router.post('/remove-user-activity', (req, res) => {
  console.log("");
  console.log('Handling request at /remove-user-activity');
  const { userid, activityid } = req.body; // aliasing
  var statement = `DELETE FROM user_activity WHERE userid='${userid}' && activityid='${activityid}'`;

  console.log("Query: " + statement);
  connection.query(statement, (err, results) => {
    console.log("Reponse result: " + results);
    console.log("Reponse error: " + err);
    if(err) {
      res.send(err);
    } else {
      res.send(results);
    }
  })  
});


router.post('/get-activity-data', (req, res) => {
  console.log('Received a POST request at /get-activity-data route');
  // console.log(req.body);
  const { activityid } = req.body; // aliasing

  var statement = `SELECT * FROM activity WHERE activityId='${(activityid)}'`;
 
  console.log("Query: " + statement);
  connection.query(statement, (err, results) => {
    // console.log(results);

    if(err) {
      console.log(err);
      res.send(err);
    } else {
      console.log("query success :)");
      console.log(results);
      res.send(results);
    }
  })  
});

router.post('/get-user-via-userid', (req, res) => {
  const { userid } = req.body;

  console.log("Handling request at /get-user-via-userid with userid=" + userid);

  connection.query( `SELECT * FROM user WHERE userid='${userid}'`, (err, results) => {
    //console.log(results);
    if(err) {                    // if error
      res.send(err);      // render error message      
    }
    else {                        // if no error
      res.send( results );         // send the results to the client
    }
  });
});

router.post('/get-all-activities', (req, res) => {
  const { message } = req.body;
  console.log("message: " + message);

  connection.query( `SELECT * FROM activity`, (err, results) => {
    //console.log(results);
    if(err) {                    // if error
      res.send(err);      // render error message      
    }
    else {                        // if no error
      res.send( results );         // send the results to the client
    }
  });
});

router.post('/get-all-administrators', (req, res) => {
  // const { message } = req.body;
  connection.query( `SELECT * FROM user WHERE is_admin='1'`, (err, results) => {
    //console.log(results);
    if(err) {                    // if error
      res.send(err);      // render error message      
    }
    else {                        // if no error
      res.send( results );         // send the results to the client
    }
  });
});

router.post('/add-admin', (req, res) => {
  const { userid } = req.body;
  connection.query( `UPDATE user SET is_admin='1' WHERE userid='${userid}'`, (err, results) => {
    //console.log(results);
    if(err) {                    // if error
      res.send(err);      // render error message      
    }
    else {                        // if no error
      res.send( results );         // send the results to the client
    }
  });
});

router.post('/remove-admin', (req, res) => {
  const { userid } = req.body;
  connection.query( `UPDATE user SET is_admin='0' WHERE userid='${userid}'`, (err, results) => {
    //console.log(results);
    if(err) {                    // if error
      res.send(err);      // render error message      
    }
    else {                        // if no error
      res.send( results );         // send the results to the client
    }
  });
});

// handle request from the more complete form
router.post('/admin-edit-volunteer-profile', (req, res) => {
  console.log('------------------------------------------------------');
  console.log(req.body);
  const { 
    userid,

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

  // 
  console.log("Query: " + query.UPDATE_USER(
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

// request to create a new acount
router.post('/admin-create-new-user', (req, res) => {
  console.log(`Currently at: router.post('/admin-create-new-user'`);
  console.log("req.body: " + req.body);
  console.log("req.body.data: " + req.body.data);
  const { 
    // userid,

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

  // 
  console.log("Query: " + query.ADD_USER(
    password,
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
  
  connection.query(query.ADD_USER(
    password,
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
      console.log(err);
      res.send(err);
    } else {
      res.send('Profile updated successfully.');
    }
  })  
});

// handle request from the more complete form
router.post('/admin-edit-user-profile', (req, res) => {
  console.log('Here at /admin-edit-user-profile');
  
  console.log(req.body.data);
  const { 
    userid,
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

  console.log("Query: " + query.UPDATE_USER(
    userid,
    username,
    password,
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
    userid,
    username,
    password,
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

// add activity request handler
router.post('/admin-add-activity', (req, res) => {
  console.log("");
  console.log('Here at /admin-add-activity');
  
  console.log("request body.data: " + req.body.data);
  const { 
    activityid,
    activityname,
    description,
    startdate,
    enddate,
    noofvolunteers,
    participants,
    coordinatorincharge,
    userid
  } = req.body.data; // aliasing

  console.log("Query: " + query.ADD_ACTIVITY(
    //activityid,
    activityname,
    description,
    startdate,
    enddate,
    noofvolunteers,
    participants,
    coordinatorincharge,
    userid
  )
  );
  
  connection.query(query.ADD_ACTIVITY(
    //activityid,
    activityname,
    description,
    startdate,
    enddate,
    noofvolunteers,
    participants,
    coordinatorincharge,
    userid
  ), (err, results) => {
    if(err) {
      console.log(err);
      res.send(err);
    } else {
      res.send('Profile updated successfully.');
    }
  })  
});

// add activity request handler
router.post('/admin-edit-activity', (req, res) => {
  console.log("");
  console.log('Here at /admin-edit-activity');
  
  console.log("request body.data: " + req.body.data);
  const { 
    activityid,
    activityname,
    description,
    startdate,
    enddate,
    noofvolunteers,
    participants,
    coordinatorincharge,
    userid
  } = req.body.data; // aliasing

  console.log("Query: " + 
    query.EDIT_ACTIVITY(
      activityid,
      activityname,
      description,
      startdate,
      enddate,
      noofvolunteers,
      participants,
      coordinatorincharge,
      userid
    )
  );
  
  connection.query(query.EDIT_ACTIVITY(
    activityid,
    activityname,
    description,
    startdate,
    enddate,
    noofvolunteers,
    participants,
    coordinatorincharge,
    userid
  ), (err, results) => {
    if(err) {
      console.log(err);
      res.send(err);
    } else {
      console.log('Profile updated successfully.');
      res.send('Profile updated successfully.');
    }
  })  
});


module.exports = router;

