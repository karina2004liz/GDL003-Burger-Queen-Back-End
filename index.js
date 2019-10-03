'use strict'

require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors');
const productsFunctions = require('./src/routes/product.js')
const ordersFunctions = require('./src/routes/order.js')
const authCtrl = require('./src/userServices/auth.js')
const middleware = require('./src/userServices/middleware.js')
const router = express.Router();
const CONNECTION_URL = "mongodb://admin:nekoffee@nekoffee-shard-00-00-6mrwt.mongodb.net:27017,nekoffee-shard-00-01-6mrwt.mongodb.net:27017,nekoffee-shard-00-02-6mrwt.mongodb.net:27017/Nekoffee?ssl=true&replicaSet=Nekoffee-shard-0&authSource=admin";
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.listen(port, err => {
  if (err) throw err
  console.log(`> Ready On Server http://localhost:${port}`)
});

let connectMongoose = (cb) => {
  if (mongoose.connection.readyState == 1) {
    return cb()
  }
  mongoose.connect(CONNECTION_URL, cb)
}

let withMongoose = (next) => {
  return (req, res) => {
    connectMongoose((err) => {
      if (err) return res.status(500).send({ message: "Failed to connect to mongoose: " + err })
      next(req, res)
    })
  }
}

/*app.get('/', (req, res)=>{
  res.send("Hola")
})*/

app.get('/api/products', withMongoose(productsFunctions.getProducts))
app.get('/api/products/:productId', withMongoose(productsFunctions.getProductId))
app.post('/api/products', withMongoose(productsFunctions.postProduct))
app.put('/api/products/:productId', withMongoose(productsFunctions.putProduct))
app.delete('/api/products/:productId', withMongoose(productsFunctions.deleteProduct))

app.get('/api/orders', withMongoose(ordersFunctions.getOrders))
app.get('/api/orders/:orderId', withMongoose(ordersFunctions.getOrderId))
app.post('/api/orders', withMongoose(ordersFunctions.postOrder))
app.put('/api/orders/:orderId', withMongoose(ordersFunctions.putOrder))
app.delete('/api/orders/:ordersId', withMongoose(ordersFunctions.deleteOrder))



