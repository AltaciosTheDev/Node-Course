const CustomAPIError = require('../errors/custom-error')

const login = async ( req, res) => {
    const {username, password} = req.body
    console.log(username, password)
    if(!username || !password){
        throw new CustomAPIError('please provide email and password', 400)
    }
    res.send('fake login register signup ')
}

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json({msg:`Hell, John Doe`, secret: `Here is your authroizied data, your lucky number is ${luckyNumber}`})
}

module.exports = {
    login,
    dashboard
}