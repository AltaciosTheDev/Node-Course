const Product = require('../models/Product')
const {StatusCodes} = require('http-status-codes')

const createProduct = async (req,res) => {
    console.log(req.body)
    const product = await Product.create(req.body)//create record in db
    res.status(StatusCodes.CREATED).json({product}) //send status code and info to user
}

const getAllProducts = async (req, res) => {
    res.send('list of products')
}

module.exports = {
    createProduct,
    getAllProducts
}

