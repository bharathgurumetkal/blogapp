//create admin api app
const exp=require('express')
adminApp=exp.Router()
const bcryptjs=require('bcryptjs')
const expressAsyncHandler=require('express-async-handler')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const verifyToken=require('../Middlewares/verifyToken')

let adminscollection
let authorscollection
adminApp.use((req,res,next)=>{
    adminscollection=req.app.get('adminscollection')
    authorscollection=req.app.get('authorscollection')
    next()
})

adminApp.post('/login',expressAsyncHandler(async(req,res)=>{
    //get credentials from admin
    const adminCred=req.body
    const dbAdmin=await adminscollection.findOne({username:adminCred.username})
    if(dbAdmin===null){
        res.send({message:"Invalid username"})
    }
    else{
        const status=await bcryptjs.compare(adminCred.password,dbAdmin.password)
        if(status===false){
            res.send({message:"Invalid password"})
        }
        else{
            const signedToken=jwt.sign({username:dbAdmin.username},process.env.SECRET_KEY,{expiresIn:"1w"})
            res.send({message:"login success",token:signedToken,user:dbAdmin})
        }
    }
}))

adminApp.get('/articles-for-admin',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get articlescollection from express app
    const articlescollection=req.app.get('articlescollection')
    //get all articles
    let articles=await articlescollection.find({status:true}).toArray()
    //send response
    res.send({message:"articles",payload:articles})
}))

//change activeStatus of the User
adminApp.put('/user/:username',expressAsyncHandler(async(req,res)=>{
    const username=req.params.username
    let userData=await authorscollection.findOne({username:username})
    let status
    if (userData.activeStatus===true){
        status=await authorscollection.findOneAndUpdate({username:username},{$set:{...userData,activeStatus:false}},{returnDocument:"after"})

    }
    if (userData.activeStatus===false){
        status=await authorscollection.findOneAndUpdate({username:username},{$set:{...userData,activeStatus:true}},{returnDocument:"after"})
    }
    res.send({message:"status",payload:status.activeStatus})

}))

adminApp.get('/user-status/:username',verifyToken,expressAsyncHandler(async(req,res)=>{
    const username=req.params.username
    let userData=await authorscollection.findOne({username:username})
    res.send({message:"user Status",payload:userData.activeStatus})
}))

//export adminApp
module.exports=adminApp