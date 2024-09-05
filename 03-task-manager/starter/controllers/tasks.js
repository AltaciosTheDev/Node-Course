const Task = require('../models/task')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')

const getAllTasks = asyncWrapper(async (req,res) => {
    const tasks = await Task.find({}) //returns array 
    res.status(200).json({tasks})
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body) 
    res.status(201).json({task}) //this only executes when the promise executes sucessfully. Try - Catch will always avoid loop of uncaught exception.
})

const getTask = asyncWrapper(async(req, res, next) => {
    const {id:taskID} = req.params
    const task = await Task.findOne({_id:taskID}) //returs only one
    if(!task){
        //what this line does:
            //1: ensures the rest of the code does not run 
            //2: passes control to the next middleware
            //*: express recognizes an error passed as arg, and goes straight to errorhandler
            //3: catch is avoided
            //*: because it does not throw an exception..
            //*: if the async Task.findOne is rejected, catch executes
        return next(createCustomError(`Task with id: ${taskID} not found`, 404))
    }

    res.status(200).json({task})
})

const deleteTask = asyncWrapper(async (req, res, next) => {
    const {id:taskID} = req.params
    const task = await Task.findOneAndDelete({_id: taskID})
    if(!task){
        return next(createCustomError(`Task with id: ${taskID} not found`, 404))
    }
    res.status(200).json({task})
})

const updateTask = asyncWrapper(async (req, res, next) => {
    const {id:taskID} = req.params
    const task = await Task.findOneAndUpdate({_id:taskID},req.body, {
        new:true, 
        runValidators:true
    })
    if(!task){
        return next(createCustomError(`Task with id: ${taskID} not found`, 404))
    }
    res.status(200).json(task)
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}