const {BadRequestError} = require('../errors') //will get back the index.js 
const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')

const register = async (req, res) => {
    //const {name, email, password} = req.body
    //if(!name || !email || !password) {
      //  throw new BadRequestError('Please provide name, email, password') //our own logic errors take precedence over the default ones from mongoose
    //}
    const user = await User.create({...req.body})
    res.status(StatusCodes.CREATED).json({user}) //201
}

const login = async (req, res ) => {
    res.send('login user')
}

module.exports = {
    register, login
}