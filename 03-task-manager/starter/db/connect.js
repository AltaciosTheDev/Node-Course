const mongoose = require('mongoose')



connectDB = (url) => {
    //because we need this function to return the function from the connection
    return mongoose.connect(url)
}

module.exports = connectDB //we dont want to invoke here, thats why no ()
