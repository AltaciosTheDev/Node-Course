const asyncWrapper = (fn) => {
    return async (req, res,next)=> {
        try{
            await fn(req,res,next)
        } 
        catch(error){
            next(error) //wrap everything in try catch and manually forward to express error handler()
        }
    }
}

module.exports = asyncWrapper