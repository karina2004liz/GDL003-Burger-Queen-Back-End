'use strict'

const Product = require('../models/product.js');
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    user: String,
    date: Date,
    client: String,
    order: [Product.Schema],
    status: { type: String, default: "Pending" }
})

module.exports.Model = mongoose.model('Order', OrderSchema)
module.exports.Schema = OrderSchema



































