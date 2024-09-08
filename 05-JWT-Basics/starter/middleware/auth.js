const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error')

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization //did not know we could access the req.headers

    //first check if there is a token with correct format
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new CustomAPIError(401, 'No token provided') //error if no token or bad format
    }

    //get only the token part and leave behind the bearer 
    const token = authHeader.split(' ')[1]

    //second check if the token is the correct one
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)//decide with the token, and the secret provided
        const {id, username} = decoded //extract info from decoded token, so token and decoded stays here and next middleware gets data
        req.user = {id, username} //add to the requestm, the user property
        next()  //pass control over to the next middleware
    }
    catch{(error)//necessary b/c the jwt.verify throws an error if something goes wrong, it does not always need to be aysnc.
        throw new CustomAPIError(401,'Not authorized to access this route') //error if incorrect token 
    }

}

module.exports = authMiddleware
    