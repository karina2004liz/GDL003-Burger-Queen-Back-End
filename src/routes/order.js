const Order = require('../models/order.js')

module.exports.getOrders = (req, res, next) => {
  Order.find((err, orders) => {
    if (err) return res.status(500).send({ message: "Error in process" })
    if (!orders) return res.status(404).send({ message: "You don´t have orders" })

    res.status(200).send({ orders })
  })
};

module.exports.getOrderId = (req, res) => {
  let orderId = req.params.orderId
  Order.findById(orderId, (err, orders) => {
    if (err) return res.status(500).send({ message: "Error in process" })
    if (!orders) return res.status(404).send({ message: "The order doesn´t exists" })
    res.status(200).send({ orders })
  })
};

module.exports.postOrder = (req, res) => {
  console.log('POST /api/orders')
  console.log(req.body)

  let order = new Order()

  order.user = req.body.user
  order.date = req.body.date
  order.client = req.body.client
  order.request = req.body.request

  order.save((err, orderStored) => {
    if (err) res.status(500).send({ message: `Error while saving in database: ${err}` })
    res.status(200).send({ order: orderStored })
  })
};

module.exports.putOrder = (req, res) => {
  let orderId = req.params.orderId
  let update = req.body
  Order.findByIdAndUpdate(orderId, update, (err, orderUpdate) => {
    if (err) res.status(500).send({ message: `Error to update the order: ${err}` })

    res.status(200).send({ order: orderUpdate })
  })
};

module.exports.deleteOrder = (req, res) => {
  let orderId = req.params.orderId

  Order.findById(orderId, (err, order) => {
    if (err) res.status(500).send({ message: `Error to delete the order: ${err}` })

    order.remove(err => {
      if (err) res.status(500).send({ message: `Error to delete the order: ${err}` })
      res.status(200).send({ message: 'The order was deleted' })
    })
  })
};