const express = require('express')
const router = express.Router()
const {login, dashboard} = require('../controllers/main')

const authMiddleware = require('../middleware/auth')

//reason we placed the authMiddleware here is b/c it is the onyly router, if not, it would have been placed in the app.js with the rest.
//This is the reason we need to add a next in the auth, b/c express async errors does not handle this we pass manual to dashboard
router.route('/dashboard').get(authMiddleware, dashboard) //we can use several middleware functions in here!!!
router.route('/login').post(login)

module.exports = router