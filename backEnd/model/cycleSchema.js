const mongoose=require('mongoose');
require("../db/conn")
const validator=require("validator")
const cycleSchema=mongoose.Schema({
    name :{
        type:String,
        required: true,
        trim:true
    },
    price:{
        type:Number,
        required:true
    },
    description :{
        type:String,
        required: true,
        trim:true
    },
    category:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    public_id:{
        type:String,
        required:true
    },
    rating:{
        type:Number
    },
    total_ratings:{
        type:Number,
        default:1000
    },
    quantity:{
        type:Number,
        required:true
    },
    homeAvailability:{
        type:Boolean,
        default:false
    }
});
const CycleItem=new mongoose.model("CycleItem",cycleSchema)
module.exports=CycleItem;