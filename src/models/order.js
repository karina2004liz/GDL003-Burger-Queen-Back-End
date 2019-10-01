'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = Schema({
    user: String,
    date: Date,
    client: String,
    request: Array
    })

module.exports = mongoose.model('Order', OrderSchema)