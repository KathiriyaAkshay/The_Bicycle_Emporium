const jwt=require("jsonwebtoken")
const tokenKey=process.env.PRIVATEKEY
const User=require("../model/userSchema")

const auth=async function(req,res,next){
    let token=req.cookies.jwtoken
    let userToken=jwt.verify(token,tokenKey)
    let theUser=await User.findOne({email:userToken.email})
    if(theUser){
        req.userName=theUser.name
        req.email=theUser.email
        req.phone=theUser.phone
        next()
    }
    else{
        res.send("please login")  //redirect to front end
    }
}
module.exports=auth