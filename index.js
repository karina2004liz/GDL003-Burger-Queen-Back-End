//const Mongo = require('mongodb');


//console.log(Mongo);

/*


const express = require('express');



 const app = express();

app.listen(3001, function() {
    console.log('listening on 3001')
  })

  app.get('/products', (req, res) => {
    res.send(gato)
  })

  app.get('/', (req, res) => {
    res.send("Utilice /products para checar existencias")
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


*/

  const port = process.env.PORT || 3000

var express = require("express");
var app = express();
app.use(express.json());

app.listen(port, err => {
    if (err) throw err
    console.log(`> Ready On Server http://localhost:${port}`)
});

app.get("/get", (req, res, next) => {
    res.json({
        "version": process.env.VERSION
    });
});

app.post('/post', function(request, response) {
    response.send(request.body);
});