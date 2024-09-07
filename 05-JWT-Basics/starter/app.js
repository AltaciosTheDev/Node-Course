require('dotenv').config()
require('express-async-errors')
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const express = require('express')

//app
const app = express()

//middleware
app.use(express.static('./public'))
app.use(express.json())



//last middleware
app.use(notFound)
app.use(errorHandlerMiddleware)


//start server and listen
const start = async() => {
    try{
        await connectDB(process.env.MONGO_URI)
        console.log('connection to db successful')
        console.log('Server is listening on port 3000')
    }
    catch(err){
        console.log(err)
    }
}

start()