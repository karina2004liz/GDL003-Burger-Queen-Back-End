const service = require("../userServices/service");
const User = require("../models/user");
const express = require("express");

module.exports.createUser = (req, res) => {
  // create a sample user
  var user = new User();
  user.name = req.body.name;
  user.password = req.body.password;
  user.admin = true;
  // save the sample user
  user.save(function(err) {
    if (err)
      res
        .status(500)
        .send({ message: `Error while saving user database: ${err}` });

    console.log("User saved successfully");
    res.json({ success: true });
    res.status(200).send({ token : service.createToken(user) });
  });
};

module.exports.userRegister = (req, res) => {
  User.findOne({ name: req.body.name }, function(err, user) {
    if (err) console.log(err);

    if (user.name === name)
      res.json({ success: false, message: "User registered." });
  });
};

// API ROUTES
var apiRoutes = express.Router();


module.exports.userAuth = (req, res) => {
  //find the user
  console.log({
    name: req.body.name,
    password: req.body.password
  });
  User.findOne(
      {
      name: req.body.name,
      password: req.body.password
    },
    function(err, user) {
      if (err) throw err;

      if (!user) {
        res.json({
          success: false,
          message: "Authentication failed. User not found."
        });
      } else if (user) {
        // check if password matches
        if (user.password != req.body.password) {
          res.json({
            success: false,
            message: "Authentication failed. Wrong password."
          });
        } else {
          // return the information including token as JSON
          res.json({
            success: true,
            message: "Enjoy your token!",
            token: service.createToken(user)
          });
          res.status(200);
        }
      }
    }
  );
};

module.exports.userLog = (req, res) => {
  res.json({ message: "Bienvenido al api de programacion.com.py :)" });
};

module.exports.userJson = (req, res) => {
  User.find({}, function(err, users) {
    res.json(users);
  });
};

// Route to authenticate a user (POST http://localhost:3000/api/authenticate)


// Secure route
module.exports.userAuthStart = (req, res) => {
  var token = req.headers.authorization.split(" ")[1];
  res.json({
    message: "Estás autenticado correctamente y tu _id es:" + req.user
  });
};

