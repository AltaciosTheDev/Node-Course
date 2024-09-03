const mongoose = require('mongoose')


//schema: defines strcuture for document 
const TaskSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, "must provide name"],
        trim: true,
        maxlength: [20, "name can't be more than 20 chars"]
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Task', TaskSchema)
