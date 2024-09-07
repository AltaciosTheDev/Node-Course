const errorHandlerMiddleware = (err,req,res,next) => {
    console.log('if the handler executed, this would print', err)
    console.log('now print this')

    return res.status(500).json({msg: `Something went wrong, please try again.`})
}

module.exports = errorHandlerMiddleware
