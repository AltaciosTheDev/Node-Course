require('dotenv').config();         //load .env variables to process.env global var 
require('express-async-errors');    //to wrap around all controllers and handle async errors 
const express = require('express'); //import express
const app = express();              //create express app

// import custom middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//use default middleware 
app.use(express.json()); //if not parsed, will appear undefined due to format

// extra packages

// routes
app.get('/', (req, res) => {
  res.send('jobs api');
});

//use custom middleware after routers
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
