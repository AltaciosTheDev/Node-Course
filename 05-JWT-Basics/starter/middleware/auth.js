const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error')

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization

    //first check if there is a token with correct format
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new CustomAPIError(401, 'No token provided') //error if no token or bad format
    }

    const token = authHeader.split(' ')[1]

    //second check if the token is the correct one
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const {id, username} = decoded
        req.user = {id, username}
        next()
    }
    catch{(error)
        throw new CustomAPIError(401,'Not authorized to access this route') //error if incorrect token 
    }

}

module.exports = authMiddleware
    