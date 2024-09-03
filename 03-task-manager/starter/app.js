const express = require('express')
const tasksRouter = require('./routes/tasks')
const app = express()
const connectDB =require('./db/connect')
require('dotenv').config() //loads variables con .env to process.env
const port = 3000 

//middleware
app.use(express.json()) //without it, data from request will be undefined 
app.use('/api/v1/tasks', tasksRouter)

//routes
app.get('/hello', (req, res) => {
    res.send('Task Manager App')
})

//app.get('/api/v1/tasks')       - get all tasks
//app.post('api/v1/tasks')       - create a new task 
//app.get('api/v1/tasks/:id')    - get single task 
//app.patch('api/v1/tasks/:id')  - edit single task 
//app.delete('/api/v1/tasks/:id) - delete single task

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        console.log(`Connect to db successful... .then => `)
        app.listen(port, console.log(`server is listening on port ${port} ..`)) 
    }   
    catch(err){
        console.log(err)
    }
}

start()

