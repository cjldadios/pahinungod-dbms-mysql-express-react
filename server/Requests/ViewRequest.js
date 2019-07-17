var express = require('express'); // required as an express file
const bodyParser = require('body-parser');

const query = require('./../Database/Query.js'); // import sql statements
const connection = require('./../Database/Connection.js'); // import database connection

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/user-activity', (req, res) => {
  console.log('Received a POST request at /user-activity route');
  console.log(req.body);
  const { userid } = req.body; // aliasing
  console.log("userid: " + userid);
  connection.query(`SELECT activityid FROM user_activity WHERE userid='${(userid)}'`, (err, results) => {
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


module.exports = router;

