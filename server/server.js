const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 5000;

// importing request handlers
const tutorial = require('./Requests/TutorialRequest');
const user = require('./Requests/UserRequest');
const login = require('./Requests/LoginRequest');

// server route handlers
app.use('/', tutorial);
app.use('/', user);
app.use('/', login);


// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage')
})


// test the connection then log it to the console
const connection = require('./Database/Connection');
connection.connect(err => {
  if(err) {
    return err;
  }
  // else console.log(database.connection);
});
console.log(`Connection to database server successful`);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(port, () => console.log(`Listening on port ${port}`));