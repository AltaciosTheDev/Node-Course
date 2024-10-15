//Error handler will handler every async error thanks to express-async-errors package.

const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  console.log(err)
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err }) // will check multiple mongoose errors with this custom Class Error
}

module.exports = errorHandlerMiddleware











