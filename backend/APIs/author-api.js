//create author api app
const exp=require('express')
authorApp=exp.Router()
const expressAsyncHandler=require('express-async-handler')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const verifyToken=require('../Middlewares/verifyToken')

// get collection app
let authorscollection;
let articlescollection;
authorApp.use((req,res,next)=>{
    authorscollection=req.app.get('authorscollection')
    articlescollection=req.app.get('articlescollection')
    next()
})
authorApp.use(exp.json())
//author registration
authorApp.post('/author',expressAsyncHandler(async(req,res)=>{
    const newAuthor=req.body
    //check duplicate author by username
    const dbAuthor=await authorscollection.findOne({username:newAuthor.username})
    //if author existed
    if(dbAuthor!=null){
        res.send({message:"author existed"})
    }
    else{
        //hash the password
        const hashedPassword=await bcryptjs.hash(newAuthor.password,6)
        //replace plain password with hashed password
        newAuthor.password=hashedPassword
        //create author
        await authorscollection.insertOne(newAuthor)
        res.send({message:"Author created"})
    }
}))

//Author Login
authorApp.post('/login',expressAsyncHandler(async(req,res)=>{
    const authorCred=req.body
    //verify the username
    const dbAuthor=await authorscollection.findOne({username:authorCred.username})
    if(dbAuthor===null){
        res.send({message:"Invalid username"})
    }
    else{
        //compare password
        const status=await bcryptjs.compare(authorCred.password,dbAuthor.password)
        if(status===false){
            res.send({message:"Invalid password"})
        }
        else{
            const signedToken=jwt.sign({username:dbAuthor.username},process.env.SECRET_KEY,{expiresIn:'1w'})
            res.send({message:"login success",token:signedToken,user:dbAuthor})
        }
    }
}))

//get articles of same author
authorApp.get('/articles/:username',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get author name from req
    const authorName=req.params.username
    //find article by authorname
    const articlesList=await articlescollection.find({username:authorName}).toArray()
    res.send({message:"List of articles",payload:articlesList})
}))

//adding new article by author
authorApp.post('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
        //get new article from client
        const newArticle=req.body
        //post to articlescollection
        await articlescollection.insertOne(newArticle)  
        res.send({message:"New article created"})      
}))

//modify article by author
authorApp.put('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get modified by content from client
    const modifiedArticle=req.body
    let result=await articlescollection.updateOne({articleId:modifiedArticle.articleId},{$set:{...modifiedArticle}})
    let latestArticle=await articlescollection.findOne({articleId:modifiedArticle.articleId})
    res.send({message:"Artcile modified",article:latestArticle})
}))
//deleting the article
authorApp.put('/article/:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get Id of the article
    const articleIdFromUrl=(+req.params.articleId)
    //get artilce
    const articleToDelete=req.body
    if (articleToDelete.status===true){
        let modifiedArt=await articlescollection.findOneAndUpdate({articleId:articleIdFromUrl},{$set:{...articleToDelete,status:false}},{returnDocument:"after"})
        res.send({message:"Article removed",payload:modifiedArt.status})
    }
    if(articleToDelete.status===false){
        let modifiedArt=await articlescollection.findOneAndUpdate({articleId:articleIdFromUrl},{$set:{...articleToDelete,status:true}},{returnDocument:"after"})
        res.send({message:"Article restored",payload:modifiedArt.status})
    }
}))

//export authorApp
module.exports=authorApp