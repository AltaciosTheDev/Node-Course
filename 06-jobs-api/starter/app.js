require('dotenv').config();         //load .env variables to process.env global var 
require('express-async-errors');    //to wrap around all controllers and handle async errors 
const express = require('express'); //import express
const app = express();              //create express app

//connectDB
const connectDB = require('./db/connect')

//import routers
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')

// import custom middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//use default middleware 
app.use(express.json()); //if not parsed, will appear undefined due to format

// extra packages

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobsRouter)

//use custom middleware after routers
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    console.log('database connection secured')
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
