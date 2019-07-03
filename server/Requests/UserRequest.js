var express = require('express'); // required as an express file
const bodyParser = require('body-parser');

const query = require('./../Database/Query.js'); // import sql statements
const connection = require('./../Database/Connection.js'); // import database connection

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//GET all users
router.get('/user/all', (req, res) => { // accessable via route localhost:5000/user/all
  connection.query( query.SELECT_ALL_USER, (err, results) => {
    if(err) {                    // if error
      return res.send(err);      // render error message      
    }
    else {                        // if no error
      return res.json({           // render the query result
        data: results
      })
    }
  });
}); // this is working

// Get all users POST
router.post('/get-all-users', (req, res) => {
  //console.log(req.body.message);

  connection.query( query.SELECT_ALL_USER, (err, results) => {
    //console.log(results);
    if(err) {                    // if error
      res.send(err);      // render error message      
    }
    else {                        // if no error
      res.send( results );         // send the results to the client
    }
  });

});

module.exports = router; // 'module' is like 'this' (verified?) 