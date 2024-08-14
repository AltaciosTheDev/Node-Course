const express = require('express')
const app = express()

app.get('/', (req, res) => {
  console.log('user hit the resource')
  res.status(200).send('Home Page')
})

app.get('/about', (req, res) => {
  res.status(200).send('About Page')
})

app.all('*', (req, res) => {
  res.status(404).send('<h1>resource not found</h1>')
})

app.listen(5000, () => {
  console.log('server is listening on port 5000...')
})

//Most used express methods 
//app.get
    //Used to retrieve a resource from server
//app.post
    //Insert a resource to a server
//app.put
    //Edit a resource from a server
//app.delete
    //Remove a resource from a server
//app.all
    //Can use all verbs and actions
//app.use
    //Middleware
//app.listen
    //listen for client http requests 