const Product = require('../models/product.js')

module.exports.getProducts = (req, res, next) => {
  Product.find((err, products) => {
    console.log("error:", err);
    if (err) return res.status(500).send({ message: "Error in process" })
    if (!products) return res.status(404).send({ message: "You don´t have products" })

    res.status(200).json({ products });
  })
};

module.exports.getProductId = (req, res) => {
  let productId = req.params.productId
  Product.findById(productId, (err, products) => {
    if (err) return res.status(500).send({ message: "Error in process" })
    if (!products) return res.status(404).send({ message: "The product doesn´t exists" })

    res.status(200).send({ products })
  })
};

module.exports.postProduct = (req, res) => {
  console.log('POST /api/products')
  console.log(req.body)

  let product = new Product()
  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description

  product.save((err, productStored) => {
    if (err) res.status(500).send({ message: `Error while saving in database: ${err}` })
    res.status(200).send({ product: productStored })
  })
};

module.exports.putProduct = (req, res) => {
  let productId = req.params.productId
  let update = req.body
  Product.findByIdAndUpdate(productId, update, (err, productUpdate) => {
    if (err) res.status(500).send({ message: `Error to update the product: ${err}` })

    res.status(200).send({ product: productUpdate })
  })
};

module.exports.deleteProduct = (req, res) => {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) res.status(500).send({ message: `Error to delete the product: ${err}` })

    product.remove(err => {
      if (err) res.status(500).send({ message: `Error to delete the product: ${err}` })
      res.status(200).send({ message: 'The product was deleted' })
    })
  })
};