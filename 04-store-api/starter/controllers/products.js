const Product = require('../models/product') 
 
const getAllProductsStatic = async (req,res) => { 
    //throw new Error('Testing express async error package') 
    const products = await Product.find(req.query) //empty object makes no difference 
    res.status(200).json({fetched: products.length, data: products}) 
}

const getAllProducts = async (req, res) => {
    const {featured, company} = req.query
    const queryObject = {}
    if(featured){ //if property exists at all, enter conditional.
        queryObject.featured = featured === 'true' ? true : false //ternary checking the value of the featured property.
    }
    if(company){
        queryObject.company = company
    }
    console.log(queryObject)
    const products = await Product.find(queryObject)  
    res.status(200).json({fetched: products.length, data: products}) 
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}