const express = require('express')
const router = express.Router()
const {login, dashboard} = require('../controllers/main')

const authMiddleware = require('../middleware/auth')

router.route('/dashboard').get(authMiddleware, dashboard) //we can use several middleware functions in here!!!
router.route('/login').post(login)

module.exports = router