'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors');
const productsFunctions = require('./src/routes/product.js')
const ordersFunctions = require('./src/routes/order.js')
const authCtrl = require('./src/userServices/auth.js')
const middleware = require('./src/userServices/middleware.js')
const router = express.Router();

const CONNECTION_URL = "mongodb+srv://admin:nekoffee@nekoffee-6mrwt.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "Nekoffee";

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var database, collection;


app.listen(3000, () => {
  MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
      if(error) {
          throw error;
      }
      database = client.db(DATABASE_NAME);
      collection = database.collection("products");
      console.log("Connected to `" + DATABASE_NAME + "`!");
  });
});

/*app.listen(port, err => {
  if (err) throw err
  console.log(`> Ready On Server http://localhost:${port}`)
});*/

app.get('/', (req, res)=>{
  res.send("Hola")
})
app.get('/api/products', productsFunctions.getProducts)
app.get('/api/products/:productId', productsFunctions.getProductId)
app.post('/api/products', productsFunctions.postProduct)
app.put('/api/products/:productId', productsFunctions.putProduct)
app.delete('/api/products/:productId', productsFunctions.deleteProduct)

app.get('/api/orders', ordersFunctions.getOrders)
app.get('/api/orders/:orderId', ordersFunctions.getOrderId)
app.post('/api/orders', ordersFunctions.postOrder)
app.put('/api/orders/:orderId', ordersFunctions.putOrder)
app.delete('/api/orders/:ordersId', ordersFunctions.deleteOrder)


mongoose.connect('mongodb://localhost:27017/Nekoffee', (err, res) => {
  if (err) {
    return console.log(`Error to connect with database: ${err}`)
  }

  console.log('Connected...')
})

/*mongoose.connect('mongodb+srv://admin:nekoffee@nekoffee-6mrwt.mongodb.net/test', (err, res) => {
  if (err) {
    return console.log(`Error to connect with database: ${err}`)
  }

  console.log('Connected...')
})
*/
