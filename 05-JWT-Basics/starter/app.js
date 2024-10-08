//libraries
require('dotenv').config()
require('express-async-errors')

//app
const express = require('express')
const app = express()

//router
const Authrouter = require('./routes/main')
//custom middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

//default middleware
app.use(express.static('./public'))
app.use(express.json())

//use custom middleware
app.use('/api/v1',Authrouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const start = async () => {
  try {
    app.listen(3000, () =>
      console.log(`Server is listening on port ${3000}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
