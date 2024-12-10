const path = require('path')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')


const uploadProductImage = async (req,res) => {
    console.log(req.files)
    if(!req.files){
        throw new CustomError.BadRequestError('No file uploaded')
    }

    const productImage = req.files.image //giant object of library 

    if(!productImage.mimetype.startsWith('image')){
        throw new CustomError.BadRequestError('please upload an image')
    }

    maxSize = 1024 * 1024

    if(productImage.size > maxSize){
        throw new CustomError.BadRequestError('please upload image smaller than 1kb')
    }

    console.log(__dirname)
    const imagePath = path.join(__dirname, '../public/uploads/' + `${productImage.name}`) //__dirname = current file, and imagePath where to store image
    console.log(imagePath)
    await productImage.mv(imagePath)
    return res.status(StatusCodes.OK).json({image:{src: `/uploads/${productImage.name}`}})
}

module.exports = {
    uploadProductImage
}

