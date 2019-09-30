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
*/
'use strict'

const express = require ('express')
const bodyParser = require ('body-parser')
const mongoose = require ('mongoose')

const Product = require('./models/product')

const app = express()
const port = process.env.PORT || 3000
const cors = require("cors");

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
//app.use(express.json());

app.listen(port, err => {
    if (err) throw err
    console.log(`> Ready On Server http://localhost:${port}`)
});

app.get('/api/product', (req, res, next) => {
    res.json({
        "version": process.env.VERSION
    });
    res.send(200, {products: []})
});

app.get('api/product/:productId', (req, res) => {

})

app.post('/api/product', (req, res) => {
  console.log('POST /api/product')
  console.log(req.body)

  let product = new Product()
  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description

  product.save((err, productStored) => {
    if (err) res.status(500).send({message: `Error while saving in database: ${err}`})
    res.status(200).send({product: productStored})
  })
});

app.put('/api/product/:productId', (req, res) => {

})

app.delete('/api/product/:productId', (req, res) => {

})

mongoose.connect('mongodb://localhost:27017/Nekoffee', (err, res) =>{
  if (err) {
    return console.log(`Error to connect with database: ${err}`)
  }
})

let products = {

 products: [

    {name : "coffee",
    price: 15,
    id: 1,
    },
    {
    name: "tea",
    price: 10,
    id: 2,
    },
    {name: "chocolate",
    price: 20,
    id: 3

    }

  ]
}