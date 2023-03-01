const mongoose=require("mongoose")
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB,{
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(()=>console.log("Successful connection :) !!!"))
.catch((err)=>console.log(err))