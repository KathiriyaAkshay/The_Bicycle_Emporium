const express = require("express")
const app = express()
const path = require('path')
const CycleItem = require("../model/cycleSchema")
const OrderItem = require("../model/orderSchema");
const jwt = require("jsonwebtoken")
const userPath = path.join(__dirname, "../model/userSchema")
const User = require(userPath)

app.post("/placeOrder", async (req, res) => {
    try {
        const id = req.body.id;
        const token = req.body.token;
        if (token == "NOTEXIST") {
            res.json({ "status": "No" })
        }
        const tokenKey = process.env.PRIVATEKEY;
        const userDetails = jwt.verify(token, tokenKey);
        const item = await CycleItem.findOne({ "_id": id });

        const username = userDetails.name;
        const email = userDetails.email;

        const item_id = item._id;
        const item_name = item.name;
        const photoUrl = item.photo;
        const quantity = req.body.quantity;
        const item_value = item.price;
        const total_amount = quantity * item_value;
        const address = req.body.address;
        const paymentID = req.body.paymentID;
        const orderDate = Date.now();

        const r = await CycleItem.updateOne({ "_id": id }, { $inc: { quantity: -quantity } })
        if (r) {
            const orderItem = new OrderItem({ username, email, item_id, item_name, photoUrl, quantity, item_value, total_amount, paymentID, address, orderDate })
            await orderItem.save();
            res.json({ "status": "success" })
        }
        else{
            res.json({ "status": "failure" })
        }
    }
    catch (err) {
        res.json({ "status": "No" })
    }
})

app.post('/getOrdersByEmail', async (req, res) => {
    try {
        const token = req.body.token;
        const status = req.body.status;
        const tokenKey = process.env.PRIVATEKEY;
        const userDetails = jwt.verify(token, tokenKey)
        const orders = await OrderItem.find({ email: userDetails.email, deliveryStatus: status })
        res.json({ "orders": orders })
    }
    catch {
        res.json({ "orders": "error" })
    }
})

app.delete('/cancelOrder', async (req, res) => {
    const token = req.body.token;
    const id = req.body.id;
    const orderDate = req.body.orderDate;
    const quantity = req.body.quantity;
    const tokenKey = process.env.PRIVATEKEY;
    const userDetails = jwt.verify(token, tokenKey)
    let r=await CycleItem.updateOne({"_id":id},{$inc:{"quantity":quantity}})
    let response = await OrderItem.deleteOne({ email: userDetails.email, id, orderDate })
    if (r && response) {
        res.json({ "status": "success" })
    }
    else {
        res.json({ "status": "failed" })
    }
})

app.post('/getOrdersAdmin', async (req, res) => {
    try {
        const status = req.body.status;
        const orders = await OrderItem.find({ deliveryStatus: status })
        res.json({ "status": "success", "orders": orders })
    }
    catch {
        res.json({ "status": "failed" })
    }
})

app.post('/deliverOrder', async (req, res) => {
    try {
        const email = req.body.email;
        const item_id = req.body.id;
        const orderDate = req.body.orderDate;
        const deliveryDate = req.body.deliveryDate;
        let response = await OrderItem.updateOne({ email, item_id, orderDate }, { $set: { deliveryStatus: true, deliveryDate } })
        console.log(response);
        if (response) {
            res.json({ 'status': "success" })
        }
        else {
            res.json({ 'status': "failed" })
        }
    }
    catch {
        res.json({ 'status': "failed" })

    }
})

app.post('/getDetails', async (req, res) => {
    let id = req.body.id
    let token = req.body.token
    const tokenKey = process.env.PRIVATEKEY;
    const userDetails = jwt.verify(token, tokenKey)

    let cycle = await CycleItem.findOne({ _id: id })
    res.json({ "amount": cycle.price, "username": userDetails.name, "email": userDetails.email, "contact": userDetails.phone })
    // console.log(data);
})

app.post("/getQuantity", async (req, res) => {
    const id = req.body.id;
    console.log(id);
    let cycle = await CycleItem.findOne({ "_id": id })
    if (!cycle || cycle.quantity == undefined || cycle.quantity == null) {
        res.json({ "quantity": 0 })
    }
    else {
        res.json({ "quantity": cycle.quantity })
    }
})

module.exports = app;