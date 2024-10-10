require('dotenv').config()
const {BadRequest} = require('../errors')
const jwt = require('jsonwebtoken')

//1)send credentials from front to back 

const login = async ( req, res) => {
    const {username, password} = req.body
    console.log(username, password)
    //2)back validates if username and password are sent
    if(!username || !password){
        throw new BadRequest('please provide email and password')
    }
    const id = new Date().getDate()
    //3)back creates token with user payload, signs it and sends back
    const token = jwt.sign({id,username}, process.env.JWT_SECRET, {expiresIn: '30d'}) //keep payload small 
    res.status(200).json({msg: 'user created', token})
}

//4)user sends a request to private endpoint with token in the authorization header


const dashboard = async (req, res) => {
    console.log(req.user)
    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json({msg:`Hello, ${req.user.username}`, secret: `Here is your authroizied data, your lucky number is ${luckyNumber}`})
}

module.exports = {
    login,
    dashboard
}

