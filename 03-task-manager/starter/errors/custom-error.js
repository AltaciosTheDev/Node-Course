//my own custom error definition
class CustomAPIError extends Error {
    constructor(message, statusCode) {
      super(message)
      this.statusCode = statusCode
    }
  }

  //function to call and create an error
  const createCustomError = (msg, statusCode) => {
    return new CustomAPIError(msg, statusCode)
  }
  
  module.exports = { createCustomError, CustomAPIError }
  