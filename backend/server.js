//create express app
const exp=require('express')
const app=exp()
require('dotenv').config()//process.env.PORT
const mongoClient=require('mongodb').MongoClient
const path=require('path')

//deploy react build to this server
app.use(exp.static(path.join(__dirname,'../client/build')))

//to parse body of req
app.use(exp.json())

//connect to Database
mongoClient.connect(process.env.DB_URL).then(client=>{
    //get database object
    const blogdb=client.db('blogdb')
    //get collection object
    const userscollection=blogdb.collection('userscollection')
    const articlescollection=blogdb.collection('articlescollection')
    const authorscollection=blogdb.collection('authorscollection')
    const adminscollection=blogdb.collection('adminscollection')
    //share collection with express app
    app.set('userscollection',userscollection)
    app.set('articlescollection',articlescollection)
    app.set('authorscollection',authorscollection)
    app.set('adminscollection',adminscollection)
    //confirm db connection
    console.log("DB connection success")
}).catch(err=>console.log("Error in DB",err))

//import API routes
const userApp=require('./APIs/user-api')
const authorApp=require('./APIs/author-api')
const adminApp=require('./APIs/admin-api') 

//if path starts with user-api send req to userApp
app.use('/user-api',userApp)
//if path starts with author-api send req to authorApp
app.use('/author-api',authorApp)
//if path starts with admin-api send req to adminApp
app.use('/admin-api',adminApp)

//deals with page refresh
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../client/build/index.html'))
})
//express error handler
app.use((err,req,res,next)=>{
    res.send({message:"error",payload:err.message})
    console.log(err)
})

const port=process.env.PORT || 5000
//assign port number
app.listen(port,()=>console.log(`Web server running on port ${port}`))