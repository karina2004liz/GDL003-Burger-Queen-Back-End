'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors');
const productsFunctions = require('./routes/product.js')
const ordersFunctions = require('./routes/order.js')
const authCtrl = require('./userServices/auth.js')
const middleware = require('./userServices/middleware.js')
const router = express.Router();


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())




app.listen(port, err => {
  if (err) throw err
  console.log(`> Ready On Server http://localhost:${port}`)
});

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
})

