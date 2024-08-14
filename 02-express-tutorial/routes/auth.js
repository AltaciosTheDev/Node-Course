const express = require('express')
const auth = express.Router()

//POST: insert data 
auth.post('/', (req, res) => {
    console.log(req.body)
    const {name} = req.body

    if(name){
        return res.status(200).send(`Welcome ${name}` )
    }

    res.status(401).send('Please provide credentials')
})

module.exports = auth