const CustomAPIError = require('./custom-error')
const {StatusCodes} = require('http-status-codes')

class BadRequest extends CustomAPIError {
    constructor(message) {
      super(message)
      this.statusCode = StatusCodes.BAD_REQUESt
    }
  }
  
  module.exports = BadRequest
  