'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors');
const productsFunctions = require('./src/routes/product.js')
const ordersFunctions = require('./src/routes/order.js')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(port, err => {
  if (err) throw err
  console.log(`> Ready On Server http://localhost:${port}`)
});

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

mongoose.connect('mongodb+srv://karina2004liz:<password>@firstdatabase-t9rak.gcp.mongodb.net/test?retryWrites=true&w=majority', (err, res) => {
  if (err) {
    return console.log(`Error to connect with database: ${err}`)
  }
})

let products = {

  products: [

    {
      name: "coffee",
      price: 15,
      id: 1,
    },
    {
      name: "tea",
      price: 10,
      id: 2,
    },
    {
      name: "chocolate",
      price: 20,
      id: 3

    }

  ]
}
