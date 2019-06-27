const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 5000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'pahinungod'
})

// contains all the query statements to be u
const query = require('./Database/Query.js');

connection.connect(err => {
  if(err) {
    return err;
  }
});
console.log(connection);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// tutorial sample GET request
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

// tutorial sample POST request
app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

//GET all users
app.get('/user/all', (req, res) => { // accessable via route localhost:5000/user/all
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

// LOGIN POST
app.post('/login', (req, res) => {
  console.log(req.body);

  res.send( // this must be string or JSON object
    {
      "post" : "response", "post2" : "response2"
    }
  );
});

// Get all users POST
app.post('/get-all-users', (req, res) => {
  console.log(req.body.message);

  connection.query( query.SELECT_ALL_USER, (err, results) => {
    console.log(results);
    if(err) {                    // if error
      res.send(err);      // render error message      
    }
    else {                        // if no error
      res.send( results );         // send the results to the client
    }
  });

});

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


app.listen(port, () => console.log(`Listening on port ${port}`));