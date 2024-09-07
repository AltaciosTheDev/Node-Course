const Product = require('../models/product') 
 
const getAllProductsStatic = async (req,res) => { 
    //throw new Error('Testing express async error package') 
    const products = await Product.find({featured: true}) 
    res.status(200).json({fetched: products.length, data: products}) 
}

const getAllProducts = async (req, res) => {
    const products = await Product.find({})
    res.status(200).json({msg: 'products route'})
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}