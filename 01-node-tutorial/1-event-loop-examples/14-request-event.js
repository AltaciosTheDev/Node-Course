const http = require('http')

//1) way to set up server
//const server = http.createServer((req, res) => {
  //  res.end('Welcome')
//})


//2)using event emitter api
const server = http.createServer()
//emits request event
//subscribe to it / listen for it / responde to it 
server.on('request', (req, res) => {
    res.end('welcome')
})
server.listen(5000)