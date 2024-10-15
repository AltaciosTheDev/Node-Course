const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require('../errors')


const register = async (req, res) => {
    //1: validate client request
    //2: hash password
    //3: create user
    //4: generate token 
    //5: send token back
    const user = await User.create({...req.body})//req and sendig request to create document is first.
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user:{name: user.getName()}, token}) //201
}

const login = async ( req, res ) => {
    res.send('login user')
}

module.exports = {
    register, login 
}