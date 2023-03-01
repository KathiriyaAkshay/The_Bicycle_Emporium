const { query } = require("express");
const express = require("express")
const app = express()
const CycleItem = require("../model/cycleSchema")
// const bodyParser=require("body-parser")
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dfxxtg839',
    api_key: '663536833665223',
    api_secret: process.env.SECRETKEY_CLOUDINARY,
    secure: true
});

// app.use(bodyParser);
app.use(express.json())

app.post("/addCycle", async (req, res) => {
    const name = req.body.name
    const price = req.body.price
    const description = req.body.description
    const category = req.body.category
    const photourl = req.body.photourl
    const public_id = req.body.public_id
    const avail = req.body.avail
    const quantity = req.body.quantity
    let item = new CycleItem({ 'name': name, 'price': price, 'description': description, 'category': category, 'photo': photourl, 'public_id': public_id, 'rating': 3, 'quantity': quantity, homeAvailability: avail })
    const result = await item.save();
    if (result)
        res.json({ 'status': 'added' })
    else
        res.json({ 'status': 'failed' })




    // console.log(req.body);
    // console.log(req.files);
    // await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    //     if (err == undefined) {
    //         console.log(result)
    //         let item = new CycleItem({ 'name': name, 'price': price, 'description': description, 'category': category, 'photo': result.url, 'rating': 3 })
    //         item.save();
    //         res.json({ 'status': 'added' })
    //         // .then((re)=>{
    //         //     res.json({ 'status': 'added' })
    //         // })
    //         // .catch((err)=>{
    //         //     res.json({ 'status': 'failed' })
    //         // })
    //     }
    //     else {
    //         res.json({ 'status': 'failed' })
    //     }
    // })
})

app.get('/getHomeItems', async (req, res) => {
    // const items=HomeCycleItems.find()
    const items = await CycleItem.find({ homeAvailability: true });
    // console.log(items);
    res.json({ 'items': items })
})

app.post('/getItems', async (req, res) => {
    try {
        const id = req.body.id
        let items = await CycleItem.findOne({ _id: id });
        res.json({ 'item': items })
    }
    catch {
        res.json({ "item": null })
    }
})
app.post('/getItemByName', async (req, res) => {
    const name = req.body.name
    const item = await CycleItem.findOne({ name: name });
    res.json({ 'item': item })
})

app.post('/getCategory', async (req, res) => {
    const category = req.body.category
    const items = await CycleItem.find({ category });
    res.json({ 'items': items })
})
app.delete("/deleteImg", (req, res) => {
    cloudinary.uploader
        .destroy(req.body.id)
        .then((result) => {
            response.status(200).json({
                "message": "success",
            });
        })
        .catch((error) => {
            response.status(500).json({
                "message": "Failure",
            });
        });
})
app.put("/updateCycle", async (req, res) => {
    const name = req.body.name
    const id = req.body.id
    const price = req.body.price
    const description = req.body.description
    const category = req.body.category
    const photo_available = req.body.photo_available
    const avail = req.body.avail
    const quantity = req.body.quantity
    let newItem = {
        "name": name,
        "price": price,
        "description": description,
        "category": category,
        "homeAvailability": avail,
        "quantity": quantity
    }
    if (photo_available) {
        const photourl = req.body.photourl
        const public_id = req.body.public_id
        newItem = { ...newItem, "photo": photourl, "public_id": public_id }
    }
    console.log(newItem);
    console.log(req.body.id);
    const status = await CycleItem.updateOne({ "_id": id }, { $set: newItem })
    if (!status || !status.acknowledged) {
        res.json({ "status": "failed" })
    }
    if (status.acknowledged) {
        res.json({ "status": "updated" })
    }
})
app.get('/searchNames', async (req, res) => {
    const names = await CycleItem.find({}, { name: 1, _id: false })
    res.json({ "cycles": names })
})

app.delete('/deleteCycle', async (req, res) => {
    const name = req.body.name;
    console.log(name);
    try {
        const cycle = await CycleItem.findOne({ 'name': name })
        console.log(cycle._id);
        console.log(cycle.name);
        let status = await CycleItem.deleteOne({ "_id": cycle._id })
        console.log(status);
        // console.log(cycle, '\n', status);
        // console.log(cycle.id, '\n', cycle.public_id)
        if (status) {
            res.json({ "status": "success", 'public_id': cycle.public_id })
        }
        else {
            res.json({ "status": 'failed' })
        }
    }
    catch {
        res.json({ "status": 'NOTFound' })
    }
})

module.exports = app