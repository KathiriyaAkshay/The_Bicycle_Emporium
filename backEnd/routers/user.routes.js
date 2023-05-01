const express = require("express")
const app = express()
// const auth = require("../middleware/auth") // remaining to authenticate user at front end
const path = require("path")
// const alert = require("alert");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userPath = path.join(__dirname, "../model/userSchema")
const User = require(userPath)
const Feedback = require("../model/feedbackSchema");
const cookieParser = require('cookie-parser')
var nodemailer = require('nodemailer');
const { randomInt } = require("crypto")
app.use(cookieParser())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello home page")
    // res.send("Hello  "+req.userName)
})
app.post("/createUser", async (req, res) => {
    console.log(req.body.name);
    console.log(req.body.email)
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const tempUser = await User.findOne({ email: email })
    if (tempUser) {
        res.json({ "status": "failed" });

    }
    else {
        const newUser = new User({ name, email, password })
        const token = await newUser.generateAuthToken();
        res.json({ "status": "success", "token": token });
    }
})
app.post("/verifyEmail", (req, res) => {
    let number = randomInt(1000, 9999)
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // secure:true for port 465, secure:false for port 587
        transportMethod: 'SMTP',
        auth: {
            user: process.env.MAIL,
            pass: process.env.PW.toString()
        },
    });

    var mailOptions = {
        from: process.env.MAIL,
        to: req.body.email,
        subject: "The Bicycle Emporium management Email verification",
        text: "One Time Password for registration is : " + number
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.json({ "code": "error" })
        } else {
            // console.log('Email sent: ' + info.response);
            res.json({ "code": number })
        }
    });
})
app.post("/verifyUser", async (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const foundUser = await User.findOne({ email: email })

    if (foundUser) {
        const isPassMatched = await bcrypt.compare(password, foundUser.password)
        if (isPassMatched && name === foundUser.name) {
            const token = await foundUser.generateAuthToken()

            // req.userName=foundUser.name
            // req.userEmail=foundUser.email
            // console.log("User found");
            //res.status(200).send("User Login Successfully!!! ")

            res.json({ "status": "success", "token": token })
        }
        else {
            // alert("Invalid credentials!!!")
            res.json({ "status": "failed" });
            // res.status(400).send("unSuccessful Signup!!! ")
        }
    }
    else {
        // alert("Invalid credentials!!!")
        res.json({ "status": "NotFound" });
        // res.status(400).send("UnSuccessful signup!!! ")
    }
})
app.post("/feedback", async (req, res) => {
    try {
        const email = req.body.email
        const name = req.body.name
        const feedback = req.body.feedback
        const date = req.body.date
        let user = await Feedback.findOne({ email: email })
        if (user) {
            user.feedbacks = user.feedbacks.concat({ feedback: feedback, date:date })
            await user.save()
        }
        else {
            let newUser = new Feedback({ email: email, name: name })
            newUser.feedbacks = newUser.feedbacks.concat({ feedback: feedback, date: date })
            newUser.save()
        }
        res.json({ "status": "success" });
    }
    catch (e) {
        res.json({ "status": "failed" });
    }
})
app.post("/logout", async (req, res) => {
    const token = req.body.jwtoken
    let userToken = jwt.verify(token, process.env.PRIVATEKEY)
    let exisitingUser = await User.findOne({ email: userToken.email })
    exisitingUser.tokens = exisitingUser.tokens.filter((val) => val.token != token)
    await exisitingUser.save()
    res.json({ "status": "success" })
})

