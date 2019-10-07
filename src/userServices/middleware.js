//var jwt = require("jwt-simple");
//var moment = require("moment");
//var config = require("./config");

var services = require('./service.js')

module.exports.ensureAuthenticated = function(req, res, next) {

  if (!req.headers.authorization) {
    return res.status(403).send({ message: "No tienes acceso" });
  }

  var token = req.headers.authorization.split(" ")[1];

  services.decodeToken(token)
  .then( response =>{

    req.user = response

    next()

  })
  .catch(response=>{

    res.status(response.status)
  })


};
