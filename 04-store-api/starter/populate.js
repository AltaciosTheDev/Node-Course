//video 134: populate db 
require('dotenv').config()
const connectDB = require('./db/connect')
const Product = require('./models/product')
const jsonProducts = require('./products.json')



const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI) 
        console.log('connected to database')
        const result = await Product.deleteMany({})
        console.log(`Deleted ${result.deletedCount} documents from the collection.`);
        const tasks = await Product.create(jsonProducts)
        console.log(`${tasks.length} documents created in the collection.`)
        process.exit()
    }
    catch(err){
        console.log(err)
    }
    
}

start()