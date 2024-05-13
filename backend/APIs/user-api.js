//create user api app
const exp=require('express')
userApp=exp.Router()
const bcryptjs=require('bcryptjs')
const expressAsyncHandler=require("express-async-handler")
const jwt=require('jsonwebtoken')
require('dotenv').config()
const verifyToken=require('../Middlewares/verifyToken')

//get usercollection app
let usercollection
let articlescollection
userApp.use((req,res,next)=>{
    usercollection=req.app.get('userscollection')
    articlescollection=req.app.get('articlescollection')
    next()
})

//user registration route
userApp.post('/user',expressAsyncHandler(async(req,res)=>{
    const newUser=req.body
    //check the duplicate user based on username
    const dbUser=await usercollection.findOne({username:newUser.username})
    //if user found

    if(dbUser!==null){
        res.send({message:"User existed"})
    }
    else{
        //hash the password
        const hashedPassword=await bcryptjs.hash(newUser.password,6)
        //replace the plain password with hashed password
        newUser.password=hashedPassword
        //create user
        await usercollection.insertOne(newUser)
        //send response
        res.send({message:"User created"})
    }
}))

//user login
userApp.post('/login',expressAsyncHandler(async(req,res)=>{
    //get Cred Obj from Client
    const userCred=req.body
    //check for username
    const dbUser=await usercollection.findOne({username:userCred.username})
    if(dbUser===null){
        res.send({message:"Invalid username"})
    }
    else{
        //check for password
        const status=await bcryptjs.compare(userCred.password,dbUser.password)
        if(status===false){
            res.send({message:"Invalid password"})
    
        }
        else{
            //create jwt token and encode it
            const signedToken=jwt.sign({username:dbUser.username},process.env.SECRET_KEY,{expiresIn:'1w'})
            //send response
            res.send({message:"login success",token:signedToken,user:dbUser})
        }
    }
}))


//view articles route
userApp.get('/articles',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get articlescollection from express app
    const articlescollection=req.app.get('articlescollection')
    //get all articles
    let articles=await articlescollection.find({status:true}).toArray()
    //send response
    res.send({message:"articles",payload:articles})
}))


//post comments for an article by articleId
userApp.post('/comment/:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get comment from the client
    const userComment=req.body;
    //get Id of article
    const articleIdFromURL=Number(req.params.articleId)
    //insert userCommentobject to comments array of article
    let result=await articlescollection.updateOne({articleId:articleIdFromURL},{$addToSet:{comments:userComment}})
    res.send({message:"comment posted"})
}))

//export userApp
module.exports=userApp