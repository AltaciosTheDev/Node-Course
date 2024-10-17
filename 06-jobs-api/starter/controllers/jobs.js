const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const getAllJobs = async (req, res) => {
    //can only access your jobs 
    const userId = req.user.userId
    console.log(req.user)
    const jobs = await Job.find({createdBy: userId}).sort('-createdAt')
    res.status(StatusCodes.OK).json({user: userId,count: jobs.length,jobs})
}

const getJob = async (req, res) => {
    res.send('get jobs')
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job}) //201 
}

const updateJob = async (req, res) => {
    res.send('update job')
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