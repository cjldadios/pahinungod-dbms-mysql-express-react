/* 
    This file contains all the usable database queries 
    which are imported by server.js
*/

exports.SELECT_ALL_USER = "SELECT * FROM user;";

exports.SELECT_ALL_FROM_USER_GIVEN_USERNAME_AND_PASSWORD = function (username, password) {
  return `SELECT * FROM user WHERE username='${username}' AND password='${password}'`;
};