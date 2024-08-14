const express = require('express')
const {products, people} = require('./data.js')
const app = express()

app.get('/', (req, res) => {
    res.send('<h1>Home Page </h1><a href="/api/products">products</a>')
})

//all products 
app.get('/api/products', (req,res)=>{   
    const newProducts = products.map(product => {
        const {id, name, image} = product
        return {id,name,image}
    })
    res.json(newProducts)
})

//specific product 
app.get('/api/products/:productID', (req,res)=>{
    console.log(req.params)
    const{productID} = req.params
    const singleProduct = products.find((product) => product.id === parseInt(productID))

    if (!singleProduct) {
        return res.status(404).send('Product Does Not Exist')
      }

    res.json(singleProduct)
})

//complex route param route
app.get('/api/products/:productID/reviews/:reviewID', (req, res) => {
    console.log(req.params)
    const {productID, reviewID} = req.params
    res.send(`Your query params are the following ${productID} , ${reviewID}`)
})

//all products with query params 
app.get('/api/v1/query', (req,res)=>{   
    console.log(req.query)
    const {search, limit} = req.query
    let sortedProducts = [...products]

    if (search){
        sortedProducts = sortedProducts.filter(product => {
            return product.name.startsWith(search)
        })
    }

    if(limit){
        sortedProducts = sortedProducts.slice(0, Number(limit))
    }

    if(sortedProducts.length < 1){
        //res.status(200).send('no products matched your search')
        return res.status(200).json({success: true, data:[]})
        //useful to send that status was ok but search was empty 
    }

    res.status(200).json(sortedProducts)
})



app.listen(5000, () => {
    console.log('Server is listening on port 5000') 
})

