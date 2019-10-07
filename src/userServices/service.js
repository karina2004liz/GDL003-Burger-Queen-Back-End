var jwt = require("jwt-simple");
var moment = require("moment");
var config = require("./config");

module.exports.createToken = function(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment()
      .add(14, "days")
      .unix()
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
};

module.exports.decodeToken = function(token){
   const decode = new Promise((resolve, reject)=>{
    try{
      const payload = jwt.decode(token, config.TOKEN_SECRET);

      if (payload.exp <= moment().unix()) {
        reject({
          status: 401,
          message: "El token ha expirado"
        })
      }

      resolve(payload.sub)

    }
    catch (err){
      reject({
        status: 500,
        message: "Invalid token"
      })


    }


   })

   return decode
}
