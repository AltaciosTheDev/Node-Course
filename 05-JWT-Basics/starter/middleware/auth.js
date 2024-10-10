const CustomAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken')

const authenticationMiddleware = async (req, res, next) => {
    //next here b/c we are not using another 3rd party middleware, we need to pass control to the next middleware.
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
        const {id, username} = decoded
        req.user = {id, username}
        next()
    }
    catch(err) {
        throw new CustomAPIError('Not authorized to access this route', 401)
    }
}

module.exports = authenticationMiddleware