app.post("/auth", async (req, res) => {
    const tokenKey = process.env.PRIVATEKEY
    let token = req.body.token
    if (token == "NOTEXIST") {
        res.json({ "status": 'no' })
    }
    else {
        let userToken = jwt.verify(token, tokenKey)
        let theUser = await User.findOne({ email: userToken.email })
        if (!theUser || theUser === undefined) {
            res.json({ "status": "no" })  //redirect to front end
        }
       res.json({"status":"success"});
    }
})
app.post("/addtoWishlist", async (req, res) => {
    const id = req.body.id
    const token = req.body.token
    // console.log(id,'\ntoken:   ',token);
    const action = req.body.action
    const tokenKey = process.env.PRIVATEKEY

    if (token == "NOTEXIST") {
        res.json({ "status": 'no' })
    }
    let userToken = jwt.verify(token, tokenKey)
    let user = await User.findOne({ email: userToken.email })
    if (!user) {
        res.json({ "status": 'no' })
    }

    if (action) {
        user.wishlist = user.wishlist.concat({ item: id })
        await user.save();
        res.json({ "status": "successAdd" })
    }
    else {
        user.wishlist = user.wishlist.filter(val => val.item !== id)
        await user.save();
        res.json({ "status": "successRemove" })
    }
})
app.post("/checkWishlist", async (req, res) => {
    const id = req.body.id
    const token = req.body.token

    const tokenKey = process.env.PRIVATEKEY

    if (token == "NOTEXIST") {
        res.json({ "status": 'no' })
    }
    let userToken = jwt.verify(token, tokenKey)
    let user = await User.findOne({ email: userToken.email })
    if (!user) {
        res.json({ "status": 'no' })
    }

    const item = user.wishlist.filter(val => val.item === id)
    if (item.length == 0)
        res.json({ "status": "no" })
    else
        res.json({ "status": "yes" })

})

app.post('/getInfo', async (req, res) => {
    const token = req.body.token
    const tokenKey = process.env.PRIVATEKEY
    if (token == "NOTEXIST") {
        res.json({ "status": 'no' })
    }
    let userToken = jwt.verify(token, tokenKey)
    let user = await User.findOne({ email: userToken.email })
    if (!user) {
        res.json({ "status": 'no' })
    }
    res.json({ 'name': user.name, 'email': user.email, 'address': user.address })
})
app.post('/getWishlist', async (req, res) => {
    const token = req.body.token
    const tokenKey = process.env.PRIVATEKEY
    if (token == "NOTEXIST") {
        res.json({ "status": 'no' })
    }
    let userToken = jwt.verify(token, tokenKey)
    let user = await User.findOne({ email: userToken.email })
    if (!user) {
        res.json({ "status": 'no' })
    }
    res.json({ 'itemIds': user.wishlist })
})

app.get('/getfeedbacks', async (req, res) => {
    let feedbacksArray = await Feedback.find();
    res.json({ "feedbacksArray": feedbacksArray })
})

app.post('/getName', async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    res.json({ "name": user.name })
})

app.post('/changePW', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    let user = await User.findOne({ email })
    if (!user) {
        res.json({ "status": "failed" })
    }
    else {
        const pass = await bcrypt.hash(password, 10);
        const status = await User.updateOne({ "email": email }, { $set: { 'password': pass } })
        if (status) {
            res.json({ "status": "success" })
        }
        else {
            res.json({ "status": "failed" })
        }
    }
})

app.post('/changeAdd', async (req, res) => {
    const email = req.body.email
    const address = req.body.address
    let user = await User.findOne({ email })
    if (!user) {
        res.json({ "status": "failed" })
    }
    else {
        const status = await User.updateOne({ "email": email }, { $set: { 'address': address } })
        if (status) {
            res.json({ "status": "success" })
        }
        else {
            res.json({ "status": "failed" })
        }
    }
})

app.post('/sendMail', async (req, res) => {
    let email = req.body.email
    let user = null;
    user = await User.findOne({ email: email })
    if (user === null) {
        res.json({ "code": "error" })
    }
    else {
        let number = randomInt(1000, 9999)
        console.log(number);
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // secure:true for port 465, secure:false for port 587
            transportMethod: 'SMTP',
            auth: {
                user: process.env.MAIL,
                pass: process.env.PW.toString()
            },
        });

        var mailOptions = {
            from: process.env.MAIL,
            to: req.body.email,
            subject: "Password change process: The Bicycle Emporium",
            text: "Your password change OTP is : " + number
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.json({ "code": "error" })
            } else {
                console.log('Email sent: ' + info.response);
                res.json({ "code": number })
            }
        });
    }
})



module.exports = app