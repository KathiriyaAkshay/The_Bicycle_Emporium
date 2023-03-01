const mongoose = require('mongoose');
require("../db/conn")
const validator = require("validator")
const orderSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
    },
    item_id: {
        type: String,
        required: true
    },
    item_name: {
        type: String,
        required: true
    },
    photoUrl: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    item_value: {
        type: Number,
        required: true
    },
    total_amount: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    orderDate:{
        type:Date,
        default:Date.now()
    },
    paymentID:{
        type: String,
        required: true
    },
    deliveryDate:{
        type:Date,
        default:null
    },
    deliveryStatus: {
        type: Boolean,
        default: false
    }
});

const OrderItem = new mongoose.model("order", orderSchema)
module.exports = OrderItem;