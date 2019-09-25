//const Mongo = require('mongodb');
//console.log(Mongo);
const express = require('express');
console.log(express);
 const app = express();
 app.use(express.json());
 app.use(express.urlencoded({extended: false}));
app.use(require('./controllers/authController'));
 module.exports = app;

