require('dotenv').config()

const connectDB = require('./db/connect')
const Product = require('./models/product')
const jsonProducts = require('./products.json')

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        console.log('connected')
        await Product.deleteMany()
        console.log('deleted what was')
        const products = await Product.create(jsonProducts)
        console.log(products)
        process.exit()

    }
    catch(error){
        console.log(error)
    }
}
start()