const CustomAPIError = require('../errors/custom-error')

const errorHandlerMiddleware = (err,req, res,next) => {  //always be careful of next, it must always have the next parameter
    if(err instanceof CustomAPIError){
        console.log('we are here')
        return res.status(err.statusCode).json({msg: err.message})    
    }
    return res.status(500).send('Something went wrong try again later')
}

module.exports = errorHandlerMiddleware