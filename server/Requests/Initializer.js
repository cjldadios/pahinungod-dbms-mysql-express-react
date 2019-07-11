var express = require('express'); // required as an express file
const bodyParser = require('body-parser');

const query = require('./../Database/Query.js'); // import sql statements
const init = require('./../Database/Init.js'); // 
const connection = require('./../Database/Connection.js'); // import database connection

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// request to reinitialize the database
router.get('/init', (req, res) => {
  //console.log(req.body.message);

  // connection.query( query.SELECT_ALL_USER, (err, results) => {
  //   //console.log(results);
  //   if(err) {                    // if error
  //     res.send(err);      // render error message      
  //   }
  //   else {                        // if no error
  //     res.send( results );         // send the results to the client
  //   }
  // });

  res.send('Initializing database!');

});


module.exports = router;
