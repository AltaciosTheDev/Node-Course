require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const mainRouter = require('./routes/main')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')



//middleware
app.use(express.static('./public'))
app.use(express.json())



//routes
app.use('/api/v1/', mainRouter)

//last middleware
app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

//start server and listen
const start = async() => {
    try{
        //await connectDB(process.env.MONGO_URI)

        console.log('connection to db successful')
        app.listen(port, console.log(`Server is listening on port ${port}`))
    }
    catch(err){
        console.log(err)
    }
}

start()