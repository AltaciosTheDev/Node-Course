const Task = require('../models/task')

//done
const getAllTasks = async (req,res) => {
    try{
        const tasks = await Task.find({}) //returns array 
        res.status(200).json(tasks)

    }
    catch(err){
        res.status(500).json(err)
    }
}

//done
const createTask = async (req, res) => {
    try{
        const task = await Task.create(req.body) 
        res.status(201).json(task) //this only executes when the promise executes sucessfully. Try - Catch will always avoid loop of uncaught exception.
    }
    catch(err){
        res.status(500).json(err)
    }
}

//done
const getTask = async(req, res) => {
    try{
        const {id:taskID} = req.params
        const task = await Task.findOne({_id:taskID}) //returs only one
        if(!task){
            return res.status(404).json({message: `Task with id: ${taskID} not found`}) //always return the answer to exit the function
            
        }
        res.status(200).json(task)
    }
    catch(err){
        res.status(500).json({ message: 'Internal Server Error', error: err })
    }

}

//done
const updateTask = async (req, res) => {
    try{
        const {id:taskID} = req.params
        const task = await Task.findOneAndUpdate({_id:taskID},req.body, {new:true, runValidators:true})
        if(!task){
            return res.status(404).json({msg: `Task with id: ${taskID} not found`})
        }
        res.status(200).json(task)
    }   
    catch(err){
        res.status(500).json({message: 'Internal Server Error', error: err})
    }
}

//done
const deleteTask = async (req, res) => {
    const {id:taskID} = req.params
    try{ 
        const task = await Task.findOneAndDelete({_id: taskID})
        if(!task){
            return res.status(404).json({ message: 'Internal Server Error', error: err })
        }
        res.status(200).json(task)
    }
    catch(err){
        res.status(500).json({ message: 'Internal Server Error', error: err })

    }

}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}