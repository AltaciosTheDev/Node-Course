const path = require('path')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const cloudinary = require('cloudinary').v2
const fs = require('fs')

const uploadProductImageLocal = async (req,res) => {
    console.log(req.files)
    if(!req.files){
        throw new CustomError.BadRequestError('No file uploaded') //first validation looks for any file uploaded
    }

    const productImage = req.files.image //giant object of library 

    if(!productImage.mimetype.startsWith('image')){
        throw new CustomError.BadRequestError('please upload an image') //second validation looks for any image uploaded
    }

    maxSize = 1024 * 1024

    if(productImage.size > maxSize){
        throw new CustomError.BadRequestError('please upload image smaller than 1kb')//sets a limit to the image uploaded
    }

    console.log(__dirname)
    const imagePath = path.join(__dirname, '../public/uploads/' + `${productImage.name}`) //__dirname = current file, and imagePath where to store image
    console.log(imagePath)
    await productImage.mv(imagePath)///moves the uploaded image to the folder to store it in public 
    return res.status(StatusCodes.OK).json({image:{src: `/uploads/${productImage.name}`}})//sends image url back to the client 
}

const uploadProductImage = async (req, res) => {
    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {//where the file to upload is located 
        use_filename: false, 
        folder: 'file-upload'//where to upload the file 
    })

    fs.unlinkSync(req.files.image.tempFilePath)//can remove the temp files with the fs module 

    return res.status(StatusCodes.OK).json({image:{src: result.secure_url}}) 
}

module.exports = {
    uploadProductImage
}

