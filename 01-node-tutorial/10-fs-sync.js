//entire object and accessing property 
    //const fs = require('fs')
    //fs.readFileSync

//destructure
const {readFileSync, writeFileSync} = require('fs')
console.log('start')
const first = readFileSync('./content/first.txt', 'utf8')
const second = readFileSync('./content/second.txt', 'utf8')

writeFileSync('./content/result-sync.txt',`BLA BLA BLA Here is the result: ${first}, ${second}. BLA BLA BLA`)
console.log('done with this task')
console.log('starting the next one')

//literally sync means it read line by linea.
//does not start another task until it finishes another
