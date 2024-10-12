const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require('../errors')
const bcrypt = require('bcryptjs')



const register = async (req, res) => {
    const {name, email, password} = req.body //extract payload

    const salt = await bcrypt.genSalt(10) //generates salt
    const hashPassword = await bcrypt.hash(password, salt)
    const tempUser = {name, email, password: hashPassword}

    const user = await User.create({...tempUser})
    res.status(StatusCodes.CREATED).json({user}) //201
}

const login = async ( req, res ) => {
    res.send('login user')
}

module.exports = {
    register, login 
}