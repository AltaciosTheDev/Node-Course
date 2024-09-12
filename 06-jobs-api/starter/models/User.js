const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minLength: 3,
        maxLength: 50
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide valid email'],
        unique: true //creates a unique index that checks if it is unique

    },
    password:{
        type: String,
        required: [true, 'Please provide password'],
        minLength: 6,
        //maxLength: 12
    }
})

//encrypts the password here
UserSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    //next() Mongoose 5> if you use a function that returns promise, no need for next.
})
 
//instance method to get documents name
//UserSchema.methods.getName = function () { 
  //  return this.name
//}

//instance method for generating token?
UserSchema.methods.createJWT = function () {
    return jwt.sign({userId:this._id, name: this.name}, 'jwtSecret', {expiresIn: '30d'})
}

module.exports = mongoose.model('User', UserSchema) 