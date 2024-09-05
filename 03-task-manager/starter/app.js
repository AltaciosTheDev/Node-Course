const express = require('express')//importing function 
const app = express()//executing function that returns express instance 
const tasksRouter = require('./routes/tasks')//importing routes
const connectDB =require('./db/connect')
require('dotenv').config() //loads variables con .env to process.env
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

//native middleware

app.use(express.static('./public')) //will take care of static file requests from client and server them from the specific path
app.use(express.json()) //without it, data from request will be undefined

//routes
app.use('/api/v1/tasks', tasksRouter)

//custom middleware
app.use(notFound) //must be after the specified routes so this handles the rest
app.use(errorHandlerMiddleware)
const port = process.env.PORT | 3000

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        console.log(`Connect to db successful... `)
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
          );
    }   
    catch(err){
        console.log(err)
    }
}

start()

