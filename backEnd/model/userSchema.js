const mongoose=require("mongoose")
const validator=require("validator")
require("../db/conn")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
require("dotenv").config()

const userSchema= mongoose.Schema({
    name :{
        type:String,
        required: true,
        trim:true
    },
    email :{
        type:String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
    },
    password :{
        type:String,
        required: true
    },
    gender : {
        type:String,
        enum: ["Female", "Male", "other"],
        default:"Male"
    },
    dob:{
        type:Date,
        default:Date.now, 
    },
    address:{
        type:String,
        default:"Add Address"
    },
    wishlist:[{
        item:{
            type:String,
            required: true
        }
    }],
    tokens:[{
        token:{
            type:String,
            required: true
        }
    }],
})
userSchema.methods.generateAuthToken=async function(){
    const token=await jwt.sign({email:this.email,name:this.name},process.env.PRIVATEKEY)
    this.tokens=await this.tokens.concat({token:token})
    await this.save()
    return token    
}

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10)
    }
    next()
})
const User=new mongoose.model("User",userSchema)
module.exports=User;
