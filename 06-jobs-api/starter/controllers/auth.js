const User = require('../models/User')
const {BadRequestError} = require('../errors') //will get back the index.js 
const {StatusCodes} = require('http-status-codes')
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
    //PREVIOUS VALIDATION OF BODY IN CONTROLLER, NO LONGER NEEDED. HANLDED IN MONGOOSE.
    //const {name, email, password} = req.body
    //if(!name || !email || !password) {
      //  throw new BadRequestError('Please provide name, email, password') //our own logic errors take precedence over the default ones from mongoose
    //}/this is how i did it before with python when learning paths

    //PREVIOUS HASHING IN CONTROLLER, NO LONGER NEEDED. HANDLED IN MONGOOSE.
    //const {name, email, password} = req.body
    //we could have hashed the password in the controller but we will let the mongoose middleware handle that
    //const salt = await bcrypt.genSalt(10) //salt are the random bytes in base 10 that will combine with our password
    //const hashedPassword = await bcrypt.hash(password, salt) //encrypt  the given string and combine it with the salt
    //const tempUser = {name, email, password: hashedPassword}
    const user = await User.create({...req.body})
    res.status(StatusCodes.CREATED).json({user}) //201
}

const login = async (req, res ) => {
    res.send('login user')
}

module.exports = {
    register, login
}