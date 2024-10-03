const mongoose = require('mongoose')

const connectDB = (url) => {
  //returns a promise so the function has to return 
  return mongoose.connect(url)
}

module.exports = connectDB
//module.exports = connectDB //we dont want to invoke here, thats why no ()

