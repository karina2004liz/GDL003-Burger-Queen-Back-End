//const Mongo = require('mongodb');


//console.log(Mongo);

const express = require('express');

console.log(express);

 const app = express();

app.listen(3001, function() {
    console.log('listening on 3000')
  })

  app.get('/products', (req, res) => {
    res.send(gato)
  })



  var gato = {

    michi :{
        name : "michi",
        age : "5years"  

    },
    michi2 :{
        name : "michi",
        age : "5years"  

    },

    michi3 :{
        name : "michi",
        age : "5years"  

    }

    ,    michi4 :{
        name : "michi",
        age : "5years"  

    },
 

  }

  