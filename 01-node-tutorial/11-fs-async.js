//entire object and accessing property 
    //const fs = require('fs')
    //fs.readFileSync

//destructure
const {readFile, writeFile} = require('fs')

console.log('start')
readFile('./content/first.txt','utf8', (error, result) => {
    if(error){
        console.log(error)
        return;
    }
    const first = result
    readFile('./content/second.txt', 'utf8', (error, result) => {
        if(error){
            console.log(error)
            return
        }
        const second = result
        writeFile('./content/rest-async.txt', `Here is the result: ${first}, ${second}`, (error, result) => {
            if(error){
                console.log(err)
                return
            }
            console.log('done with this')
            
        })
    })
    
})
console.log('starting the next')