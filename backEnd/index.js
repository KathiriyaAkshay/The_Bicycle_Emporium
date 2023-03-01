const express=require("express")
const app=express()
require("dotenv").config()
require("./db/conn")
const router=require("./routers/index.routes")
const port=process.env.PORT || 5000
const cors=require("cors");
// const userPath=path.join(__dirname,"./model/userSchema")
// const User=require(userPath)
app.use(express.json())

app.use(cors())

app.use(router);



app.listen(port,()=>{
    console.log(`Backend running at ${port}`);
})


// mongodb+srv://Akshay:<password>@cluster0.npon4vc.mongodb.net/?retryWrites=true&w=majority