const express = require('express')
const app = express()

const peopleRouter = require('./routes/people')
const authRouter = require('./routes/auth')

//static assets
app.use(express.static('./methods-public'))
//parse form data(form)
app.use(express.urlencoded({extended: false}))
//parse json data(http request and js )
app.use(express.json())

app.use('/api/people', peopleRouter)
app.use('/login', authRouter)

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})
