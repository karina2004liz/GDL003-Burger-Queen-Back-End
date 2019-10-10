'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = Schema({
    name: String,
    price: { type: Number, default: 0 },
    category: String,
    kinds: [String],
    flavors: [String],
    uuid: String
})

module.exports.Model = mongoose.model('Product', ProductSchema);
module.exports.Schema = ProductSchema