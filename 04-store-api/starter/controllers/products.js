const Product = require('../models/product') 
 
const getAllProductsStatic = async (req,res) => { //this endpoint is to show how everything works in a static way. 
    //example to force the library express async error to show
        //throw new Error('Testing express async error package') 
    //example of finding with support for regex
        //{<field>:{$regex /pattern/, $options: '<options>}}
    //example of sorting for the name property
        //const products = await Product.find({}).sort({price: -1, name: 1})
    //example of selecting properties to receive back
        //const products = await Product.find({}).select('name price')
    //example of limiting 
        //const producst = await Product.find({}).limit(4)
    //example of skipping
        //const products = await Product.find({}).skip(4)
    //example of numeric filter
        //const products = await Product.find({price: {$gt: 30}}).sort('-price').select('name price')
    const products = await Product.find({price: {$gt: 30}}).sort('-price').select('name price')
    res.status(200).json({fetched: products.length, data: products}) 
}

const getAllProducts = async (req, res) => {
    const {featured, company, name, sort, fields, numericFilters} = req.query
    const queryObject = {}
    if(featured){ //if property exists at all, enter conditional.
        queryObject.featured = featured === 'true' ? true : false //ternary checking the value of the featured property.
    }
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = {$regex: name, $options: 'i'}
    }    

    if(numericFilters){
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '<': '$lt',
            '<=': '$lte',
            '=': '$eq', // Added for completeness
        };

        const regEx = /\b(<|>|<=|>=|=)\b/g //looks for these 5 values in a string, all the way from the start to the end of the string
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
        const options = ['price', 'rating']
        filters = filters.split(',').forEach((item) => {
            const [field, operator,value] = item.split('-')
            if(options.includes(field)){
                queryObject[field] = {[operator]: Number(value)}
            }
        })
    }
    console.log(queryObject)
    
    //result is a query object since here, so it has access to the properties of mongoose
    let result = Product.find(queryObject)  
    if(sort){
        let sortList = sort.split(',').join(' ') //format the sorty query param to use in mongoose
        result =  result.sort(sortList)
    }
    else{
        result = result.sort('createdAt')
    }
    if(fields){
        let fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }

    const page = Number(req.query.page) || 1 // if no page requested, duh it is one. 
    const limit = Number(req.query.limit) || 10 // normally default.
    const skip = (page - 1) * limit 
    result = result.skip(skip).limit(limit)

    //total = 23
    //4 pages: 7,7,7,2
    //

    const products = await result//this will always be last 
    res.status(200).json({fetched: products.length, data: products}) 
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}