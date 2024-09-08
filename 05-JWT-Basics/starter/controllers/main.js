const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error')

const login = async (req, res) => {
    const {username, password} = req.body 

    //if username or password not included throw error, and errorHanlderMiddleware will handle it.
    if(!username || !password){
        throw new CustomAPIError(400, 'Please provide email and password')
    }
    const id = new Date().getDate() //gets the day, which in english it is usually called the date

    //try to keep payload small, better experience for user
    const token = jwt.sign({id,username},process.env.JWT_SECRET, {expiresIn:'30d'}) //info, secret, options
    res.status(200).json({msg: 'user created', token: token})
}

//with databases 3 options:   
    //1)moongose validations  (want to learn with mongoose)
    //2)Joi (validations)     (used in jobs so i'm interested)
    //3)check in controller   (used to doing it in controller)

const dashboard = async (req, res) => {
    console.log(req.user)
    const luckyNumber = Math.floor(Math.random() * 100)
    res.status(200).json({msg: `Hello, ${req.user.username}`, secret: `Here is your authorized data, your lucky number is ${luckyNumber}`})

}

module.exports = {
    login, 
    dashboard
}