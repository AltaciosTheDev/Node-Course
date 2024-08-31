const express = require('express')
const app = express()

//req => middleware => res

const logger = (req,res,next) => {
    const method = req.method
    const url = req.url 
    const time = new Date().toUTCString()
    console.log(method, url, time)
    //res.send('Testing')
    next()
}



app.get('/', logger,(req,res) => {
   //express takes care of passing the parameters req,res to the middleware in the invoke
   res.send('Home')
})

app.get('/about',logger, (req, res) => {
    res.send('This is the about page the client requested')
})

app.listen(5000, () => {
    console.log('Server is listening on port 5000')
})