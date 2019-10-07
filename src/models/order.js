'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    user: String,
    date: Date,
    client: String,
    order: Object
   
})

module.exports = mongoose.model('Order', OrderSchema)


































