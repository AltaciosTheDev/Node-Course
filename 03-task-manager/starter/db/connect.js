const mongoose = require('mongoose')



const connectDB = (url) => {
    //how we work with this is promise based, most functions returning promises will be returned to access the promise
    return mongoose.connect(url)
}

module.exports = connectDB //we dont want to invoke here, thats why no ()

