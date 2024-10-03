//load env variables
require('dotenv').config()
//async errors
require('express-async-errors')

const express = require('express')
const app = express()
const connectDB = require('./db/connect')
//custom middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
//import router
const productRouter = require('./routes/products')

//default middleware
app.use(express.json())

//routes
app.get('/', (req, res) => {
    res.send('<h1>Store api </h1><a href="/api/v1/products"> products route</a>')
})

//products route 
app.use('/api/v1/products', productRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 3000 

const start = async( ) => {
    try{
        //connect db
        await connectDB(process.env.MONGO_URI)
        console.log('connected to db')
        app.listen(port, console.log(`server is listening port ${port}...`))
    }
    catch(error){
        console.log(error)
    }
}

start()