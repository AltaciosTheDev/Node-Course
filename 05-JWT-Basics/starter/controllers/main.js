require('dotenv').config()
const CustomAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken')

//1)send credentials from front to back 

const login = async ( req, res) => {
    const {username, password} = req.body
    console.log(username, password)
    //2)back validates if username and password are sent
    if(!username || !password){
        throw new CustomAPIError('please provide email and password', 400)
    }
    const id = new Date().getDate()
    //3)back creates token with user payload, signs it and sends back
    const token = jwt.sign({id,username}, process.env.JWT_SECRET, {expiresIn: '30d'}) //keep payload small 
    res.status(200).json({msg: 'user created', token})
}

//4)user sends a request to private endpoint with token in the authorization header


const dashboard = async (req, res) => {
    //5)check auth header
    const authHeader = req.headers.authorization

    //6)validate that auth header is correct format
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new CustomAPIError('No token or incorrect token format', 401)
    }
    const token = authHeader.split(' ')[1]
    

    //7)decode token to verify it is the correct one
    try{//because if decode wrong, will throw error. 
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const luckyNumber = Math.floor(Math.random()*100)
        console.log(decoded)
        res.status(200).json({msg:`Hello, ${decoded.username}`, secret: `Here is your authroizied data, your lucky number is ${luckyNumber}`})
    }
    catch(err) {
        throw new CustomAPIError('Not authorized to access this route', 401)
    }
}

module.exports = {
    login,
    dashboard
}

