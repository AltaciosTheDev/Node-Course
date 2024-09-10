const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => { //without next, will not work not now not ever 
  //error received here is passed to it by the express-async-errors library
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  //at the moment if it is not: not-found, bad-request, or unauthenticated, every other error falls into 500. 
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err }) //default 500 error if not one of the other error available
}

module.exports = errorHandlerMiddleware
