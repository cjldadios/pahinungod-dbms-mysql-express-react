'use strict';

var sql = require('./db.js');

var User = function(user) {
	this.user = user.user;
};

User.addUser = function (newUser, result) {
	sql.query(`insert into user set ?`, newUser, function(err, res){
		if(err){
			console.log("error: ", err);
			result(null,err);
		}else{
			console.log(res.insertId);
			result(null, res.insertId);
		}
	});
};

User.viewUsers = function (result) {
	sql.query(`select * from user`, function(err, res) {
		if(err) {
			console.log("error: ", err);
			result(null, err);
		}else{
			console.log("users: ", res);

			result(null, res);
		}
	});
};

User.deleteUser = function(id, result) {
	sql.query(`delete from user where userId = ?`, [id], function(err ,res) {
		if(err) {
			console.log('error: ', err);
			result(null, err);
		}else{
			console.log('deleted the user');
			result(null, res);
		}
	});
};

User.updateUser = function(id, result) {
	sql.query(`update user set lastname = ? where id = ?`, [user.user, id], function(err,res) {
		if(err) {
			console.log('error: ', err);
			result(null, err);
		}else{
			console.log('updated the user');
			result(null, res);
		}
	});
};

module.exports = User;