const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')
const { find } = require('../models/User')

const getAllJobs = async (req, res) => {
    //can only access your jobs 
    const userId = req.user.userId
    console.log(req.user)
    const jobs = await Job.find({createdBy: userId}).sort('-createdAt')
    res.status(StatusCodes.OK).json({user: userId,count: jobs.length,jobs})
}

const getJob = async (req, res) => {
    //nested destructuring and renaming of property 
    const {user:{userId}, params:{id:jobId}} = req
    const job = await Job.findOne({_id:jobId, createdBy:userId})

    if(!job){
        throw new NotFoundError(`No job with Id ${jobId} exists in the database.`)
    }

    res.status(StatusCodes.OK).json({user: userId, job})
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job}) //201 
}

const updateJob = async (req, res) => {
    const {user:{userId},params:{id:jobId}, body:{company, position}} = req

    if(company === "" || position === ""){
        throw new BadRequestError('Company or Position fields cannot be empty')
    }

    const job = await Job.findOneAndUpdate({_id: jobId, createdBy: userId}, req.body, {runValidators:true, new:true})

    if(!job) {
        throw new NotFoundError(`No job with id ${jobId} exists in the database`)
    }
    res.status(StatusCodes.OK).json({user: userId, job})
}

const deleteJob = async (req, res) => {
    res.send('delete job')
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}