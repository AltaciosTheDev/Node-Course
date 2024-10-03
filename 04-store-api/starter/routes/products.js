const express = require('express')
const router = express.Router()
const {getAllProductsStatic,getAllProducsts} = require('../controllers/products')

router.route('/').get(getAllProducsts)
router.route('/testing').get(getAllProductsStatic)

module.exports = router