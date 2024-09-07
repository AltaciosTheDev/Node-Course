require('dotenv').config() //will load variables in .env file to the process.env object in the system 
require('express-async-errors') // needs to wrap the async route handlers before they are defined. 

const express = require('express')
const app = express()

const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')

const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

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