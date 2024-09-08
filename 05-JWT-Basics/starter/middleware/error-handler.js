const {CustomAPIError} = require('../errors/index') 
const {StatusCodes} = require('http-status-codes')

const errorHandlerMiddleware = (err,req, res,next) => {  //always be careful of next, it must always have the next parameter
    if(err instanceof CustomAPIError){
        console.log('we are here')
        return res.status(err.statusCode).json({msg: err.message})    
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong try again later')
}

module.exports = errorHandlerMiddleware