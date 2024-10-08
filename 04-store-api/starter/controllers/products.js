const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
    ///const products = await Product.find({}).sort('-name price') -> example of sort
    const products = await Product.find({price: {$gt: 30}}).sort('-price')
    res.status(200).json({ nbHits: products.length,data: products}) 
}

const getAllProducsts = async (req, res) => {
    const {featured, company,name, sort, fields, numericFilters} = req.query 
    const queryObject = {}
    if(featured){
        queryObject.featured = featured === 'true' ? true : false
    }
    if(company) {
        queryObject.company = company
    }
    if(name){
        queryObject.name = {$regex: name, $options: 'i'}
    }
    let result =  Product.find(queryObject)

    if(sort){
        const sortList = sort.split(',').join(' ')
        console.log(sortList) 
        result = result.sort(sortList)
    }
    if(fields){
        const fieldsList = fields.split(',').join(' ')
        console.log(fields)
        result = result.select(fieldsList)
    }
    if(numericFilters){
        const operatorMap = {
        '>': '$gt',
        '>=': '$gte',
        '<': '$lt',
        '<=': '$lte',
        '=': '$eq',
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
        const options = ['price', 'rarting'] // array containing only options where we will include the query param in the query object
        filters = filters.split(',').forEach(item => {
            const [field,operator,value] = item.split('-')

            if(options.includes(field)){
                //age: { $gt: 17, $lt: 66 },
                queryObject[field] = {[operator]: Number(value)} //variable before the colon will not be accepted unless bracket case used
            }
        })

    }
    console.log(queryObject)

    const page = Number(req.query.page) || 1 
    const limit = Number(req.query.limit) || 10
    const skip = (page-1) * limit
    result = result.skip(skip).limit(limit)


    //we can await at the end b/c we had already created the query object from the Product Model
    const products = await result 
    res.status(200).json({ nbHits: products.length,data: products}) 
}

module.exports = {
    getAllProductsStatic,
    getAllProducsts
}