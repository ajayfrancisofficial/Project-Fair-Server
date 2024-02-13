const jwtMiddleware = require('../Middlewares/jwtMiddleware');
const users=require('../Models/userModel')
const jwt=require('jsonwebtoken')

//register
exports.register= async(req,res)=>{
console.log("inside register API");
const {username,email,password}=req.body
console.log(username,email,password);

try{
    const existingUser=await users.findOne({email})
    console.log(existingUser);
    if(existingUser){
        res.status(406).json("Account already Exists...please log in")         
    }
    else{
        //add new user deatils into collection
        const newUser=new users({
            username,email,password,profile:"",github:"",linkedin:""     //this object creation is necessary
        })                                                              // to get the order of the data in the document
        await newUser.save()  //to save from model to db
        res.status(200).json(newUser)
    }
}
catch(err){
    res.status(401).json(err)  

}
}
//login
exports.login= async(req,res)=>{
    console.log("inside login API");
    const {email,password}=req.body
    console.log(email,password);
    
    try{
        const existingUser=await users.findOne({email,password})
        console.log(existingUser);
        if(existingUser){
            const token = jwt.sign({userId:existingUser._id},process.env.JWT_SECRET_KEY) // generated token will be 128 bit
                                //     payload           // secret key
                                // to identify every user using unique payload
            res.status(200).json({existingUser,token})         
        }
        else{
           res.status(404).json("Invalid Email or Password!!!")
        }
    }
    catch(err){
        res.status(401).json(err)  
    
    }
    }
    
//update profile
exports.editUser=async(req,res)=>{
    const userId=req.payload      //from jwtMiddleware
    const {username,email,password,github,linkedin,profileImage}=req.body
    const profile=req.file?req.file.filename:profileImage
    try{
        const updateUser= await users.findByIdAndUpdate({_id:userId},{username,email,password,profile,github,linkedin},{new:true}) 

        //in mongoose
        //note this {new:true}....to make it work properly 
        await updateUser.save()   //save in mongodb 
        res.status(200).json(updateUser)
    }
    catch(err){
        res.status(401).json(err)
    }
}