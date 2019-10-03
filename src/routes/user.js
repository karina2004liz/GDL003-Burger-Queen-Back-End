const service = require('../userServices/service');
const User = require('../models/user')
const express = require('express');

module.exports.createUser = (req, res) => {
  // create a sample user
  var nick = new User({ 
    name: 'Rodrigo', 
    password: 'pro',
    admin: true 
  });

  // save the sample user
  nick.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
};


// API ROUTES
var apiRoutes = express.Router(); 

module.exports.userLog = (req, res) => {
  res.json({ message: 'Bienvenido al api de programacion.com.py :)' });
};

module.exports.userJson = (req, res) => {
  User.find({}, function(err, users) {
    res.json(users);
  });
};   

// Route to authenticate a user (POST http://localhost:3000/api/authenticate)
module.exports.userAuth = (req, res) => {
	//find the user
	User.findOne({
		name: req.body.name
	}, function(err, user) {

	if (err) throw err;

	if (!user) {
		res.json({ success: false, message: 'Authentication failed. User not found.' });
	} else if (user) {

	// check if password matches
	if (user.password != req.body.password) {
		res.json({ success: false, message: 'Authentication failed. Wrong password.' });
	} else {
		// return the information including token as JSON
		res.json({
		success: true,
		message: 'Enjoy your token!',
		token: service.createToken(user)
		});
	}
	}
	});
};

// Secure route
module.exports.userAuthStart = (req, res) => {
	var token = req.headers.authorization.split(" ")[1];  
	res.json({ message: 'Estás autenticado correctamente y tu _id es:'+req.user });
};


