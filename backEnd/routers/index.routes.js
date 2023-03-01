const express=require("express")
const app=express()
const fileUpload=require('express-fileupload')
app.use(fileUpload({
    useTempFiles:true
}))

const userRouter=require("./user.routes")
const itemRouter=require("./item.routes")
const orderRouter=require("./order.routes")

app.use("/user",userRouter)
app.use("/items",itemRouter)
app.use("/order",orderRouter)

module.exports=app
