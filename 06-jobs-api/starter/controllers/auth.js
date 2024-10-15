const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require('../errors')



const register = async (req, res) => {

    const user = await User.create({...req.body})//req and sendig request to create document is first.
    res.status(StatusCodes.CREATED).json({user}) //201
}

const login = async ( req, res ) => {
    res.send('login user')
}

module.exports = {
    register, login 
}