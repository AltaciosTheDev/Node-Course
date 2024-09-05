const {CustomAPIError} = require('../errors/custom-error')

const errorHandlerMiddleware = (err,req,res) => {
    if(err instanceof CustomAPIError){
        return res.status(err.statusCode).json({msg: err.message})
    }
    //must always return or send from the middleware and handlers 
    return res.status(500).json({msg: 'Something went wrong, please try again'})
}

module.exports = errorHandlerMiddleware