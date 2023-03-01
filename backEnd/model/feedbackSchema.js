const mongoose=require("mongoose")
require("../db/conn")
const validator=require("validator")

const feedbackSchema= mongoose.Schema({
    name :{
        type:String,
        required: true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        validate(val){
            if(!validator.isEmail(val))
                throw new Error("Email is invalid")
        },
        required:true
    },
    feedbacks:[{
        feedback:{
            type:String
        },
        date:{
            type:Date,
            default:Date.now()
        }
    }],
})
const Feedback=new mongoose.model("Feedback",feedbackSchema)
module.exports=Feedback;