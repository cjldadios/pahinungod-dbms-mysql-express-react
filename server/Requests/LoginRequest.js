var express = require('express'); // required as an express file
const bodyParser = require('body-parser');

const query = require('./../Database/Query.js'); // import sql statements
const connection = require('./../Database/Connection.js'); // import database connection

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

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

// LOGIN POST
router.post('/login', (req, res) => {
  //console.log(req.body);
  const { username, password } = req.body; // aliasing
  
  connection.query(query.SELECT_ALL_FROM_USER_GIVEN_USERNAME_AND_PASSWORD(username, password), (err, results) => {
    if(err) {
      res.send(err);
    } else {
      res.send(results);
    }
  })

  
});

module.exports = router;


// # sample INSERT but incompatible code
// app.get('/products/add', (req, res) => {
//   const { name, price } = req.query;
//   //console.log(name, price);
//   const INSERT_PRODUCTS_QUERY = `INSERT INTO products(name, price
//   ) VALUES('${name}', '${price}')`;
//   connection.query(INSERT_PRODUCTS_QUERY, (err, results) => {
//     if(err) {
//       return res.send(err);
//     }
//     else {
//       return res.send('successfuly added product')
//     }
//   });
// });

// res.send( // this must be string or JSON object
  //   {
  //     "post" : "response", "post2" : "response2"
  //   }

  // );