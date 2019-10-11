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
const userFunctions = require('./src/routes/user.js')
var methodOverride = require("method-override");
const middleware = require('./src/userServices/middleware.js')
const apiRoutes = express.Router();
const password = process.env.DB_PASS
require('dotenv').config()

const CONNECTION_URL = `mongodb://admin:${password}@nekoffee-shard-00-00-6mrwt.mongodb.net:27017,nekoffee-shard-00-01-6mrwt.mongodb.net:27017,nekoffee-shard-00-02-6mrwt.mongodb.net:27017/Nekoffee?ssl=true&replicaSet=Nekoffee-shard-0&authSource=admin`;

app.use(cors())
app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride())
app.use('/api', apiRoutes);


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
app.post('/api/products',middleware.ensureAuthenticated, withMongoose(productsFunctions.postProduct))
app.put('/api/products/:productId',middleware.ensureAuthenticated, withMongoose(productsFunctions.putProduct))
app.delete('/api/products/:productId',middleware.ensureAuthenticated, withMongoose(productsFunctions.deleteProduct))

app.get('/api/orders', withMongoose(ordersFunctions.getOrders))
app.get('/api/orders/:orderId', withMongoose(ordersFunctions.getOrderId))
app.post('/api/orders', withMongoose(ordersFunctions.postOrder));
app.put('/api/orders/:orderId', withMongoose(ordersFunctions.putOrder))
app.delete('/api/orders/:ordersId', withMongoose(ordersFunctions.deleteOrder))

apiRoutes.post('/createuser', withMongoose(userFunctions.createUser))
apiRoutes.get('/', withMongoose(userFunctions.userLog))
apiRoutes.get('/users', withMongoose(userFunctions.userJson))
apiRoutes.post('/authenticate', withMongoose(userFunctions.userAuth))
apiRoutes.get('/private', withMongoose(userFunctions.userAuthStart, middleware.ensureAuthenticated))
apiRoutes.post('/register', withMongoose(userFunctions.userRegister))
apiRoutes.get('/privates', middleware.ensureAuthenticated, (req, res) =>{
  res.status(200).send({message:'Tienes acceso'})
})


