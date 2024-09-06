const mongoose = require('mongoose')

const connectDB = (url) => {
    return mongoose.connect(url) //its not really here where this will execute, it will execute over at app, so app needs to async/await. 
}

module.exports = connectDB