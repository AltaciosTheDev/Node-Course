require('dotenv').config() //will load variables in .env file to the process.env object in the system 
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')
const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')
//async errors 
require('express-async-errors') // 

const express = require('express')
const app = express()

//default middleware
app.use(express.json())

//default route
app.get('/', (req, res) => {
    res.status(200).send(`<h1>Store API</h1><a href="/api/v1/products">products route </a>`)
})
//product routes
app.use('/api/v1/products', productsRouter)

//custom middleware
app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT | 3000
//constantly running the server
const start = async() => {
    //onnecting to database requires try - catch 
    try{
        //listen to server
        await connectDB(process.env.MONGO_URI)
        console.log(`connected to database....`)

        app.listen(port, () => { // does not return promise
            console.log(`Server running on port ${3000}`)
        })
    }
    catch(err){
        console.log(err)
    }
        
}

start()