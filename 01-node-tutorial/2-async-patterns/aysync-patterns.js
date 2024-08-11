const http = require('http')

const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.end('home page')
        return
    }
    if(req.url === '/about'){
        //BLOCKING
        for(let i = 0; i<1000;i++){
            console.log(`${i}`)
        }
        res.end('about page')
        return 
    }
    res.end('error page')
})

server.listen(5000, () => {
    console.log('server is listening on port 5000...')
})

