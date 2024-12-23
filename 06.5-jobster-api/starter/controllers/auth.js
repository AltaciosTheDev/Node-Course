const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
  const user = await User.create({ ...req.body })
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({user: {
    name: user.name,
    lastName: user.lastName,
    email:user.email,
    location: user.location,
    token
  }})
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  // compare password
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

const updateUser = async(req, res) => {
  //destructure request
  const {email, name, lastName, location} = req.body
  //validate all values where provided 
  if(!email || !name || !lastName || !location) {
    throw new BadRequestError('Please provide all values')
  }
  //update user
  const user = await User.findByIdAndUpdate({_id: req.user.userId}, req.body, { new: true, runValidators: true })
  //generate token 
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({user: {
    name: user.name,
    lastName: user.lastName,
    email:user.email,
    location: user.location,
    token
  }})

}

module.exports = {
  register,
  login,
  updateUser
}
